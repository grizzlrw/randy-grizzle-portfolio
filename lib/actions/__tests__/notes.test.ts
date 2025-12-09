import { fetchNotes } from "../notes";

// Mock fetch globally
global.fetch = jest.fn();

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
        createdAt: "2024-01-01T00:00:00.000Z",
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          notes: mockNotes,
        },
      }),
    });

    const result = await fetchNotes();

    expect(result).toEqual(mockNotes);
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

    await expect(fetchNotes()).rejects.toThrow("Failed to fetch notes");
  });

  it("should include all required fields in query", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          notes: [],
        },
      }),
    });

    await fetchNotes();

    const callBody = JSON.parse(
      (global.fetch as jest.Mock).mock.calls[0][1].body
    );
    expect(callBody.query).toContain("id");
    expect(callBody.query).toContain("title");
    expect(callBody.query).toContain("content");
    expect(callBody.query).toContain("createdAt");
  });
});
