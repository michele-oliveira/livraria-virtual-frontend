import { useState } from "react";
import { newBook } from "../api/books/books.api";
import toast from "../components/react-stacked-toast";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import ImageDrop from "../components/ImageDrop";
import PdfDrop from "../components/PdfDrop";

const AdminPage = () => {
  const [bookForm, setBookForm] = useState({
    bookName: "",
    author: "",
    publisher: "",
    pages: "",
    gender: "",
    description: "",
    language: "",
    image1: null,
    image2: null,
    file: null,
  });

  const onChangeBookForm = (propName, value) => {
    setBookForm({ ...bookForm, [propName]: value });
  };

  const emptyForm = () => {
    setBookForm({
      bookName: "",
      author: "",
      publisher: "",
      pages: "",
      gender: "",
      description: "",
      language: "",
      image1: null,
      image2: null,
      file: null,
    });
  }

  const onSubmitBookForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("book_name", bookForm.bookName);
      formData.append("author", bookForm.author);
      formData.append("publisher", bookForm.publisher);
      formData.append("pages", bookForm.pages);
      formData.append("gender", bookForm.gender);
      formData.append("description", bookForm.description);
      formData.append("language", bookForm.language);
      if (bookForm.image1) formData.append("image_1", bookForm.image1);
      if (bookForm.image2) formData.append("image_2", bookForm.image2);
      if (bookForm.file) formData.append("book_file", bookForm.file);

      await newBook(formData);

      emptyForm();

      toast({
        title: "Livro registrado com sucesso",
        type: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Houve um erro ao enviar as informações do livro",
        type: "error",
        duration: 2500,
      });
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
                htmlFor="gender"
                className="block text-sm font-medium text-text-light"
              >
                Gênero
              </label>
              <input
                type="text"
                id="gender"
                value={bookForm.gender}
                onChange={(e) => onChangeBookForm("gender", e.target.value)}
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
                htmlFor="language"
                className="block text-sm font-medium text-text-light"
              >
                Idioma
              </label>
              <input
                type="text"
                id="language"
                value={bookForm.language}
                onChange={(e) => onChangeBookForm("language", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-text-light"
              >
                Imagem 1
              </label>
              <ImageDrop
                image={bookForm.image1}
                setImage={(image) => onChangeBookForm("image1", image)}
                className="mt-1 block w-full"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-text-light"
              >
                Imagem 2
              </label>
              <ImageDrop
                image={bookForm.image2}
                setImage={(image) => onChangeBookForm("image2", image)}
                className="mt-1 block w-full"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-text-light"
              >
                Arquivo (PDF)
              </label>
              <PdfDrop
                pdfFile={bookForm.file}
                setPdfFile={(file) => onChangeBookForm("file", file)}
                className="mt-1 block w-full"
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
