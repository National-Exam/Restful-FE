export function createAuthorizationHeaders() {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  if (token) {
    const headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Add Content-Type header
    };

    return headers;
  }

  return {};
}
