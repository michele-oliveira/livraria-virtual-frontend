export default class BooksContextError extends Error {
  constructor(message) {
    super(message);
    this.name = "BooksContextError";
  }
}
