export const getLanguage = () => {
  return localStorage.getItem("lang") || "en-US";
};

export const setLanguage = (lang: string) => {
  localStorage.setItem("lang", lang);
};