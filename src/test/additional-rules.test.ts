import { describe, expect, it } from 'vitest';
import { attendanceMock, canConfirmRegistration, isWithinAttendanceRadius, validateFundRequest, type FundRequestDraft } from '@/data/mock';
describe('Additional Maatram rules', () => {
 it('requires all four registration acknowledgements', () => {
  expect(canConfirmRegistration([true,true,true,false])).toBe(false);
  expect(canConfirmRegistration([true,true,true,true])).toBe(true);
  expect(canConfirmRegistration([true])).toBe(false);
 });
 it('uses a simulated distance of 72 meters and radius of 300 meters', () => {
  expect(attendanceMock.distanceMeters).toBe(72);
  expect(attendanceMock.allowedRadiusMeters).toBe(300);
  expect(isWithinAttendanceRadius(72,300)).toBe(true);
  expect(isWithinAttendanceRadius(301,300)).toBe(false);
 });
 it('requires an expense title, description, positive amount, category, proof and payment details', () => {
  const valid: FundRequestDraft = { title:'Travel Allowance',description:'Event travel',amount:'250',category:'Travel',payment:'UPI',reference:'test@upi',bankAccount:'',ifsc:'',files:['Bus_Ticket.jpg'] };
  expect(validateFundRequest(valid)).toEqual([]);
  expect(validateFundRequest({...valid,amount:'0'})).toContain('Enter a valid amount greater than zero.');
  expect(validateFundRequest({...valid,files:[]})).toContain('Attach at least one bill or proof.');
  expect(validateFundRequest({...valid,reference:''})).toContain('Enter a valid UPI ID.');
  expect(validateFundRequest({...valid,title:'',description:'',category:''})).toHaveLength(3);
 });
});