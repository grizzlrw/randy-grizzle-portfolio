import { fetchNotes } from "../notes";
import { prisma } from "@/lib/prisma";

// Mock Prisma client
jest.mock("@/lib/prisma", () => ({
  prisma: {
    note: {
      findMany: jest.fn(),
    },
  },
}));

describe("fetchNotes server action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch notes successfully", async () => {
    const mockNotes = [
      {
        id: "1",
        title: "Test Note",
        content: "Test content",
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
      },
    ];

    (prisma.note.findMany as jest.Mock).mockResolvedValueOnce(mockNotes);

    const result = await fetchNotes();

    expect(result).toEqual(mockNotes);
    expect(prisma.note.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });

  it("should throw error when database query fails", async () => {
    (prisma.note.findMany as jest.Mock).mockRejectedValueOnce(
      new Error("Database connection failed")
    );

    await expect(fetchNotes()).rejects.toThrow("Failed to fetch notes");
  });

  it("should include all required fields in returned data", async () => {
    const mockNotes = [
      {
        id: "1",
        title: "Test Note",
        content: "Test content",
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
      },
    ];

    (prisma.note.findMany as jest.Mock).mockResolvedValueOnce(mockNotes);

    const result = await fetchNotes();

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("content");
    expect(result[0]).toHaveProperty("createdAt");
  });
});
