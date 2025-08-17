export const getTagColor = (tag: string) => {
  switch (tag) {
    case "hot":
    case "won":
      return "danger";
    case "warm":
      return "warning";
    case "cold":
    case "lost":
      return "primary";
    default:
      return "primary";
  }
};
