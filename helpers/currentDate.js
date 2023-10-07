const getDateString = () => {
  const currentDate = new Date();
  // Extract date components (year, month, day)
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  // Create the formatted date and time string
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const getTimeString = () => {
  const currentDate = new Date();

  // define options
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timezoneName: "short",
    timezone: "CET",
  };

  const formattedTime = currentDate
    .toLocaleTimeString("de-DE", options)
    .split(":")
    .join("-");
  return formattedTime;
};

export { getDateString, getTimeString };
