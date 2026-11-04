import { describe, expect, it } from "vitest";
import { defaultDraft, fillPercent, recipientsFor, totalMatches, validateDetails, validateGuide } from "@/data/admin-mock";

describe("Admin rules", () => {
  it("maps audience tiers to 300 / 1,500 / 4,500 recipients", () => {
    expect(recipientsFor(1)).toBe(300);
    expect(recipientsFor(2)).toBe(1500);
    expect(recipientsFor(3)).toBe(4500);
  });
  it("totals 6,300 matches", () => expect(totalMatches()).toBe(6300));
  it("shows 84% filled for 42 of 50", () => expect(fillPercent(42, 50)).toBe(84));
  it("limits volunteers needed to 5–50", () => {
    expect(validateDetails({ ...defaultDraft, volunteers: 51 })["volunteers"]).toBeTruthy();
    expect(validateDetails({ ...defaultDraft, volunteers: 50 })["volunteers"]).toBeUndefined();
  });
  it("requires an event image", () => expect(validateDetails({ ...defaultDraft, image: null })["image"]).toBeTruthy());
  it("rejects an invalid contact email", () => expect(validateGuide({ ...defaultDraft, email: "nope" })["contact"]).toBeTruthy());
});
