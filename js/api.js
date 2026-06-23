const BASE_URL = "http://localhost:5000/api/v1";

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const requestEmailVerification = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/auth/request-email-verification`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    return await response.json();
  } catch (error) {
    console.error(error)
    throw error;
  }
};
