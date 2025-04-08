
interface EventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

/**
 * Creates a Google Calendar URL to add an event
 * @param event The event details
 * @returns A Google Calendar URL that opens in a new tab
 */
export const createGoogleCalendarUrl = (event: EventDetails): string => {
  // Format dates to Google Calendar format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const startDateFormatted = formatDate(event.startDate);
  const endDateFormatted = formatDate(event.endDate);

  // Encode parameters
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${startDateFormatted}/${endDateFormatted}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Opens a Google Calendar URL in a new tab
 * @param event The event details
 */
export const addToGoogleCalendar = (event: EventDetails): void => {
  const url = createGoogleCalendarUrl(event);
  window.open(url, '_blank', 'noopener,noreferrer');
};
