export const formatMonthYear = (slug) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (!slug || typeof slug !== "string" || !/^\d{2}-\d{4}$/.test(slug)) {
    return "Invalid Date";
  }

  const [mm, yyyy] = slug.split("-").map(Number);

  if (mm < 1 || mm > 12) {
    return "Invalid Month";
  }

  return `${months[mm - 1]}/${yyyy}`;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
