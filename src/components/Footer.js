import { Link } from "react-router-dom";

const Footer =() => (
    <footer className="bg-slate-600 text-white py-8 mt-10">
        <div className="container mx-auto px-4">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                <div>
                    <h3 className="text-lg font-bold mb-4">Sobre Nós</h3>
                    <p className="text-sm text-gray-200">
                        Livraria Virtual é sua fonte confiável para encontrar livros em diversas categorias, trazendo
                        conhecimento e entretenimento à sua vida.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="/form" className="hover:underline">Contato</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Contato</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: contato@livrariavirtual.com</li>
                        <li>Telefone: (00) 1234-5678</li>
                        <li>Endereço: Rua dos Livros, 123</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Siga-nos</h3>
                    <div className="flex space-x-4">
                        <Link to="#" className="text-gray-400 hover:text-white">
                            <ion-icon name="logo-facebook" className="text-2xl"></ion-icon>
                        </Link>
                        <Link to="#" className="text-gray-400 hover:text-white">
                            <ion-icon name="logo-twitter" className="text-2xl"></ion-icon>
                        </Link>
                        <Link to="#" className="text-gray-400 hover:text-white">
                            <ion-icon name="logo-instagram" className="text-2xl"></ion-icon>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-200">
                &copy; 2024 Livraria Virtual. Todos os direitos reservados.
            </div>
        </div>
    </footer>
)

export default Footer;