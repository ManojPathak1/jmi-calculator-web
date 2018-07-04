export const getItemLS = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const setItemLS = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
}