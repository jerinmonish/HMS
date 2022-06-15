export const getToken = () => {
    return (localStorage.getItem('user_token') != null) ? localStorage.getItem('user_token') : null;
}

// export const isLoggedIn = () => {
//     return (localStorage.getItem('user_token') != null) ? true : false;
// }

export function isLoggedIn(){
  const token = localStorage.getItem('user_token');
  if(token) return true;

  return false;
}