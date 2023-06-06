// function to choose colour
function ColorSetter({ transaction }) {
  switch (transaction.category) {
    case "Food":
      return "#ad2c2a";
    case "Gifts":
      return "#e3da29";
    case "Transport":
      return "#34ad26";
    case "Bills":
      return "#8c59d4";
    case "Entertainment":
      return "#d4597e";
    default:
      return "#29c5bf";
  }
}

export default ColorSetter;
