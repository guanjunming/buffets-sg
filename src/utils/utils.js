export const formatDate = (isoDateString, fullMonth = true) => {
  const date = new Date(isoDateString);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: fullMonth ? "long" : "short",
    year: "numeric",
  });

  return formatter.format(date);
};
