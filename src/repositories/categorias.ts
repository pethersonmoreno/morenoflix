import { API_BASE } from '../config';
import objToQuerystring from '../helpers/objToQuerystring';
import { IVideo } from './videos';

const URL_CATEGORIAS = `${API_BASE}/categorias`;

type TQuery = {
  _embed?: string;
};
export interface ICategoriaWithoutId {
  titulo: string;
  descricao?: string;
  cor: string;
  // eslint-disable-next-line camelcase
  link_extra?: {
    text: string;
    url: string;
  };
  videos?: IVideo[];
}
export interface ICategoria extends ICategoriaWithoutId {
  id: number;
}
export interface ICategoriaWithVideo extends ICategoria {
  videos: IVideo[];
}

const getByQuery = (query?: TQuery): Promise<ICategoriaWithVideo[]> =>
  fetch(`${URL_CATEGORIAS}${objToQuerystring(query)}`).then(r => {
    if (r.ok) {
      return r.json();
    }
    if (r.status === 401) {
      throw new Error('Sem autorização  :(');
    }

    throw new Error('Não foi possível pegar os dados :(');
  });

const getAll = (): Promise<ICategoria[]> => getByQuery();

const getAllWithVideos = (): Promise<ICategoriaWithVideo[]> => getByQuery({ _embed: 'videos' });

const create = (securityCode: string, novaCategoria: ICategoriaWithoutId): Promise<ICategoria> =>
  fetch(URL_CATEGORIAS, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: securityCode,
    },
    method: 'POST',
    body: JSON.stringify(novaCategoria),
  }).then(r => {
    if (r.ok) {
      return r.json();
    }
    if (r.status === 401) {
      throw new Error('Sem autorização  :(');
    }
    throw new Error('Não foi possível cadastrar a categoria :(');
  });

const update = (securityCode: string, categoria: ICategoria): Promise<ICategoria> => {
  const { id, ...fieldsToUpdate } = categoria;
  return fetch(`${URL_CATEGORIAS}/${id}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: securityCode,
    },
    method: 'PUT',
    body: JSON.stringify(fieldsToUpdate),
  }).then(r => {
    if (r.ok) {
      return r.json();
    }
    if (r.status === 401) {
      throw new Error('Sem autorização  :(');
    }
    throw new Error('Não foi possível atualizar a categoria :(');
  });
};

const remove = (securityCode: string, id: number): Promise<ICategoria> =>
  fetch(`${URL_CATEGORIAS}/${id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: securityCode,
    },
    method: 'DELETE',
  }).then(r => {
    if (r.ok) {
      return r.json();
    }
    if (r.status === 401) {
      throw new Error('Sem autorização  :(');
    }
    throw new Error('Não foi possível remover a categoria :(');
  });

export default {
  getAll,
  getAllWithVideos,
  create,
  update,
  remove,
};
