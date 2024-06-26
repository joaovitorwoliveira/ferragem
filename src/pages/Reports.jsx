import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Reports() {
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [vendedor, setVendedor] = useState("");
  const [reportData, setReportData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const reports = JSON.parse(localStorage.getItem("relatorios")) || [];
    const filteredReports = reports.filter((report) => {
      const reportDate = new Date(report.dataCarrinho);
      const startDate = new Date(inicio);
      const endDate = new Date(fim);
      return (
        report.vendedor === vendedor &&
        reportDate >= startDate &&
        reportDate <= endDate
      );
    });

    const reportText = filteredReports
      .map((report) => {
        return `Vendedor: ${report.vendedor}\nData do Carrinho: ${
          report.dataCarrinho
        }\nCliente: ${report.cliente}\nProdutos:\n${report.produtos
          .map(
            (produto) =>
              `  - Código: ${produto.codigo}, Quantidade: ${produto.quantidade}`
          )
          .join("\n")}\n\n`;
      })
      .join("\n");

    setReportData(reportText);
  };

  const handleDownload = () => {
    const blob = new Blob([reportData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio.txt";
    a.click();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Relatório" />
      <main className="flex flex-col items-center mt-4 px-4 mb-36 flex-grow">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="inicio"
            >
              Início:
            </label>
            <input
              type="date"
              id="inicio"
              value={inicio}
              onChange={(e) => setInicio(e.target.value)}
              className="w-full border rounded-md p-2 border-teal-700"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fim"
            >
              Fim:
            </label>
            <input
              type="date"
              id="fim"
              value={fim}
              onChange={(e) => setFim(e.target.value)}
              className="w-full border rounded-md p-2 border-teal-700"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="vendedor"
            >
              Vendedor:
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
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-md"
          >
            Gerar relatório
          </button>
        </form>
        {reportData && (
          <div className="mt-8 ">
            <button
              onClick={handleDownload}
              className="w-full bg-teal-700 text-white py-2 rounded-lg mx-2"
            >
              Baixar relatório
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
