export const formatAmount = (amount: string | number | undefined) => {
  return `₦${amount?.toLocaleString()}`;
};