import { postSignup } from "../signup";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Mock Prisma client
jest.mock("@/lib/prisma", () => ({
  prisma: {
    signup: {
      create: jest.fn(),
    },
  },
}));

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
    const mockCreated = {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      createdAt: new Date(),
    };

    (prisma.signup.create as jest.Mock).mockResolvedValueOnce(mockCreated);

    const result = await postSignup("John", "Doe", "test@example.com");
    expect(result.ok).toBe(true);
    expect(result.message).toContain("Signup successful");
  });

  it("handles duplicate email errors", async () => {
    // Create a Prisma error by mocking the error object structure
    const prismaError = {
      name: "PrismaClientKnownRequestError",
      code: "P2002",
      message: "Unique constraint failed",
      clientVersion: "5.0.0",
    };

    (prisma.signup.create as jest.Mock).mockRejectedValueOnce(prismaError);

    const result = await postSignup("John", "Doe", "test@example.com");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("This email is already registered.");
  });

  it("handles unexpected errors", async () => {
    (prisma.signup.create as jest.Mock).mockRejectedValueOnce(
      new Error("Database connection failed")
    );

    const result = await postSignup("John", "Doe", "test@example.com");
    expect(result.ok).toBe(false);
    expect(result.message).toBe("An unexpected error occurred during signup.");
  });
});
