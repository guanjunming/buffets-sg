const SERVER_URL = import.meta.env.VITE_SERVER_URL;

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

export const getProfileImageUrl = (path) => {
  return SERVER_URL + path;
};
