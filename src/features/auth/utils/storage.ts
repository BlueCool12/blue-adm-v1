const KEY = 'bluecool-at';

export function setAccessToken(token: string, remember: boolean) {
    (remember ? localStorage : sessionStorage).setItem(KEY, token);
}

export function getAccessToken() {
    return localStorage.getItem(KEY) || sessionStorage.getItem(KEY) || null;
}

export function clearAccessToken() {
    localStorage.removeItem(KEY); sessionStorage.removeItem(KEY);
}

export function setAccessTokenPreserveStorage(token: string) {
    const useLocal = !!localStorage.getItem(KEY);
    (useLocal ? localStorage : sessionStorage).setItem(KEY, token);
}