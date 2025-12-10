import { dateUtils, dayjs } from "../date";

describe("dateUtils", () => {
  // Fixed date for consistent testing
  const fixedDate = new Date("2024-03-15T14:30:00Z");
  const fixedDateString = "2024-03-15T14:30:00Z";
  const fixedTimestamp = fixedDate.getTime();

  describe("format", () => {
    it("should format date in short format", () => {
      const result = dateUtils.format(fixedDate, "short");
      expect(result).toBe("Mar 15, 2024");
    });

    it("should format date in long format", () => {
      const result = dateUtils.format(fixedDate, "long");
      expect(result).toContain("March 15, 2024 at");
    });

    it("should format date in time format", () => {
      const result = dateUtils.format(fixedDate, "time");
      expect(result).toMatch(/\d{1,2}:\d{2} [AP]M/);
    });

    it("should default to long format when format not specified", () => {
      const result = dateUtils.format(fixedDate);
      expect(result).toContain("March 15, 2024 at");
    });

    it("should accept string date input", () => {
      const result = dateUtils.format(fixedDateString, "short");
      expect(result).toBe("Mar 15, 2024");
    });

    it("should accept timestamp input", () => {
      const result = dateUtils.format(fixedTimestamp, "short");
      expect(result).toBe("Mar 15, 2024");
    });
  });

  describe("formatRelative", () => {
    it("should format recent date as relative time", () => {
      const twoHoursAgo = dayjs().subtract(2, "hour").toDate();
      const result = dateUtils.formatRelative(twoHoursAgo);
      expect(result).toMatch(/hours? ago/);
    });

    it("should format future date with 'in' prefix", () => {
      const twoHoursFromNow = dayjs().add(2, "hour").toDate();
      const result = dateUtils.formatRelative(twoHoursFromNow);
      expect(result).toMatch(/in .* hours?/);
    });

    it("should handle dates from days ago", () => {
      const threeDaysAgo = dayjs().subtract(3, "day").toDate();
      const result = dateUtils.formatRelative(threeDaysAgo);
      expect(result).toMatch(/days? ago/);
    });

    it("should accept string date input", () => {
      const dateString = dayjs().subtract(5, "minute").toISOString();
      const result = dateUtils.formatRelative(dateString);
      expect(result).toMatch(/minutes? ago/);
    });
  });

  describe("isToday", () => {
    it("should return true for current date", () => {
      const now = new Date();
      expect(dateUtils.isToday(now)).toBe(true);
    });

    it("should return false for yesterday", () => {
      const yesterday = dayjs().subtract(1, "day").toDate();
      expect(dateUtils.isToday(yesterday)).toBe(false);
    });

    it("should return false for tomorrow", () => {
      const tomorrow = dayjs().add(1, "day").toDate();
      expect(dateUtils.isToday(tomorrow)).toBe(false);
    });

    it("should return true for today at different time", () => {
      const todayMorning = dayjs().hour(8).minute(0).toDate();
      expect(dateUtils.isToday(todayMorning)).toBe(true);
    });

    it("should handle string date input", () => {
      const todayString = dayjs().toISOString();
      expect(dateUtils.isToday(todayString)).toBe(true);
    });
  });

  describe("isThisWeek", () => {
    it("should return true for current date", () => {
      const now = new Date();
      expect(dateUtils.isThisWeek(now)).toBe(true);
    });

    it("should return true for earlier this week", () => {
      const twoDaysAgo = dayjs().subtract(2, "day").toDate();
      expect(dateUtils.isThisWeek(twoDaysAgo)).toBe(true);
    });

    it("should return false for last week", () => {
      const lastWeek = dayjs().subtract(8, "day").toDate();
      expect(dateUtils.isThisWeek(lastWeek)).toBe(false);
    });

    it("should return false for next week", () => {
      const nextWeek = dayjs().add(8, "day").toDate();
      expect(dateUtils.isThisWeek(nextWeek)).toBe(false);
    });

    it("should handle string date input", () => {
      const thisWeekString = dayjs().subtract(1, "day").toISOString();
      expect(dateUtils.isThisWeek(thisWeekString)).toBe(true);
    });
  });

  describe("daysAgo", () => {
    it("should return 0 for today", () => {
      const today = new Date();
      expect(dateUtils.daysAgo(today)).toBe(0);
    });

    it("should return correct number of days ago", () => {
      const fiveDaysAgo = dayjs().subtract(5, "day").toDate();
      expect(dateUtils.daysAgo(fiveDaysAgo)).toBe(5);
    });

    it("should return negative number for future dates", () => {
      const threeDaysFromNow = dayjs().startOf('day').add(3, "day").toDate();
      const result = dateUtils.daysAgo(threeDaysFromNow);
      expect(result).toBeLessThanOrEqual(-2);
      expect(result).toBeGreaterThanOrEqual(-3);
    });

    it("should handle string date input", () => {
      const sevenDaysAgoString = dayjs().subtract(7, "day").toISOString();
      expect(dateUtils.daysAgo(sevenDaysAgoString)).toBe(7);
    });

    it("should handle partial days correctly", () => {
      const twentyThreeHoursAgo = dayjs().subtract(23, "hour").toDate();
      expect(dateUtils.daysAgo(twentyThreeHoursAgo)).toBe(0);
    });
  });

  describe("toISO", () => {
    it("should convert date to ISO 8601 string", () => {
      const result = dateUtils.toISO(fixedDate);
      expect(result).toContain("2024-03-15T14:30:00");
      expect(result).toMatch(/Z$/);
    });

    it("should handle string date input", () => {
      const result = dateUtils.toISO(fixedDateString);
      expect(result).toContain("2024-03-15T14:30:00");
      expect(result).toMatch(/Z$/);
    });

    it("should handle timestamp input", () => {
      const result = dateUtils.toISO(fixedTimestamp);
      expect(result).toContain("2024-03-15T14:30:00");
      expect(result).toMatch(/Z$/);
    });

    it("should return valid ISO string format", () => {
      const now = new Date();
      const result = dateUtils.toISO(now);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });
  });

  describe("parse", () => {
    it("should parse date string to dayjs object", () => {
      const result = dateUtils.parse(fixedDateString);
      expect(result.isValid()).toBe(true);
      expect(result.toISOString()).toContain("2024-03-15T14:30:00");
    });

    it("should parse Date object to dayjs object", () => {
      const result = dateUtils.parse(fixedDate);
      expect(result.isValid()).toBe(true);
      expect(result.toISOString()).toContain("2024-03-15T14:30:00");
    });

    it("should parse timestamp to dayjs object", () => {
      const result = dateUtils.parse(fixedTimestamp);
      expect(result.isValid()).toBe(true);
      expect(result.toISOString()).toContain("2024-03-15T14:30:00");
    });

    it("should return dayjs object with chainable methods", () => {
      const result = dateUtils.parse(fixedDate);
      const formatted = result.format("YYYY-MM-DD");
      expect(formatted).toBe("2024-03-15");
    });
  });

  describe("setLocale", () => {
    it("should not throw when setting locale", () => {
      expect(() => {
        dateUtils.setLocale("en");
      }).not.toThrow();
    });

    // Note: Testing actual locale changes would require importing locale data
    // which might not be configured in test environment
  });

  describe("Integration Tests", () => {
    it("should work with chained operations", () => {
      const parsed = dateUtils.parse(fixedDate);
      const oneWeekLater = parsed.add(7, "day").toDate();
      const formatted = dateUtils.format(oneWeekLater, "short");
      expect(formatted).toBe("Mar 22, 2024");
    });

    it("should handle various date formats consistently", () => {
      const dateObj = dateUtils.format(fixedDate, "short");
      const dateStr = dateUtils.format(fixedDateString, "short");
      const dateNum = dateUtils.format(fixedTimestamp, "short");

      expect(dateObj).toBe(dateStr);
      expect(dateStr).toBe(dateNum);
    });

    it("should provide accurate relative time for recent dates", () => {
      const now = new Date();
      expect(dateUtils.isToday(now)).toBe(true);
      expect(dateUtils.isThisWeek(now)).toBe(true);
      expect(dateUtils.daysAgo(now)).toBe(0);
    });
  });
});
