import { API_BASE } from '../config';

const URL_VIDEOS = `${API_BASE}/videos`;

interface IVideoWithoutId {
  titulo: string;
  url: string;
  categoriaId: number;
}
export interface IVideo extends IVideoWithoutId {
  id: number;
}

const getAll = (): Promise<IVideo[]> =>
  fetch(URL_VIDEOS).then(r => {
    if (r.ok) {
      return r.json();
    }
    if (r.status === 401) {
      throw new Error('Sem autorização  :(');
    }

    throw new Error('Não foi possível pegar os dados :(');
  });

const create = (securityCode: string, novoVideo: IVideoWithoutId): Promise<IVideo> =>
  fetch(URL_VIDEOS, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: securityCode,
    },
    method: 'POST',
    body: JSON.stringify(novoVideo),
  }).then(r => {
    if (r.ok) {
      return r.json();
    }
    if (r.status === 401) {
      throw new Error('Sem autorização  :(');
    }

    throw new Error('Não foi possível cadastrar o vídeo :(');
  });

export default {
  getAll,
  create,
};
