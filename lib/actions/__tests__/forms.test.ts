import { getFormBySlug } from "../forms";
import { prisma } from "@/lib/prisma";

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    form: {
      findUnique: jest.fn(),
    },
  },
}));

// Mock Next.js cache
jest.mock("next/cache", () => ({
  unstable_cache: <T>(fn: () => Promise<T>) => fn,
}));


describe("getFormBySlug server action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch form with elements and options", async () => {
    const mockForm = {
      id: "1",
      slug: "contact-form",
      title: "Contact Form",
      elements: [
        {
          id: "1",
          name: "email",
          type: "email",
          position: 1,
          options: [],
        },
      ],
    };

    (prisma.form.findUnique as jest.Mock).mockResolvedValueOnce(mockForm);

    const result = await getFormBySlug("contact-form");

    expect(result).toEqual(mockForm);
    expect(prisma.form.findUnique).toHaveBeenCalledWith({
      where: { slug: "contact-form" },
      include: {
        elements: {
          include: { options: true },
          orderBy: { position: "asc" },
        },
      },
    });
  });

  it("should return null when form not found", async () => {
    (prisma.form.findUnique as jest.Mock).mockResolvedValueOnce(null);

    const result = await getFormBySlug("non-existent");

    expect(result).toBeNull();
  });

  it("should order elements by position", async () => {
    (prisma.form.findUnique as jest.Mock).mockResolvedValueOnce({
      id: "1",
      slug: "test",
      elements: [],
    });

    await getFormBySlug("test");

    const call = (prisma.form.findUnique as jest.Mock).mock.calls[0][0];
    expect(call.include.elements.orderBy).toEqual({ position: "asc" });
  });
});
