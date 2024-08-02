'use client';
import { postProdutosAction } from '@/actions/produtos/post-produtos-action';
import { useState } from 'react';
import { Button } from '../form-componentes/Button';

export default function PostProduto() {
  const [situacao, setSituacao] = useState('');
  const [marca, setMarca] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    const imagens = event.currentTarget.img.files;
    for (let i = 0; i < imagens.length; i++) {
      formData.append(imagens[i].name, imagens[i]);
    }

    const nome = event.currentTarget.nome.value;
    const produto_cod = event.currentTarget.produto_cod.value;
    const cor = event.currentTarget.cor.value;
    const link_1 = `//api.whatsapp.com/send?phone=5522992679550&text=Olá tudo bem? Eu estava olhando o site de vocês e gostaria de mais informações sobre o produto ${nome} ${produto_cod} ${cor}, poderia me passar mais informações sobre?`;

    formData.append('nome', nome);
    formData.append('produto_cod', produto_cod);
    formData.append('situacao', situacao);
    formData.append('marca', marca);
    // formData.append('rangedevalor', rangedevalor);
    formData.append('descricao', event.currentTarget.descricao.value);
    formData.append('preco', event.currentTarget.preco.value);
    formData.append(
      'preco_parcelado',
      event.currentTarget.preco_parcelado.value,
    );
    formData.append('ano', event.currentTarget.ano.value);
    formData.append('combustivel', event.currentTarget.combustivel.value);
    formData.append('quilometragem', event.currentTarget.quilometragem.value);

    formData.append('cor', cor);
    formData.append('link_1', link_1);
    formData.append('link_2', event.currentTarget.link_2.value);
    formData.append(
      'disponibilidade',
      event.currentTarget.disponibilidade.value,
    );

    try {
      await postProdutosAction(formData);
      setSuccessMessage('Produto adicionado com sucesso');

      // Limpar a mensagem após 4 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center m-5">
      <div className="flex flex-wrap gap-4 items-center p-6 justify-center">
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Nome do produto"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <select
          id="marca"
          name="marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Marca</option>
          <option value="audi">Audi</option>
          <option value="bmw">BMW</option>
          <option value="chevrolet">Chevrolet</option>
          <option value="citroen">Citroen</option>
          <option value="fiat">Fiat</option>
          <option value="ford">Ford</option>
          <option value="honda">Honda</option>
          <option value="jeep">Jeep</option>
          <option value="renault">Renault</option>
          <option value="volkswagen">Volkswagen</option>
          <option value="toyota">Toyota</option>
        </select>

        <select
          id="situacao"
          name="situacao"
          value={situacao}
          onChange={(e) => setSituacao(e.target.value)}
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Situação do Carro</option>
          <option value="zero">Zero</option>
          <option value="usado">Usado</option>
        </select>

        <input
          type="text"
          id="descricao"
          name="descricao"
          placeholder="Descrição"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />

        {/* <select
          id="rangedevalor"
          name="rangedevalor"
          value={rangedevalor}
          onChange={(e) => setRangedevalor(e.target.value)}
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Selecione o Range de Valor</option>
          <option value="999">Menor de R$10.000,00</option>
          <option value="1499">Menor de R$15.000,00</option>
          <option value="1999">Menor de R$20.000,00</option>
          <option value="2499">Menor de R$25.000,00</option>
          <option value="2999">Menor de R$30.000,00</option>
          <option value="3999">Menor de R$40.000,00</option>
          <option value="4999">Menor de R$50.000,00</option>
          <option value="4999">Menor de R$80.000,00</option>
          <option value="4999">Menor de R$100.000,00</option>
        </select> */}

        <input
          type="text"
          id="preco"
          name="preco"
          placeholder="Preço"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="text"
          id="preco_parcelado"
          name="preco_parcelado"
          placeholder="Preço em 10x"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="text"
          id="ano"
          name="ano"
          placeholder="Ano"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="text"
          id="combustivel"
          name="combustivel"
          placeholder="Combustível"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="text"
          id="quilometragem"
          name="quilometragem"
          placeholder="Quilometragem"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <select
          id="cor"
          name="cor"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        >
          <option value="">Cor</option>
          <option value="amarelo">Amarelo</option>
          <option value="azul">Azul</option>
          <option value="bege">Bege</option>
          <option value="branco">Branco</option>
          <option value="bronze">Bronze</option>
          <option value="cinza">Cinza</option>
          <option value="dourado">Dourado</option>
          <option value="laranja">Laranja</option>
          <option value="marrom">Marrom</option>
          <option value="prata">Prata</option>
          <option value="preto">Preto</option>
          <option value="rosa">Rosa</option>
          <option value="roxo">Roxo</option>
          <option value="verde">Verde</option>
          <option value="vermelho">Vermelho</option>
          <option value="vinho">Vinho</option>
        </select>

        <input
          type="hidden"
          id="link_2"
          name="link_2"
          placeholder="Link Opcional"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />

        <input
          type="hidden"
          id="disponibilidade"
          name="disponibilidade"
          placeholder="Disponibilidade"
          value="sim"
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
        <input
          type="file"
          name="img"
          id="img"
          multiple
          className="border border-gray-300 w-full max-w-xs sm:max-w-lg p-3 rounded-md bg-gray-100 transition duration-200 mb-4 focus:outline-none focus:border-red-500 focus:bg-white focus:shadow-outline"
        />
      </div>
      <Button className="bg-red-500 text-white py-4 px-6 text-xl sm:text-2xl rounded transition duration-100 hover:bg-red-600 focus:outline-none focus:shadow-outline">
        Adicionar
      </Button>
      {successMessage && (
        <p className="mt-4 text-green-600">{successMessage}</p>
      )}
    </form>
  );
}
