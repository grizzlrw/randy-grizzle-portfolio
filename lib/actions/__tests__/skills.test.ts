import { fetchSkills } from "../skills";

// Mock fetch globally
global.fetch = jest.fn();

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
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          skills: mockSkills,
        },
      }),
    });

    const result = await fetchSkills();

    expect(result).toEqual(mockSkills);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("should throw error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchSkills()).rejects.toThrow("Failed to fetch skills");
  });

  it("should include imageAlt in query for accessibility", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          skills: [],
        },
      }),
    });

    await fetchSkills();

    const callBody = JSON.parse(
      (global.fetch as jest.Mock).mock.calls[0][1].body
    );
    expect(callBody.query).toContain("imageAlt");
  });

  it("should include all required fields in query", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          skills: [],
        },
      }),
    });

    await fetchSkills();

    const callBody = JSON.parse(
      (global.fetch as jest.Mock).mock.calls[0][1].body
    );
    expect(callBody.query).toContain("id");
    expect(callBody.query).toContain("title");
    expect(callBody.query).toContain("description");
    expect(callBody.query).toContain("imageUrl");
    expect(callBody.query).toContain("route");
  });
});
