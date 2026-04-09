export const getCurrentMonth = (startDate: Date) => {
  const now = new Date();

  const yearDiff = now.getFullYear() - startDate.getFullYear();
  const monthDiff = now.getMonth() - startDate.getMonth();

  const total = yearDiff * 12 + monthDiff + 1;

  return total > 0 ? total : 1;
};
