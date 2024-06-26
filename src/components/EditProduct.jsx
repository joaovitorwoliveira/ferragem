import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function EditProduct({ produto, produtos, setProdutos, onClose }) {
  const { register, handleSubmit, reset, setValue } = useForm();

  React.useEffect(() => {
    setValue("nome", produto.nome);
    setValue("preco", produto.preco);
    setValue("estoque", produto.estoque);
    setValue("imagem", produto.imagem);
  }, [produto, setValue]);

  function atualizarProduto(dados) {
    const novosProdutos = produtos.map((p) =>
      p.codigo === produto.codigo
        ? {
            ...p,
            nome: dados.nome,
            preco: dados.preco,
            estoque: dados.estoque,
            imagem: dados.imagem,
          }
        : p
    );
    setProdutos(novosProdutos);
    reset();
    localStorage.setItem("produtos", JSON.stringify(novosProdutos));
    toast.success("Produto atualizado com sucesso!");
    onClose();
  }

  return (
    <div>
      <h2 className="text-center font-bold mb-4">Editar Produto</h2>
      <form
        onSubmit={handleSubmit(atualizarProduto)}
        className="flex flex-col gap-4 items-left justify-center"
      >
        <p>
          <label htmlFor="nome" className="font-semibold inline-block w-1/4">
            Nome do produto:
          </label>
          <input
            type="text"
            id="nome"
            required
            size={20}
            {...register("nome")}
            className="border ml-4 w-1/2 rounded-md"
          />
        </p>
        <p>
          <label htmlFor="estoque" className="font-semibold inline-block w-1/4">
            Qtd em estoque:
          </label>
          <input
            type="number"
            id="estoque"
            required
            size={20}
            {...register("estoque")}
            className="border ml-4 w-1/2 rounded-md"
          />
        </p>
        <p>
          <label htmlFor="preco" className="font-semibold inline-block w-1/4">
            Valor unitário:
          </label>
          <input
            type="text"
            id="preco"
            required
            size={20}
            {...register("preco")}
            className="border ml-4 w-1/2 rounded-md"
          />
        </p>
        <p>
          <label htmlFor="imagem" className="font-semibold inline-block w-1/4">
            URL da imagem:
          </label>
          <input
            type="text"
            id="imagem"
            required
            size={60}
            {...register("imagem")}
            className="border ml-4 w-1/2 rounded-md"
          />
        </p>
        <div className="text-center">
          <input
            type="submit"
            value="Salvar"
            className="border rounded-md p-2 bg-teal-700 text-white font-semibold w-1/3 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
