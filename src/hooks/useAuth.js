import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * User object shape.
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 */

/**
 * Set user function signature.
 * @callback SetUser
 * @param {string} jwtToken - The JWT token to set the user from.
 */

/**
 * Clear user function signature.
 * @callback ClearUser
 */

/**
 * @returns {{ user: object|null, setUser: SetUser, clearUser: ClearUser }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
