import componentMap from "../componentMap";
import InputField from "@/app/components/_inputs/InputField";
import SelectField from "@/app/components/_inputs/SelectField";

describe("componentMap", () => {
  it("should be an object", () => {
    expect(typeof componentMap).toBe("object");
    expect(componentMap).not.toBeNull();
  });

  it("should map 'text' to InputField", () => {
    expect(componentMap.text).toBe(InputField);
  });

  it("should map 'email' to InputField", () => {
    expect(componentMap.email).toBe(InputField);
  });

  it("should map 'select' to SelectField", () => {
    expect(componentMap.select).toBe(SelectField);
  });

  it("should have all expected keys", () => {
    const expectedKeys = ["text", "email", "select"];
    const actualKeys = Object.keys(componentMap);
    
    expectedKeys.forEach(key => {
      expect(actualKeys).toContain(key);
    });
  });

  it("should not have undefined values", () => {
    Object.values(componentMap).forEach(component => {
      expect(component).toBeDefined();
      expect(component).not.toBeNull();
    });
  });

  it("should map to valid React components", () => {
    Object.values(componentMap).forEach(component => {
      expect(typeof component).toBe("function");
    });
  });

  describe("Component Properties", () => {
    it("should have InputField for text input types", () => {
      expect(componentMap.text).toBe(componentMap.email);
    });

    it("should have distinct SelectField component", () => {
      expect(componentMap.select).not.toBe(componentMap.text);
    });
  });

  describe("Type Safety", () => {
    it("should be indexable by string keys", () => {
      const textKey = "text";
      expect(componentMap[textKey]).toBe(InputField);
    });

    it("should support dynamic key access", () => {
      const keys = ["text", "email", "select"];
      keys.forEach(key => {
        expect(componentMap[key as keyof typeof componentMap]).toBeDefined();
      });
    });
  });
});
