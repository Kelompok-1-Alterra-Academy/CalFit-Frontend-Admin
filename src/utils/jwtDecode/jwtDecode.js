import { parseCookies } from 'nookies';

export default function jwtDecode() {
  const { token } = parseCookies();
  if (!token)
    return {
      Id: 0,
      Email: '',
      Member: false,
      OperationalAdmin: false,
      Superadmin: false,
      exp: 0,
    };
  const decode = token.split('.')[1];
  const base64 = decode.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
