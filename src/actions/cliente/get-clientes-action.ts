'use server';

import { url } from '@/componentes/url';
import { cookies } from 'next/headers';

export async function getClientesAction() {
  const token = cookies().get('token')?.value;
  const response = await fetch(url + '/wp-json/api/cliente?&_limit=120', {
    cache: 'no-store',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const data = await response.json();
  console.log(data);

  return { data };
}
