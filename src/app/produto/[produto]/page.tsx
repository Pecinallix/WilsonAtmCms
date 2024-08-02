import { PageParams } from "@/Types";
import Image from "next/image";
import { ButtonBack } from "@/componentes/helpers/ButtonBack";
import ClientProdutoPage from "@/componentes/produtos/Put-produto";
import tokenAction from "@/actions/login/get-token";
import { url } from "@/componentes/url";

export default async function ServerProdutoPage({ params }: PageParams) {
  const token = await tokenAction();

  const response = await fetch(url + `/wp-json/api/produto/${params.produto}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return (
    <section className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-700 mb-4 sm:mb-6">
          {data.nome}
        </h1>
        <ButtonBack className="mb-4">Voltar</ButtonBack>
        <a
          target="blank"
          href={data.link_1}
          className="text-white bg-green-500 hover:bg-green-400 mb-4 block text-center p-2 sm:p-3 rounded-3xl mx-auto my-0 w-40 sm:w-52"
        >
          Confira o Link do Wpp
        </a>
        <ClientProdutoPage data={data} />
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
          Imagens
        </h2>
        {data.fotos.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <Image
              src={data.fotos[0].src}
              alt={data.fotos[0].titulo}
              width={500}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        )}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
            Todas as Imagens:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {data.fotos.map((foto: any, index: any) => (
              <Image
                key={index}
                src={foto.src}
                alt={foto.titulo}
                width={200}
                height={100}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
