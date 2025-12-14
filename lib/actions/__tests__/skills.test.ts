import { fetchSkills } from "../skills";
import { prisma } from "@/lib/prisma";

// Mock Next.js cache
jest.mock("next/cache", () => ({
  unstable_cache: (fn: Function) => fn,
}));

// Mock Prisma client
jest.mock("@/lib/prisma", () => ({
  prisma: {
    skill: {
      findMany: jest.fn(),
    },
  },
}));

describe("fetchSkills server action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch skills successfully", async () => {
    const mockSkills = [
      {
        id: "1",
        title: "React",
        description: "JavaScript library",
        imageUrl: "/react.png",
        imageAlt: "React logo",
        route: "/skills/react",
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
      },
    ];

    (prisma.skill.findMany as jest.Mock).mockResolvedValueOnce(mockSkills);

    const result = await fetchSkills();

    expect(result).toEqual(mockSkills);
    expect(prisma.skill.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });

  it("should throw error when database query fails", async () => {
    (prisma.skill.findMany as jest.Mock).mockRejectedValueOnce(
      new Error("Database connection failed")
    );

    await expect(fetchSkills()).rejects.toThrow("Failed to fetch skills");
  });

  it("should include imageAlt in returned data for accessibility", async () => {
    const mockSkills = [
      {
        id: "1",
        title: "React",
        description: "JavaScript library",
        imageUrl: "/react.png",
        imageAlt: "React logo",
        route: "/skills/react",
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
      },
    ];

    (prisma.skill.findMany as jest.Mock).mockResolvedValueOnce(mockSkills);

    const result = await fetchSkills();

    expect(result[0]).toHaveProperty("imageAlt");
    expect(result[0].imageAlt).toBe("React logo");
  });

  it("should include all required fields in returned data", async () => {
    const mockSkills = [
      {
        id: "1",
        title: "React",
        description: "JavaScript library",
        imageUrl: "/react.png",
        imageAlt: "React logo",
        route: "/skills/react",
        createdAt: new Date("2024-01-01T00:00:00.000Z"),
      },
    ];

    (prisma.skill.findMany as jest.Mock).mockResolvedValueOnce(mockSkills);

    const result = await fetchSkills();

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("title");
    expect(result[0]).toHaveProperty("description");
    expect(result[0]).toHaveProperty("imageUrl");
    expect(result[0]).toHaveProperty("route");
  });
});
