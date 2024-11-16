export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
};
