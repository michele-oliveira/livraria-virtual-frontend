import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";

const AdminPage = () => {
  const [bookForm, setBookForm] = useState({
    bookName: " ",
    author: " ",
    pages: " ",
    description: " ",
    publisher: " ",
    image: null,
    file: null,
  });

  const onChangeBookForm = (propName, value) => {
    setBookForm({ ...bookForm, [propName]: value });
  };

  const onSubmitBookForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("bookName", bookForm.bookName);
      formData.append("author", bookForm.author);
      formData.append("pages", bookForm.pages);
      formData.append("description", bookForm.description);
      formData.append("publisher", bookForm.publisher);
      if (bookForm.image) formData.append("image", bookForm.image);
      if (bookForm.file) formData.append("file", bookForm.file);

      alert("Livro enviado com sucesso!");
    } catch (error) {
      alert("Erro ao enviar dados do livro");
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <Nav />
      <div className="flex justify-center mt-10 pt-10">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-text">
            Adicionar Novo Livro
          </h2>

          <form onSubmit={onSubmitBookForm} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="bookName"
                className="block text-sm font-medium text-text-light"
              >
                Nome do Livro
              </label>
              <input
                type="text"
                id="bookName"
                value={bookForm.bookName}
                onChange={(e) => onChangeBookForm("bookName", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-sm font-medium text-text-light"
              >
                Autor
              </label>
              <input
                type="text"
                id="author"
                value={bookForm.author}
                onChange={(e) => onChangeBookForm("author", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="pages"
                className="block text-sm font-medium text-text-light"
              >
                Número de Páginas
              </label>
              <input
                type="number"
                id="pages"
                value={bookForm.pages}
                onChange={(e) => onChangeBookForm("pages", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-text-light"
              >
                Descrição
              </label>
              <textarea
                id="description"
                value={bookForm.description}
                onChange={(e) =>
                  onChangeBookForm("description", e.target.value)
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="publisher"
                className="block text-sm font-medium text-text-light"
              >
                Editora
              </label>
              <input
                type="text"
                id="publisher"
                value={bookForm.publisher}
                onChange={(e) => onChangeBookForm("publisher", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-text-light"
              >
                Enviar Imagem
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => onChangeBookForm("image", e.target.files[0])}
                className="mt-1 block w-full px-3 py-2"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-text-light"
              >
                Enviar Arquivo (PDF)
              </label>
              <input
                type="file"
                id="file"
                accept=".pdf"
                onChange={(e) => onChangeBookForm("file", e.target.files[0])}
                className="mt-1 block w-full px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-slate-600"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
