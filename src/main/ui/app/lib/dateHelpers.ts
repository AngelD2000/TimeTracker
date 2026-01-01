/**
 * Date utility functions for week-based calculations
 */

/**
 * Gets the Monday of the week for a given date
 * @param date - The date to get the week start for
 * @returns ISO date string of the Monday (YYYY-MM-DD)
 */
export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

/**
 * Gets the Sunday of the week for a given date
 * @param date - The date to get the week end for
 * @returns ISO date string of the Sunday (YYYY-MM-DD)
 */
export function getWeekEnd(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + 7; // Next Sunday
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}

/**
 * Formats a date string for display
 * @param dateString - ISO date string
 * @returns Formatted date like "Nov 11, 2025"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

/**
 * Formats a week range for display
 * @param weekStart - ISO date string of Monday
 * @returns Formatted range like "Nov 11-17, 2025"
 */
export function formatWeekRange(weekStart: string): string {
  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  
  const monthYear = start.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const startDay = start.getDate();
  const endDay = end.getDate();
  
  return `${monthYear} ${startDay}-${endDay}`;
}

/**
 * Gets the previous week's Monday
 * @param currentWeekStart - ISO date string of current Monday
 * @returns ISO date string of previous Monday
 */
export function getPreviousWeek(currentWeekStart: string): string {
  const date = new Date(currentWeekStart);
  date.setDate(date.getDate() - 7);
  return date.toISOString().split('T')[0];
}

/**
 * Gets the next week's Monday
 * @param currentWeekStart - ISO date string of current Monday
 * @returns ISO date string of next Monday
 */
export function getNextWeek(currentWeekStart: string): string {
  const date = new Date(currentWeekStart);
  date.setDate(date.getDate() + 7);
  return date.toISOString().split('T')[0];
}

/**
 * Checks if a date falls within a week
 * @param date - ISO date string to check
 * @param weekStart - ISO date string of Monday
 * @returns true if date is in the week
 */
export function isDateInWeek(date: string, weekStart: string): boolean {
  const d = new Date(date);
  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  
  return d >= start && d < end;
}

/**
 * Gets today's date as ISO string
 * @returns ISO date string (YYYY-MM-DD)
 */
export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}

