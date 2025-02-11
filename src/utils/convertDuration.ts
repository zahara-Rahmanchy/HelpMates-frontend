export function convertDuration(durationInHours: number) {
  // Constants for time conversions
  const hoursInDay = 24;
  const daysInWeek = 7;
  const daysInMonth = 30;

  // Calculate months, weeks, days, and remaining hours
  const months = Math.floor(durationInHours / (hoursInDay * daysInMonth));
  const remainingAfterMonths = durationInHours % (hoursInDay * daysInMonth);

  const weeks = Math.floor(remainingAfterMonths / (hoursInDay * daysInWeek));
  const remainingAfterWeeks = remainingAfterMonths % (hoursInDay * daysInWeek);

  const days = Math.floor(remainingAfterWeeks / hoursInDay);
  const hours = remainingAfterWeeks % hoursInDay;

  // Create the output parts dynamically
  const parts = [
    months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "",
    weeks > 0 ? `${weeks} week${weeks > 1 ? "s" : ""}` : "",
    days > 0 ? `${days} day${days > 1 ? "s" : ""}` : "",
    hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : "",
  ].filter(Boolean); // Filter out empty strings

  return parts.length > 0 ? parts.join(", ") : "0 hours";
}
