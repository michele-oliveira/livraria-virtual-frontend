import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

/**
 * Subgender object shape.
 * @typedef {Object} Subgender
 * @property {string} id
 * @property {string} name
*/

/**
 * Gender object shape.
 * @typedef {Object} Gender
 * @property {string} id
 * @property {string} name
 * @property {Subgender[]} subgenders
 */

/**
 * @returns {{ bookGenders: Gender[], loading: boolean, error: boolean }}
 */
export const useBooks = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks must be used within a AuthProvider");
  }

  return context;
};
