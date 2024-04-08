const specialCharacters = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "&",
  "*",
  "(",
  ")",
  "+",
  ",",
  "-",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "\\",
  "]",
  "^",
  "_",
  "`",
  "{",
  "|",
  "}",
  "~",
];
// function to replace special characters with a hyphen
export const replaceSpecialCharacters = (str: string): string => {
  let newStr = str;
  specialCharacters.forEach((char) => {
    newStr = newStr.replace(char, "-");
  });
  //and make it url friendly
  newStr = newStr.replace(/ /g, "-").toLowerCase();
  return newStr;
};
export type LinkPreviewData = {
  title: string;
  description: string;
  image?: string;
};
