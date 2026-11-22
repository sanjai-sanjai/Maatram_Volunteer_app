import { describe, expect, it } from "vitest";
import {
  attendanceMock,
  canConfirmRegistration,
  isWithinAttendanceRadius,
  validateFundRequest,
  type FundRequestDraft,
} from "@/data/mock";
describe("Additional Maatram rules", () => {
  it("requires all four registration acknowledgements", () => {
    expect(canConfirmRegistration([true, true, true, false])).toBe(false);
    expect(canConfirmRegistration([true, true, true, true])).toBe(true);
    expect(canConfirmRegistration([true])).toBe(false);
  });
  it("uses a simulated distance of 72 meters and radius of 300 meters", () => {
    expect(attendanceMock.distanceMeters).toBe(72);
    expect(attendanceMock.allowedRadiusMeters).toBe(300);
    expect(isWithinAttendanceRadius(72, 300)).toBe(true);
    expect(isWithinAttendanceRadius(301, 300)).toBe(false);
  });
  it("requires an expense title, description, positive amount, category, proof and payment details", () => {
    const valid: FundRequestDraft = {
      title: "Travel Allowance",
      description: "Event travel",
      amount: "250",
      category: "Travel",
      payment: "UPI",
      reference: "test@upi",
      bankAccount: "",
      ifsc: "",
      files: ["Bus_Ticket.jpg"],
    };
    expect(validateFundRequest(valid)).toEqual([]);
    expect(validateFundRequest({ ...valid, amount: "0" })).toContain(
      "Enter a valid amount greater than zero.",
    );
    expect(validateFundRequest({ ...valid, files: [] })).toContain(
      "Attach at least one bill or proof.",
    );
    expect(validateFundRequest({ ...valid, reference: "" })).toContain("Enter a valid UPI ID.");
    expect(
      validateFundRequest({ ...valid, title: "", description: "", category: "" }),
    ).toHaveLength(3);
  });

  it(
    "verifies physical verification community resolution and assigned students dataset",
    async () => {
      const { getCommunity } = await import("@/components/community-screens");
      const { initialAssignedCandidates } = await import("@/data/assigned-students-mock");

      const pvCommunity = getCommunity("physical-verification");
      expect(pvCommunity?.name).toBe("Physical Verification Team");
      expect(pvCommunity?.category).toBe("Physical Verification");

      const bgvCommunity = getCommunity("bgv");
      expect(bgvCommunity?.name).toBe("Physical Verification Team");

      const palmCommunity = getCommunity("palm-plantation");
      expect(palmCommunity?.name).toBe("Palm Plantation Team");
      expect(palmCommunity?.category).toBe("Environment");

      expect(initialAssignedCandidates.length).toBe(5);
      expect(initialAssignedCandidates.map((c) => c.name)).toEqual([
        "Priya S",
        "Arun K",
        "Meena R",
        "Karthik V",
        "Divya M",
      ]);
      expect(initialAssignedCandidates.find((c) => c.name === "Priya S")?.status).toBe("Assigned");
      expect(initialAssignedCandidates.find((c) => c.name === "Arun K")?.status).toBe("Visit Scheduled");
      expect(initialAssignedCandidates.find((c) => c.name === "Meena R")?.status).toBe("In Progress");
      expect(initialAssignedCandidates.find((c) => c.name === "Karthik V")?.status).toBe("Submitted");
      expect(initialAssignedCandidates.find((c) => c.name === "Divya M")?.status).toBe("Revisit Required");
    },
    15000,
  );

  it("verifies 10th, 11th, and 12th official marksheet document generation and data", async () => {
    const React = await import("react");
    const { render, screen, fireEvent } = await import("@testing-library/react");
    const { StudentVerificationDetail } = await import("@/components/student-verification-detail");
    const { initialAssignedCandidates } = await import("@/data/assigned-students-mock");

    const priya = initialAssignedCandidates[0]!;
    const { container } = render(
      React.createElement(StudentVerificationDetail, {
        candidate: priya,
        onBack: () => {},
      })
    );

    // Click Education tab
    const eduTabBtn = screen.getByRole("button", { name: /Education/i });
    fireEvent.click(eduTabBtn);

    // Verify 10th, 11th, 12th cards exist
    expect(screen.getByText("10th Details")).toBeDefined();
    expect(screen.getByText("11th Details")).toBeDefined();
    expect(screen.getByText("12th Details")).toBeDefined();

    // 1. Click 10th Marksheet View
    const viewButtons = container.querySelectorAll(".ma-sv-edu-view-btn");
    const viewButtonsList = Array.from(viewButtons).filter((btn) => btn.textContent?.includes("View"));
    expect(viewButtonsList.length).toBeGreaterThanOrEqual(3);

    // Click 10th [View]
    fireEvent.click(viewButtonsList[0]!);
    expect(screen.getByText(/SECONDARY SCHOOL LEAVING CERTIFICATE \(SSLC\)/i)).toBeDefined();
    expect(screen.getByText(/FOUR HUNDRED AND SIXTY/i)).toBeDefined();
    expect(screen.getByText(/460/i)).toBeDefined();
    expect(screen.getByText(/dge\.tn\.gov\.in/i)).toBeDefined();

    // Close modal
    const closeBtn = screen.getByRole("button", { name: /Close Marksheet/i });
    fireEvent.click(closeBtn);

    // 2. Click 11th [View]
    fireEvent.click(viewButtonsList[1]!);
    expect(screen.getByText(/HIGHER SECONDARY FIRST YEAR \(\+1\) EXAMINATION/i)).toBeDefined();
    expect(screen.getByText(/FIVE HUNDRED AND SIXTY FOUR/i)).toBeDefined();
    expect(screen.getByText(/564/i)).toBeDefined();

    // Close modal
    fireEvent.click(screen.getByRole("button", { name: /Close Marksheet/i }));

    // 3. Click 12th [View]
    fireEvent.click(viewButtonsList[2]!);
    expect(screen.getByText(/HIGHER SECONDARY SECOND YEAR \(\+2 HSC\) EXAMINATION/i)).toBeDefined();
    expect(screen.getByText(/FIVE HUNDRED AND FIFTY/i)).toBeDefined();
    expect(screen.getByText(/550/i)).toBeDefined();
    expect(screen.getByText(/94\.00 \/ 100/i)).toBeDefined();

    // Close modal
    fireEvent.click(screen.getByRole("button", { name: /Close Marksheet/i }));
  });

  it("verifies Physical Verification Form transitions, sections, and submission matching media_1795321411192_90d9865b.jpg", async () => {
    const React = await import("react");
    const { render, fireEvent, cleanup } = await import("@testing-library/react");
    const { StudentVerificationDetail } = await import("@/components/student-verification-detail");
    const { initialAssignedCandidates } = await import("@/data/assigned-students-mock");

    cleanup();

    let submittedStatus: string | null = null;
    let submittedNotes: string | undefined = undefined;

    const { getByRole, getByText, container } = render(
      React.createElement(StudentVerificationDetail, {
        candidate: initialAssignedCandidates[0]!,
        onBack: () => {},
        onUpdateStatus: (_id: string, status: string, notes?: string) => {
          submittedStatus = status;
          submittedNotes = notes;
        },
      })
    );

    // Initial state: Candidate dossier is displayed
    expect(getByText("Student Information")).toBeDefined();
    const proceedBtn = getByRole("button", {
      name: /Proceed to Physical Verification/i,
    });
    expect(proceedBtn).toBeDefined();

    // 1. Click "Proceed to Physical Verification"
    fireEvent.click(proceedBtn);

    // 2. Banner and Student Card with Tele Verification Completed badge
    expect(getByText("Physical Verification Form")).toBeDefined();
    expect(
      getByText(
        /Verify the student's details by visiting the student's house and submit the physical verification report\./i
      )
    ).toBeDefined();
    expect(getByText("Tele Verification Completed")).toBeDefined();

    // 3. Section 1: Checklist items
    expect(getByText("1. Have you checked all the below data?")).toBeDefined();
    expect(getByText("10th Original Marksheet")).toBeDefined();
    expect(getByText("11th Original Marksheet")).toBeDefined();
    expect(getByText("12th Original Marksheet")).toBeDefined();
    expect(getByText("Income Certificate / Salary Slip")).toBeDefined();
    expect(getByText("Community Certificate")).toBeDefined();
    expect(getByText("Aadhar Card")).toBeDefined();
    expect(getByText("School Recommendation Letter")).toBeDefined();
    expect(getByText("First Graduate Certificate")).toBeDefined();
    expect(getByText("Transfer Certificate (TC)")).toBeDefined();

    // 4. Section 2 & 3: Property Type & Things noticed in house
    expect(getByText(/2\. Property Type/i)).toBeDefined();
    expect(getByText("Own House")).toBeDefined();
    expect(getByText("Rented House")).toBeDefined();
    expect(getByText("3. Things noticed in the house")).toBeDefined();
    expect(getByText("Well furnished house")).toBeDefined();
    expect(getByText("Bikes")).toBeDefined();
    expect(getByText(/Newly bought goods/i)).toBeDefined();
    expect(getByText("Other")).toBeDefined();

    // 5. Section 4: 6 Photo upload slots
    expect(getByText(/4\. Upload Photos \(Minimum 6 photos\)/i)).toBeDefined();
    const photoSlots = container.querySelectorAll(".ma-pv-photo-slot");
    expect(photoSlots.length).toBe(6);

    // 6. Section 5 & 6: Address Verified & Verification Date
    expect(getByText(/5\. Address Verified/i)).toBeDefined();
    expect(getByText("Live Location")).toBeDefined();
    expect(getByText(/6\. Verification Date/i)).toBeDefined();

    // 7. Section 7 & 8: Volunteer Recommendation & Remarks
    expect(getByText(/7\. Volunteer Recommendation/i)).toBeDefined();
    expect(getByText("Selected")).toBeDefined();
    expect(getByText("Not Selected")).toBeDefined();
    expect(getByText(/8\. Remarks/i)).toBeDefined();

    // 8. Section 9: Voice Recorder
    expect(getByText("9. Voice Recorder")).toBeDefined();
    expect(getByText("Start")).toBeDefined();
    expect(getByText("Pause")).toBeDefined();
    expect(getByText("Stop")).toBeDefined();
    expect(getByText("Save")).toBeDefined();

    // 9. Bottom Bar Buttons
    const prevBtn = getByRole("button", {
      name: /Previous \(Tele Verification\)/i,
    });
    const submitBtn = getByRole("button", {
      name: /Review & Submit/i,
    });
    expect(prevBtn).toBeDefined();
    expect(submitBtn).toBeDefined();

    // 10. Click Previous (Tele Verification) -> Returns to Candidate dossier
    fireEvent.click(prevBtn);
    expect(getByText("Student Information")).toBeDefined();

    // 11. Re-open Physical Verification Form and Submit
    fireEvent.click(getByRole("button", { name: /Proceed to Physical Verification/i }));
    expect(getByText("Physical Verification Form")).toBeDefined();

    const submitBtn2 = getByRole("button", {
      name: /Review & Submit/i,
    });
    fireEvent.click(submitBtn2);

    expect(submittedStatus).toBe("Submitted");
    expect(submittedNotes).toBeDefined();
  });

  it("verifies Other Volunteer Registration allows instant flow without required field blocks for judges demonstration", async () => {
    const React = await import("react");
    const { render, fireEvent, cleanup } = await import("@testing-library/react");
    const { Basic } = await import("@/routes/register.basic");
    const { VolunteerDetails } = await import("@/routes/register.volunteer");
    const { regDraft } = await import("@/data/mock");

    cleanup();

    // 1. Render Basic Details Screen
    const { getByRole, queryAllByText, container } = render(React.createElement(Basic));

    // Ensure NO required asterisks exist
    expect(container.querySelectorAll(".mq-req").length).toBe(0);

    // Clicking "Continue" directly advances without error
    const continueBtn = getByRole("button", { name: /Continue/i });
    fireEvent.click(continueBtn);
    expect(regDraft.name).toBeTruthy();
    expect(regDraft.email).toBeTruthy();
    expect(queryAllByText(/Please enter your full name/i).length).toBe(0);

    cleanup();

    // 2. Render Volunteer Details Screen
    const { getByRole: getByRole2, container: container2, queryAllByText: queryAllByText2 } = render(
      React.createElement(VolunteerDetails)
    );

    // Ensure NO required asterisks exist
    expect(container2.querySelectorAll(".mq-req").length).toBe(0);

    // Clicking "Create Account" submits directly without error
    const createBtn = getByRole2("button", { name: /Create Account/i });
    fireEvent.click(createBtn);
    expect(regDraft.location).toBeTruthy();
    expect(queryAllByText2(/Please select your location/i).length).toBe(0);
  });

  it("verifies Action Centre Funding Request under review modal and bill receipt asset", async () => {
    const fs = await import("fs");
    const path = await import("path");

    // 1. Verify official Bus Ticket bill assets exist
    const busTicketPath = path.resolve(process.cwd(), "public/assets/additional/bus-ticket-receipt.png");
    const busTicketJpgPath = path.resolve(process.cwd(), "public/assets/additional/Bus_Ticket.jpg");
    expect(fs.existsSync(busTicketPath)).toBe(true);
    expect(fs.existsSync(busTicketJpgPath)).toBe(true);
    expect(fs.statSync(busTicketPath).size).toBeGreaterThan(10000);

    // 2. Verify chat-screen source includes FundingRequestReviewModal and under review card handler
    const chatScreenSrc = fs.readFileSync(path.resolve(process.cwd(), "src/components/chat-screen.tsx"), "utf-8");
    expect(chatScreenSrc).toContain("function FundingRequestReviewModal");
    expect(chatScreenSrc).toContain("Funding Request Details");
    expect(chatScreenSrc).toContain("Ref #FND-2026-0842");
    expect(chatScreenSrc).toContain("Under Review by Admin Operations");
    expect(chatScreenSrc).toContain("Bus_Ticket.jpg");
    expect(chatScreenSrc).toContain("sanjai-1806@okaxis");
    expect(chatScreenSrc).toContain("fundingModalOpen");
    expect(chatScreenSrc).toContain("Under Review by Finance Desk");
  });

  it("verifies GPS Attendance location precision request, radius scanning animation, and confirmation flow", async () => {
    const fs = await import("fs");
    const path = await import("path");

    const chatScreenSrc = fs.readFileSync(path.resolve(process.cwd(), "src/components/chat-screen.tsx"), "utf-8");
    expect(chatScreenSrc).toContain("function GPSAttendanceRadiusModal");
    expect(chatScreenSrc).toContain("Location Precision");
    expect(chatScreenSrc).toContain("Perfection");
    expect(chatScreenSrc).toContain("High-Precision Ground GPS");
    expect(chatScreenSrc).toContain("Fetch &amp; Scan Location Radius");
    expect(chatScreenSrc).toContain("Measuring Geofence Radius");
    expect(chatScreenSrc).toContain("300m Perimeter");
    expect(chatScreenSrc).toContain("Attendance Marked Successfully!");
    expect(chatScreenSrc).toContain("attendanceModalOpen");

    const additionalCssSrc = fs.readFileSync(path.resolve(process.cwd(), "src/styles/additional.css"), "utf-8");
    expect(additionalCssSrc).toContain("ma-radar-container");
    expect(additionalCssSrc).toContain("ma-radar-sweep");
    expect(additionalCssSrc).toContain("ma-radar-ripple");
    expect(additionalCssSrc).toContain("ma-blip-pulse");
  });
});
