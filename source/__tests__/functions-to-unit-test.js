// Added this file as using export before functions in our source js would break functionality. We have inserted all functions to unit test here.

export function getMonthDetails(date) { // from calendar.js
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // First day of the month (0-6, Sun-Sat)
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Total number of days in the month
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay(); // Last day of the month (0-6, Sun-Sat)
    return { firstDayOfMonth, daysInMonth, lastDayOfMonth };
}