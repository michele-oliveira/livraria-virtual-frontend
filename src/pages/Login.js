import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "../components/react-stacked-toast";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { login, registerUser } from "../api/users/users.api";
import { saveJwt } from "../utils/jwt";

const Login = () => {
  const [loginForm, setLoginForm] = useState();
  const [registerForm, setRegisterForm] = useState();

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onChangeLoginForm = (propName, value) => {
    setLoginForm({ ...loginForm, [propName]: value });
  };

  const onChangeRegisterForm = (propName, value) => {
    setRegisterForm({ ...registerForm, [propName]: value });
  };

  const onSubmitLoginForm = async (e) => {
    e.preventDefault();
    try {
      const token = await login(loginForm);
      saveJwt(token.accessToken);
      setUser(token.accessToken);
      navigate("/");
    } catch (error) {
      toast({
        title: "Usuário e/ou senha incorreto(s)",
        description: "Por favor, redigite as credenciais e tente novamente",
        type: "error",
        duration: 2500,
      });
    }
  };

  const onSubmitRegisterForm = async (e) => {
    e.preventDefault();
    try {
      await registerUser(registerForm);
      toast({
        title: "Usuário registrado com sucesso",
        type: "success",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Erro ao registrar usuário",
        description: "Por favor, tente um e-mail diferente",
        type: "error",
        duration: 2500,
      });
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <Nav />
      <div className="flex flex-wrap justify-center mt-10 space-x-4 pt-10">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mx-4 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-text">
            Entrar
          </h2>

          <form onSubmit={onSubmitLoginForm}>
            <div className="mb-4">
              <label
                htmlFor="email-login"
                className="block text-sm font-medium text-text-light"
              >
                Email
              </label>
              <input
                type="email"
                id="email-login"
                name="email"
                value={loginForm?.email}
                onChange={(e) => onChangeLoginForm("email", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password-login"
                className="block text-sm font-medium text-text-light"
              >
                Senha
              </label>
              <input
                type="password"
                id="password-login"
                name="password"
                value={loginForm?.password}
                onChange={(e) => onChangeLoginForm("password", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <div className="w-full border-gray-300"></div>
            <span className="absolute bg-white px-4 text-gray-500">Ou</span>
          </div>

          <div className="mt-6 flex justify-center">
            <button className="flex items-center bg-button text-white bg-slate-400 px-4 py-2 rounded-md hover:bg-slate-600">
              <ion-icon
                name="logo-google"
                className="w-5 h-5 mr-2 text-white"
              ></ion-icon>
              <span className="ml-2">Entrar com o Google</span>
            </button>
          </div>
        </div>

        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mx-4 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-text">
            Cadastrar
          </h2>

          <form onSubmit={onSubmitRegisterForm}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-light"
              >
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={registerForm?.name}
                onChange={(e) => onChangeRegisterForm("name", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email-register"
                className="block text-sm font-medium text-text-light"
              >
                Email
              </label>
              <input
                type="email"
                id="email-register"
                name="email"
                value={registerForm?.email}
                onChange={(e) => onChangeRegisterForm("email", e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password-register"
                className="block text-sm font-medium text-text-light"
              >
                Senha
              </label>
              <input
                type="password"
                id="password-register"
                name="password"
                value={registerForm?.password}
                onChange={(e) =>
                  onChangeRegisterForm("password", e.target.value)
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-400 text-white px-4 py-2 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
