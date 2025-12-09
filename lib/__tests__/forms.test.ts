import { getFormBySlug } from "../forms";
import { prisma } from "../prisma";

// Mock the prisma module
jest.mock("../prisma", () => ({
  prisma: {
    form: {
      findUnique: jest.fn(),
    },
  },
}));

describe("getFormBySlug", () => {
  const mockPrismaFindUnique = prisma.form.findUnique as jest.MockedFunction<
    typeof prisma.form.findUnique
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call prisma.form.findUnique with correct slug", async () => {
    const testSlug = "contact-form";
    mockPrismaFindUnique.mockResolvedValue(null);

    await getFormBySlug(testSlug);

    expect(mockPrismaFindUnique).toHaveBeenCalledWith({
      where: { slug: testSlug },
      include: {
        elements: {
          include: { options: true },
          orderBy: { position: "asc" },
        },
      },
    });
  });

  it("should return form data when form exists", async () => {
    const testSlug = "contact-form";
    const mockFormData = {
      id: "1",
      slug: testSlug,
      title: "Contact Form",
      description: "Test form",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
      elements: [
        {
          id: "el1",
          formId: "1",
          type: "text",
          label: "Name",
          name: "name",
          required: true,
          position: 0,
          placeholder: null,
          defaultValue: null,
          validation: null,
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
          options: [],
        },
        {
          id: "el2",
          formId: "1",
          type: "email",
          label: "Email",
          name: "email",
          required: true,
          position: 1,
          placeholder: null,
          defaultValue: null,
          validation: null,
          createdAt: new Date("2024-01-01"),
          updatedAt: new Date("2024-01-01"),
          options: [],
        },
      ],
    };

    mockPrismaFindUnique.mockResolvedValue(mockFormData);

    const result = await getFormBySlug(testSlug);

    expect(result).toEqual(mockFormData);
    expect(result?.slug).toBe(testSlug);
    expect(result?.elements).toHaveLength(2);
  });

  it("should return null when form does not exist", async () => {
    const testSlug = "nonexistent-form";
    mockPrismaFindUnique.mockResolvedValue(null);

    const result = await getFormBySlug(testSlug);

    expect(result).toBeNull();
    expect(mockPrismaFindUnique).toHaveBeenCalledTimes(1);
  });

  it("should include elements ordered by position ascending", async () => {
    const testSlug = "test-form";
    const mockFormData = {
      id: "1",
      slug: testSlug,
      title: "Test Form",
      description: "Test",
      createdAt: new Date(),
      updatedAt: new Date(),
      elements: [
        {
          id: "el1",
          formId: "1",
          type: "text",
          label: "First",
          name: "first",
          required: false,
          position: 0,
          placeholder: null,
          defaultValue: null,
          validation: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          options: [],
        },
        {
          id: "el2",
          formId: "1",
          type: "text",
          label: "Second",
          name: "second",
          required: false,
          position: 1,
          placeholder: null,
          defaultValue: null,
          validation: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          options: [],
        },
      ],
    };

    mockPrismaFindUnique.mockResolvedValue(mockFormData);

    await getFormBySlug(testSlug);

    // Verify the orderBy parameter was passed correctly
    expect(mockPrismaFindUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          elements: expect.objectContaining({
            orderBy: { position: "asc" },
          }),
        }),
      })
    );
  });

  it("should include element options in the query", async () => {
    const testSlug = "form-with-select";
    const mockFormData = {
      id: "1",
      slug: testSlug,
      title: "Form with Select",
      description: "Test",
      createdAt: new Date(),
      updatedAt: new Date(),
      elements: [
        {
          id: "el1",
          formId: "1",
          type: "select",
          label: "Choose Option",
          name: "option",
          required: true,
          position: 0,
          placeholder: null,
          defaultValue: null,
          validation: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          options: [
            {
              id: "opt1",
              elementId: "el1",
              label: "Option 1",
              value: "opt1",
              position: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "opt2",
              elementId: "el1",
              label: "Option 2",
              value: "opt2",
              position: 1,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        },
      ],
    };

    mockPrismaFindUnique.mockResolvedValue(mockFormData);

    const result = await getFormBySlug(testSlug);

    expect(result?.elements[0].options).toHaveLength(2);
    expect(result?.elements[0].options[0].label).toBe("Option 1");
  });

  it("should handle prisma errors gracefully", async () => {
    const testSlug = "error-form";
    const mockError = new Error("Database connection failed");
    mockPrismaFindUnique.mockRejectedValue(mockError);

    await expect(getFormBySlug(testSlug)).rejects.toThrow(
      "Database connection failed"
    );
  });

  it("should handle empty slug string", async () => {
    const emptySlug = "";
    mockPrismaFindUnique.mockResolvedValue(null);

    const result = await getFormBySlug(emptySlug);

    expect(mockPrismaFindUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { slug: emptySlug },
      })
    );
    expect(result).toBeNull();
  });

  it("should handle special characters in slug", async () => {
    const specialSlug = "test-form-123_special";
    mockPrismaFindUnique.mockResolvedValue(null);

    await getFormBySlug(specialSlug);

    expect(mockPrismaFindUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { slug: specialSlug },
      })
    );
  });

  describe("Query Structure", () => {
    it("should always include elements relation", async () => {
      await getFormBySlug("test");
      
      expect(mockPrismaFindUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            elements: expect.any(Object),
          }),
        })
      );
    });

    it("should always include options relation within elements", async () => {
      await getFormBySlug("test");
      
      expect(mockPrismaFindUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          include: expect.objectContaining({
            elements: expect.objectContaining({
              include: { options: true },
            }),
          }),
        })
      );
    });

    it("should use findUnique instead of findFirst or findMany", async () => {
      await getFormBySlug("test");
      
      expect(mockPrismaFindUnique).toHaveBeenCalled();
      expect(prisma.form.findUnique).toHaveBeenCalledTimes(1);
    });
  });
});
