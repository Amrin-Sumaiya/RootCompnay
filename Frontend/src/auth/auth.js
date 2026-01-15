export const getAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
