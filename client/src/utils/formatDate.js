export const formatDateTime = (value) => {
  if (!value) {
    return "Never";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

export const truncateText = (value, maxLength = 45) => {
  if (!value || value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength)}...`;
};
