export const formatHour = (date) => {
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
