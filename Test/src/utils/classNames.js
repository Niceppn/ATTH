/**
 * Safely concatenates class names, filtering out falsy values
 * Prevents boolean values from being passed to className attributes
 */
export const classNames = (...classes) => {
  return classes
    .filter(Boolean)
    .map((cls) => (typeof cls === "string" ? cls : ""))
    .join(" ")
    .trim();
};

/**
 * Creates conditional className with safe fallbacks
 */
export const conditionalClass = (baseClass, condition, conditionalClass) => {
  return classNames(baseClass, condition ? conditionalClass : "");
};
