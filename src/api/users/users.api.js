import UnauthorizedError from "../../errors/http/UnauthorizedError";
import { getJwt } from "../../utils/jwt";

export const registerUser = async (user) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const token = await response.json();
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavoriteBooks = async (page, limit) => {
  try {
    const accessToken = getJwt();
    const response = await fetch(
      page && limit
        ? `${process.env.REACT_APP_BACKEND_URL}/users/favorite-books?page=${page}&limit=${limit}`
        : `${process.env.REACT_APP_BACKEND_URL}/users/favorite-books`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok && response.status === 401) {
      throw new UnauthorizedError(
        "Unauthorized attempt to access favorite books"
      );
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const favoriteBooks = await response.json();
    return favoriteBooks;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addBookToFavorites = async (bookId) => {
  try {
    if (!bookId || typeof bookId !== "string") {
      throw new Error("bookId is invalid or was not passed");
    }

    const accessToken = getJwt();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/favorite-books/${bookId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok && response.status === 401) {
      throw new UnauthorizedError(
        "Unauthorized attempt to access favorite books"
      );
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeBookFromFavorites = async (bookId) => {
  try {
    if (!bookId || typeof bookId !== "string") {
      throw new Error("bookId is invalid or was not passed");
    }

    const accessToken = getJwt();
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/favorite-books/${bookId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok && response.status === 401) {
      throw new UnauthorizedError(
        "Unauthorized attempt to access favorite books"
      );
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
