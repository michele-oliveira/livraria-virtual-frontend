import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
  } from "react";
import PropTypes from "prop-types";
import { getBookGenders } from "../api/books/books.api";
  
const BooksContext = createContext(null);

const BooksProvider = ({ children }) => {
const [bookGenders, setBookGenders] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

const fetchBookGenders = useCallback(async () => {
    try {
        setLoading(true);
        const subgenders = await getBookGenders();
        setBookGenders(subgenders);
    } catch (error) {
        console.error('Error while fetching book subgenders', error);
        setError(true);
    } finally {
        setLoading(false);
    }
}, []);

useEffect(() => {
    fetchBookGenders();
}, [fetchBookGenders])

const contextValue = useMemo(
    () => ({
        bookGenders,
        loading,
        error,
    }),
    [bookGenders, loading, error]
);

return (
    <BooksContext.Provider value={contextValue}>{children}</BooksContext.Provider>
);
};

BooksProvider.propTypes = {
    children: PropTypes.node,
};

export { BooksContext, BooksProvider };
  