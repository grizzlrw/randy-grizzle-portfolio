import { submitContact } from "../contact";

// Mock fetch globally
global.fetch = jest.fn();

describe("submitContact server action", () => {
  const mockEnv = {
    RESEND_API_KEY: "test-api-key",
    CONTACT_TO_EMAIL: "test@example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...process.env, ...mockEnv };
  });

  it("validates required fields", async () => {
    const result = await submitContact("", "test@example.com", "Hello");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Name is required");
  });

  it("validates email format", async () => {
    const result = await submitContact("John", "invalid-email", "Hello");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Invalid email address");
  });

  it("validates message is required", async () => {
    const result = await submitContact("John", "john@example.com", "");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Message is required");
  });

  it("handles successful email send", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "email-id-123" }),
    });

    const result = await submitContact("John Doe", "john@example.com", "Test message");
    expect(result.ok).toBe(true);
    expect(result.message).toBe("Message sent successfully!");
    
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer test-api-key",
        }),
      })
    );
  });

  it("handles Resend API errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid API key" }),
    });

    const result = await submitContact("John", "john@example.com", "Hello");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Failed to send email.");
  });

  it("handles network errors", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    const result = await submitContact("John", "john@example.com", "Hello");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("An error occurred while sending your message.");
  });

  it("handles missing environment variables", async () => {
    delete process.env.RESEND_API_KEY;

    const result = await submitContact("John", "john@example.com", "Hello");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("Email configuration is missing on the server.");
  });

  it("includes proper email content", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "email-id-123" }),
    });

    await submitContact("Jane Smith", "jane@example.com", "Hello from test");

    const callArgs = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(callArgs[1].body);

    expect(body.to).toEqual(["test@example.com"]);
    expect(body.reply_to).toBe("jane@example.com");
    expect(body.subject).toBe("New portfolio message from Jane Smith");
    expect(body.text).toContain("Jane Smith");
    expect(body.text).toContain("jane@example.com");
    expect(body.text).toContain("Hello from test");
  });
});
