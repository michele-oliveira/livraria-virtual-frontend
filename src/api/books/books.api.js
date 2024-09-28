export const getBooks = async (searchParam) => {
  try {
    const response = await fetch(
      searchParam
        ? `${process.env.REACT_APP_BACKEND_URL}/books?search=${searchParam}`
        : `${process.env.REACT_APP_BACKEND_URL}/books`
    );
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
