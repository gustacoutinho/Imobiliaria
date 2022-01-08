export const TOKEN_KEY = "@imobiliaria-token";
export const USER_KEY = "@imobiliaria-user";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) != null; //verifica se está auth
export const getToken = () => localStorage.getItem(TOKEN_KEY); //pegar o token que esta no navegador
export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token); //salvar o token no navegador
};

export const setUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringfy(user)) //transforma objeto em texto para ser salvo
} 

export const logout = () => {
    localStorage.removeItem(USER_KEY);  // REMOVE OS DADOS DO USER
    localStorage.removeItem(TOKEN_KEY); //REMOVE O TOKEN DE AUTH
}