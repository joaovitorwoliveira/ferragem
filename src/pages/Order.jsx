import { useState } from "react";
import { toast } from "sonner"; // Importação do toast
import { Toaster } from "sonner";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Order() {
  const [vendedor, setVendedor] = useState("");
  const [dataCarrinho, setDataCarrinho] = useState("");
  const [cliente, setCliente] = useState("");
  const [produtos, setProdutos] = useState([{ codigo: "", quantidade: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReport = {
      vendedor,
      dataCarrinho,
      cliente,
      produtos,
    };

    let reports = [];
    const storedReports = localStorage.getItem("relatorios");
    if (storedReports) {
      try {
        reports = JSON.parse(storedReports);
      } catch (error) {
        console.error("Erro ao analisar os relatórios do localStorage:", error);
      }
    }

    reports.push(newReport);

    localStorage.setItem("relatorios", JSON.stringify(reports));

    toast.success("Carrinho enviado!");

    setVendedor("");
    setDataCarrinho("");
    setCliente("");
    setProdutos([{ codigo: "", quantidade: "" }]);
  };

  const handleProdutoChange = (index, field, value) => {
    const newProdutos = [...produtos];
    newProdutos[index][field] = value;
    setProdutos(newProdutos);
  };

  const addProduto = () => {
    setProdutos([...produtos, { codigo: "", quantidade: "" }]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Carrinho" />
      <main className="flex flex-col items-center mt-4 px-4 mb-36 flex-grow">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="vendedor"
            >
              Nome do vendedor:
            </label>
            <input
              type="text"
              id="vendedor"
              value={vendedor}
              onChange={(e) => setVendedor(e.target.value)}
              className="w-full border rounded-md p-2 border-teal-700"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dataCarrinho"
            >
              Data do carrinho:
            </label>
            <input
              type="date"
              id="dataCarrinho"
              value={dataCarrinho}
              onChange={(e) => setDataCarrinho(e.target.value)}
              className="w-full border rounded-md p-2 border-teal-700"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cliente"
            >
              Nome do cliente:
            </label>
            <input
              type="text"
              id="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full border rounded-md p-2 border-teal-700"
              required
            />
          </div>
          {produtos.map((produto, index) => (
            <div key={index} className="mb-4 pb-4 border-b border-gray-300">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`produtoCodigo-${index}`}
                  >
                    Código do produto:
                  </label>
                  <input
                    type="text"
                    id={`produtoCodigo-${index}`}
                    value={produto.codigo}
                    onChange={(e) =>
                      handleProdutoChange(index, "codigo", e.target.value)
                    }
                    className="w-full border rounded-md p-2 border-teal-700"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`quantidade-${index}`}
                  >
                    Quantidade:
                  </label>
                  <input
                    type="number"
                    id={`quantidade-${index}`}
                    value={produto.quantidade}
                    onChange={(e) =>
                      handleProdutoChange(index, "quantidade", e.target.value)
                    }
                    className="w-full border rounded-md p-2 border-teal-700"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addProduto}
            className="w-full bg-gray-300 text-black py-2 rounded-md mb-4"
          >
            Adicionar mais um produto
          </button>
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-md"
          >
            Enviar Carrinho
          </button>
        </form>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}
