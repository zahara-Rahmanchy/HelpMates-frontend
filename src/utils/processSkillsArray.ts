export const processSkillsArray = (input: string): String[] => {
  if (input.trim().toLowerCase() === "none") {
    return ["none"];
  }
  return input.trim().split(",");
};
