import Cookies from 'universal-cookie';

const loginCheck = () => {
    const cookies = new Cookies();
    return cookies.get('x-auth-token');
}

export const clearCookieAndStorage = (): void => {
    const cookies = new Cookies();
    cookies.remove('x-auth-token');
    localStorage.removeItem('refreshToken');
}