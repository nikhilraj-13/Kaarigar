export const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
};

export const calculateArtisanShare = (amount, percent = 82) => {
  return Math.round((Number(amount || 0) * percent) / 100);
};
