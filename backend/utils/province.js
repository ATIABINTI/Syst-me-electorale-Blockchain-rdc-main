// utils/province.js

const getProvinceFromId = (idCard) => {
  if (!idCard) return "Unknown";

  const prefix = idCard.substring(0, 2);

  switch (prefix) {
    case "22":
      return "Lubumbashi";
    case "21":
      return "Likasi";
    case "20":
      return "Kolwezi";
    case "19":
      return "Kinshasa";
    default:
      return "Unknown";
  }
};

module.exports = getProvinceFromId;