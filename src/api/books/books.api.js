import { getJwt } from "../../utils/jwt";
import UnauthorizedError from "../../errors/http/UnauthorizedError";

export const getBookGenders = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/books/list-genders`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const subgenders = await response.json();
    return subgenders;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBooks = async (
  searchParam,
  page,
  limit,
  subgenderId = null
) => {
  let url;
  if (searchParam) {
    url = `${process.env.REACT_APP_BACKEND_URL}/books?search=${searchParam}&page=${page}&limit=${limit}`;
  } else if (subgenderId) {
    url = `${process.env.REACT_APP_BACKEND_URL}/books/by-subgender/${subgenderId}?page=${page}&limit=${limit}`;
  } else {
    url = `${process.env.REACT_APP_BACKEND_URL}/books?page=${page}&limit=${limit}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const books = await response.json();
    return books;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBook = async (bookId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const book = await response.json();
    return book;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const newBook = async (newBookData) => {
  try {
    const accessToken = getJwt();

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: newBookData,
    });
    if (!response.ok && response.status === 401) {
      throw new UnauthorizedError(
        "Unauthorized attempt to create a book"
      );
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newBook = await response.json();
    return newBook;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBook = async (updatedBookData) => {
  try {
    const accessToken = getJwt();

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: updatedBookData,
    });
    if (!response.ok && response.status === 401) {
      throw new UnauthorizedError(
        "Unauthorized attempt to edit book"
      );
    }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const newBook = await response.json();
    return newBook;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBook = async (bookId) => {
  try {
    const accessToken = getJwt();

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok && response.status === 401) {
      throw new UnauthorizedError(
        "Unauthorized attempt to delete book"
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
