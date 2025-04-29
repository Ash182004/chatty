// Utility function to format message time
export function formatMessageTime(date) {
  if (!date || isNaN(new Date(date).getTime())) {
    // If the input date is invalid, return a default value
    console.error("Invalid date input: ", date);
    return "Invalid Time";
  }

  // Format the date to 'HH:mm' (24-hour format without AM/PM)
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  });
}

