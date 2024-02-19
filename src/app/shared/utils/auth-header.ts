export function getAuthHeader() {
  const token = localStorage.getItem('token');
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  } else {
    return undefined;
  }
}
