import axios from 'axios';

export async function fetcher(url: string) {
  return await axios
    .get(url)
    .then((res) => res.data)
    .catch(() => null);
}