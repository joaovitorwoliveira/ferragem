import "react-responsive-modal/styles.css";

import { useState, useEffect } from "react";
import Modal from "react-responsive-modal";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { Toaster } from "sonner";

import Footer from "../components/Footer";
import Header from "../components/Header";
import NewProduct from "../components/NewProduct";
import EditProduct from "../components/EditProduct";

export default function Products() {
  const [produtos, setProdutos] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    try {
      const produtos2 = JSON.parse(localStorage.getItem("produtos"));
      if (produtos2) {
        setProdutos(produtos2);
      }
    } catch (error) {
      console.error("Erro ao analisar JSON do localStorage:", error);
    }
  }, []);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpen(true);
  };

  const handleRemove = (codigo) => {
    const newProducts = produtos.filter((product) => product.codigo !== codigo);
    setProdutos(newProducts);
    localStorage.setItem("produtos", JSON.stringify(newProducts));
  };

  const filteredProducts = produtos.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Produtos" />
      <main className="flex flex-col items-center mt-4 px-4 mb-36 flex-grow">
        <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center w-full mb-4">
            <div className="relative flex-1 mr-2">
              <FaSearch className="absolute top-3 left-3 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar"
                className="w-full border rounded-md p-2 pl-10 border-teal-700"
              />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                onOpenModal();
              }}
              className="flex items-center bg-teal-700 text-white px-4 py-2 rounded-md"
            >
              <FaPlus className="mr-2" />
              Adicionar
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 w-full">
            {filteredProducts.map((product) => (
              <div
                key={product.codigo}
                className="flex items-center border rounded-lg border-teal-700 p-3"
              >
                <div className="w-1/2 flex flex-col gap-2 bg-gray-100 p-2 rounded-lg min-h-full">
                  <p className="font-bold">{product.nome}</p>
                  <p className="text-sm">Preço: {product.preco}</p>
                  <p className="text-sm">Qtd em estoque: {product.estoque}</p>
                  <p className="text-sm">Código: {product.codigo}</p>
                </div>
                <div className="w-1/2 relative flex items-center justify-center ">
                  <img
                    src={product.imagem}
                    alt={product.nome}
                    className="w-32 h-32 object-contain"
                  />
                  <div className="absolute right-0 mb-2 flex flex-col gap-4">
                    <button
                      className="bg-gray-300 text-white p-2 rounded-lg opacity-80"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-lg opacity-80"
                      onClick={() => handleRemove(product.codigo)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Modal open={open} onClose={onCloseModal} center>
            {editingProduct ? (
              <EditProduct
                produto={editingProduct}
                produtos={produtos}
                setProdutos={setProdutos}
                onClose={onCloseModal}
              />
            ) : (
              <NewProduct
                produtos={produtos}
                setProdutos={setProdutos}
                onClose={onCloseModal}
              />
            )}
          </Modal>
        </div>
      </main>

      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
