import { postSignup, fetchNotes, fetchSkills } from "../graphqlClient";

// Mock global fetch
global.fetch = jest.fn();

describe("graphqlClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("postSignup", () => {
    it("should successfully sign up a user", async () => {
      const mockResponse = {
        data: {
          signup: {
            ok: true,
            message: "Signup successful!",
          },
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postSignup("John", "Doe", "john@example.com");

      expect(result).toEqual({
        ok: true,
        message: "Signup successful!",
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.stringContaining("Signup"),
        })
      );
    });

    it("should handle network errors", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const result = await postSignup("John", "Doe", "john@example.com");

      expect(result).toEqual({
        ok: false,
        message: "Network error while signing up.",
      });
    });

    it("should handle missing data response", async () => {
      const mockResponse = {
        data: {},
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postSignup("John", "Doe", "john@example.com");

      expect(result).toEqual({
        ok: false,
        message: "Unexpected error while signing up.",
      });
    });

    it("should handle signup failure with error message", async () => {
      const mockResponse = {
        data: {
          signup: {
            ok: false,
            message: "Email already exists",
          },
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postSignup("John", "Doe", "john@example.com");

      expect(result).toEqual({
        ok: false,
        message: "Email already exists",
      });
    });

    it("should handle null message in response", async () => {
      const mockResponse = {
        data: {
          signup: {
            ok: true,
            message: null,
          },
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await postSignup("John", "Doe", "john@example.com");

      expect(result).toEqual({
        ok: true,
        message: null,
      });
    });

    it("should send correct GraphQL mutation variables", async () => {
      const mockResponse = {
        data: {
          signup: {
            ok: true,
            message: "Success",
          },
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await postSignup("Alice", "Smith", "alice@example.com");

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.variables).toEqual({
        input: {
          firstName: "Alice",
          lastName: "Smith",
          email: "alice@example.com",
        },
      });
    });
  });

  describe("fetchNotes", () => {
    it("should successfully fetch notes", async () => {
      const mockNotes = [
        {
          id: "1",
          title: "First Note",
          content: "Content 1",
          createdAt: "2024-01-01T00:00:00Z",
        },
        {
          id: "2",
          title: "Second Note",
          content: "Content 2",
          createdAt: "2024-01-02T00:00:00Z",
        },
      ];

      const mockResponse = {
        data: {
          notes: mockNotes,
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchNotes();

      expect(result).toEqual(mockNotes);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: expect.stringContaining("Notes"),
        })
      );
    });

    it("should throw error on network failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchNotes()).rejects.toThrow("Failed to fetch notes");
    });

    it("should handle empty notes array", async () => {
      const mockResponse = {
        data: {
          notes: [],
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchNotes();

      expect(result).toEqual([]);
    });

    it("should send correct GraphQL query", async () => {
      const mockResponse = {
        data: {
          notes: [],
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchNotes();

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.query).toContain("query Notes");
      expect(body.query).toContain("id");
      expect(body.query).toContain("title");
      expect(body.query).toContain("content");
      expect(body.query).toContain("createdAt");
    });
  });

  describe("fetchSkills", () => {
    it("should successfully fetch skills", async () => {
      const mockSkills = [
        {
          id: "1",
          title: "React",
          description: "Frontend framework",
          imageUrl: "/react.png",
          imageAlt: "React logo",
          route: "/skills/react",
          createdAt: "2024-01-01T00:00:00Z",
        },
        {
          id: "2",
          title: "TypeScript",
          description: "Typed JavaScript",
          imageUrl: "/ts.png",
          imageAlt: "TypeScript logo",
          route: "/skills/typescript",
          createdAt: "2024-01-02T00:00:00Z",
        },
      ];

      const mockResponse = {
        data: {
          skills: mockSkills,
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchSkills();

      expect(result).toEqual(mockSkills);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: expect.stringContaining("Skills"),
        })
      );
    });

    it("should throw error on network failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchSkills()).rejects.toThrow("Failed to fetch skills");
    });

    it("should handle empty skills array", async () => {
      const mockResponse = {
        data: {
          skills: [],
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchSkills();

      expect(result).toEqual([]);
    });

    it("should send correct GraphQL query", async () => {
      const mockResponse = {
        data: {
          skills: [],
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchSkills();

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.query).toContain("query Skills");
      expect(body.query).toContain("id");
      expect(body.query).toContain("title");
      expect(body.query).toContain("description");
      expect(body.query).toContain("imageUrl");
      expect(body.query).toContain("imageAlt");
      expect(body.query).toContain("route");
      expect(body.query).toContain("createdAt");
    });

    it("should use no-store cache policy", async () => {
      const mockResponse = {
        data: {
          skills: [],
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchSkills();

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          cache: "no-store",
        })
      );
    });
  });

  describe("GraphQL Endpoint Configuration", () => {
    it("should use environment variable for endpoint", async () => {
      const mockResponse = {
        data: {
          notes: [],
        },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchNotes();

      const callArgs = (global.fetch as jest.Mock).mock.calls[0];
      const endpoint = callArgs[0];

      // Should use either env variable or default
      expect(typeof endpoint).toBe("string");
      expect(endpoint.length).toBeGreaterThan(0);
    });
  });
});
