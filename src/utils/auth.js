import Cookies from 'js-cookie';

const TokenKey = 'token';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}
export function getUser(){
    return Cookies.get("user");
}
export function removeToken() {
    return Cookies.remove(TokenKey);
}


