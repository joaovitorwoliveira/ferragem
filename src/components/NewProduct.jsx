/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function NewProduct({ produtos, setProdutos, onClose }) {
  const { register, handleSubmit, reset } = useForm();

  function cadastraProduto(dados) {
    const novosProdutos = [...produtos];
    novosProdutos.push({
      nome: dados.nome,
      preco: dados.preco,
      estoque: parseInt(dados.estoque, 10),
      codigo: (produtos.length + 1).toString().padStart(3, "0"),
      imagem: dados.imagem,
    });
    setProdutos(novosProdutos);
    reset();
    localStorage.setItem("produtos", JSON.stringify(novosProdutos));
    toast.success("Produto cadastrado com sucesso!");
    onClose();
  }

  return (
    <div>
      <h2 className="text-center font-bold mb-4">Cadastrar Produto</h2>
      <form
        onSubmit={handleSubmit(cadastraProduto)}
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
            value="Cadastrar"
            className="border rounded-md p-2 bg-teal-700 text-white font-semibold w-1/3 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
