import { useEffect, useState } from "react";
import { getBook, newBook, updateBook } from "../api/books/books.api";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import toast from "../components/react-stacked-toast";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import SelectInput from "../components/SelectInput";
import ImageDrop from "../components/ImageDrop";
import PdfDrop from "../components/PdfDrop";
import { getFileFromUrl } from "../utils/files";

const BookForm = () => {
  const [loading, setLoading] = useState(false);
  const [bookForm, setBookForm] = useState({
    bookName: "",
    author: "",
    publisher: "",
    pages: "",
    gender: "",
    subgender: "",
    description: "",
    language: "",
    image1: null,
    image2: null,
    file: null,
  });
  const [bookSubgenders, setBookSubgenders] = useState([]);

  const navigate = useNavigate();
  const { bookId } = useParams();
  const { bookGenders, loading: bookGendersLoading, error } = useBooks();

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
      subgender: "",
      description: "",
      language: "",
      image1: null,
      image2: null,
      file: null,
    });
  };

  const onSubmitBookForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (bookId) formData.append("id", bookId);
      formData.append("book_name", bookForm.bookName);
      formData.append("author", bookForm.author);
      formData.append("publisher", bookForm.publisher);
      formData.append("pages", bookForm.pages);
      formData.append("subgender_id", bookForm.subgender);
      formData.append("description", bookForm.description);
      formData.append("language", bookForm.language);
      if (bookForm.image1) formData.append("image_1", bookForm.image1);
      if (bookForm.image2) formData.append("image_2", bookForm.image2);
      if (bookForm.file) formData.append("book_file", bookForm.file);

      if (formData.get("id")) {
        await updateBook(formData);
        toast({
          title: "Livro atualizado com sucesso",
          type: "success",
          duration: 2000,
        });
        navigate("/");
      } else {
        await newBook(formData);
        emptyForm();
        toast({
          title: "Livro registrado com sucesso",
          type: "success",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Houve um erro ao enviar as informações do livro",
        type: "error",
        duration: 2500,
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar detalhes adicionais do livro",
        description:
          "Encontramos um erro ao carregar os gêneros e subgêneros dos livros. Tente novamente ou  verifique sua conexão",
        type: 'error',
        duration: 3000,
      });
      navigate("/");
    }
  }, [error, navigate])

  useEffect(() => {
    (async () => {
      try {
        if (bookId) {
          setLoading(true);
          const book = await getBook(bookId);

          if (book) {
            const image1File = await getFileFromUrl(book.image_1);
            const image2File = await getFileFromUrl(book.image_2);
            const bookFileFile = await getFileFromUrl(book.book_file);

            setBookForm({
              bookName: book.book_name,
              author: book.author,
              publisher: book.publisher,
              pages: book.pages,
              gender: book.subgender.gender.id,
              subgender: book.subgender.id,
              description: book.description,
              language: book.language,
              image1: image1File,
              image2: image2File,
              file: bookFileFile,
            });
          }
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Erro ao carregar o livro",
          description:
            "Houve um erro inesperado ao carregar as informações do livro",
          type: "error",
          duration: 3000,
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [bookId, navigate]);

  useEffect(() => {
    if (bookForm.gender) {
      const genderId = parseInt(bookForm.gender);
      const gender = bookGenders.find(gender => gender.id === genderId);
      gender && setBookSubgenders(gender.subgenders);
    }
  }, [bookForm.gender, bookGenders]);

  if (bookGendersLoading || !bookGenders) {
    return (
      <div id="loading-info" className="flex flex-1 h-full w-full justify-center">
        <Loading text="Carregando informações..." />
      </div>
    );
  }

  if (loading) {
    return <Loading text="Buscando livro..." />;
  }

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
              <SelectInput
                label="Gênero"
                options={bookGenders.map(gender => ({ label: gender.name, value: gender.id }))}
                value={bookForm.gender}
                onChange={(e) => onChangeBookForm("gender", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <SelectInput
                label="Subgênero"
                options={bookSubgenders.map(subgender => ({ label: subgender.name, value: subgender.id }))}
                value={bookForm.subgender}
                onChange={(e) => onChangeBookForm("subgender", e.target.value)}
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

export default BookForm;
