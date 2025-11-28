import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

type DateInput = string | Date | number;
type FormatType = 'short' | 'long' | 'time';

export { dayjs };

export const dateUtils = {
  setLocale: (locale: string) => {
    dayjs.locale(locale);
  },
  /**
   * Format a date string with predefined formats
   * @param date - Date to format
   * @param format - 'short' (MMM D, YYYY), 'long' (MMMM D, YYYY at h:mm A), 'time' (h:mm A)
   */
  format: (date: DateInput, format: FormatType = 'long'): string => {
    const formats: Record<FormatType, string> = {
      short: 'MMM D, YYYY',
      long: 'MMMM D, YYYY [at] h:mm A',
      time: 'h:mm A',
    };
    return dayjs(date).format(formats[format]);
  },

  /**
   * Format date as relative time (e.g., "2 hours ago")
   */
  formatRelative: (date: DateInput): string => {
    return dayjs(date).fromNow();
  },

  /**
   * Check if date is today
   */
  isToday: (date: DateInput): boolean => {
    return dayjs(date).isSame(dayjs(), 'day');
  },

  /**
   * Check if date is within current week
   */
  isThisWeek: (date: DateInput): boolean => {
    return dayjs(date).isSame(dayjs(), 'week');
  },

  /**
   * Get number of days since date
   */
  daysAgo: (date: DateInput): number => {
    return dayjs().diff(dayjs(date), 'day');
  },

  /**
   * Convert to ISO 8601 string
   */
  toISO: (date: DateInput): string => {
    return dayjs(date).toISOString();
  },

  /**
   * Parse date string to dayjs object for advanced operations
   */
  parse: (date: DateInput) => {
    return dayjs(date);
  },
};
