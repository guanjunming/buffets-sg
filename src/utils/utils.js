export const formatDate = (isoDateString, fullMonth = true) => {
  const date = new Date(isoDateString);

  const options = {
    day: "numeric",
    month: fullMonth ? "long" : "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
};

export const formatDateShort = (isoDateString) => {
  const date = new Date(isoDateString);

  const options = {
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
};
