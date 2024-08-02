'use server';

import { cookies } from 'next/headers';
import { url } from '@/componentes/url';

export async function getProdutosAction() {
  const token = cookies().get('token')?.value;
  const response = await fetch(url + '/wp-json/api/produto', {
    cache: 'no-store',
    headers: {
      Authorization: 'Bearer' + token,
    },
  });
  const data = await response.json();
  console.log(data);

  return { data };
}
