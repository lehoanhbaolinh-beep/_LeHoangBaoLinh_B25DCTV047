export const loadFavs = () => new Set(JSON.parse(localStorage.getItem("favs") || "[]"));
export const saveFavs = s => localStorage.setItem("favs", JSON.stringify([...s]));
export const loadTheme = () => localStorage.getItem("theme") || "light";
export const saveTheme = t => localStorage.setItem("theme", t);
