export const saveTokens = (refresh, access) => {
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('access', access);
};

export const removeTokens = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
};