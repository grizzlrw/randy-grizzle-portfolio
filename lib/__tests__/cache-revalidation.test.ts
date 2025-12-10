import {
  revalidateNotes,
  revalidateSkills,
  revalidateForms,
  revalidateForm,
  revalidateAll,
} from "../cache-revalidation";
import { revalidateTag } from "next/cache";

// Mock Next.js cache functions
jest.mock("next/cache", () => ({
  revalidateTag: jest.fn(),
}));

describe("Cache Revalidation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("revalidateNotes", () => {
    it("should revalidate notes tag", async () => {
      await revalidateNotes();
      expect(revalidateTag).toHaveBeenCalledWith("notes", "default");
    });
  });

  describe("revalidateSkills", () => {
    it("should revalidate skills tag", async () => {
      await revalidateSkills();
      expect(revalidateTag).toHaveBeenCalledWith("skills", "default");
    });
  });

  describe("revalidateForms", () => {
    it("should revalidate forms tag", async () => {
      await revalidateForms();
      expect(revalidateTag).toHaveBeenCalledWith("forms", "default");
    });
  });

  describe("revalidateForm", () => {
    it("should revalidate specific form by slug", async () => {
      await revalidateForm("contact-form");
      expect(revalidateTag).toHaveBeenCalledWith("form-contact-form", "default");
    });

    it("should handle different slugs", async () => {
      await revalidateForm("feedback");
      expect(revalidateTag).toHaveBeenCalledWith("form-feedback", "default");
    });
  });

  describe("revalidateAll", () => {
    it("should revalidate all cache tags", async () => {
      await revalidateAll();
      
      expect(revalidateTag).toHaveBeenCalledWith("notes", "default");
      expect(revalidateTag).toHaveBeenCalledWith("skills", "default");
      expect(revalidateTag).toHaveBeenCalledWith("forms", "default");
      expect(revalidateTag).toHaveBeenCalledTimes(3);
    });
  });
});
