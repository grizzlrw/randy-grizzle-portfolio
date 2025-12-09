import { postSignup } from "../signup";

// Mock fetch globally
global.fetch = jest.fn();

describe("postSignup server action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("validates required fields", async () => {
    const result = await postSignup("", "Doe", "test@example.com");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("First name is required");
  });

  it("validates email format", async () => {
    const result = await postSignup("John", "Doe", "invalid-email");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Invalid email address");
  });

  it("handles successful signup", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          signup: {
            ok: true,
            message: "Signup successful",
          },
        },
      }),
    });

    const result = await postSignup("John", "Doe", "test@example.com");
    expect(result.ok).toBe(true);
    expect(result.message).toBe("Signup successful");
  });

  it("handles network errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await postSignup("John", "Doe", "test@example.com");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Network error while signing up.");
  });

  it("handles unexpected errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network failure"));

    const result = await postSignup("John", "Doe", "test@example.com");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("An error occurred during signup.");
  });
});
