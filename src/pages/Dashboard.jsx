import {
  FaSearch,
  FaToolbox,
  FaShoppingCart,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Dashboard" />
      <main className="flex flex-col items-center justify-center mt-4 px-4">
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 mt-1.5 ml-1.5 text-gray-500 " />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full border rounded-md p-3 pl-10 border-teal-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full mt-24 md:px-48">
          <Link
            to="/products"
            f
            className="flex flex-col items-center p-4 border rounded-lg bg-teal-700 shadow-lg"
          >
            <FaToolbox className="text-3xl mb-2 text-white" />
            <span className="text-white">Produtos</span>
          </Link>
          <Link
            to="/orders"
            className="flex flex-col items-center p-4 border rounded-lg bg-teal-700 shadow-lg"
          >
            <FaShoppingCart className="text-3xl mb-2 text-white" />
            <span className="text-white">Iniciar pedido</span>
          </Link>
          <Link
            to="/reports"
            className="flex flex-col items-center p-4 border rounded-lg bg-teal-700 shadow-lg"
          >
            <FaFileAlt className="text-3xl mb-2 text-white" />
            <span className="text-white">Relatórios</span>
          </Link>
          <Link
            to="/"
            className="flex flex-col items-center p-4 border rounded-lg  bg-teal-700 shadow-lg"
          >
            <FaCog className="text-3xl mb-2 text-white" />
            <span className="text-white">Configurações</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
