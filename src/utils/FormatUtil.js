const formatNumber = (value) => {
  return new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(value);
};

export { formatNumber };
