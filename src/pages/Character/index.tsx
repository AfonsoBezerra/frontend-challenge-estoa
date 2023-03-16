import { Background } from 'components/Background';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Character as CharacterType } from 'types/character';
import useSWR from 'swr';
import { fetcher } from 'services/fetcher';
import { useEffect, useState } from 'react';
import { NotFount } from 'pages/NotFound';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

const BASE_IMAGE_URL = 'https://starwars-visualguide.com/assets/img/characters/';

const INFOS_TO_GET = [
  'name',
  'birth_year',
  'eye_color',
  'gender',
  'hair_color',
  'height',
  'mass',
  'skin_color',
  'homeworld',
  'films',
  'species',
];

function formatCharacter(data: CharacterType) {
  const newData = { ...data };
  for (const key of Object.keys(newData)) {
    if (!INFOS_TO_GET.includes(key)) delete newData[key as keyof CharacterType];
  }
  return newData;
}

export const Character = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR<CharacterType>(
    `https://swapi.dev/api/people/${id}`,
    fetcher,
  );
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState<CharacterType | null>(null);

  async function handleCharactersWithSpecies() {
    if (!data) return;
    const homeworld = await axios
      .get(data.homeworld)
      .then((res) => res.data.name)
      .catch(() => null);

    const films = await Promise.all(
      data.films.map(async (specieUrl) => {
        return await axios
          .get(specieUrl)
          .then((res) => res.data.title)
          .catch(() => null);
      }),
    );

    const species = await Promise.all(
      data.species.map(async (specieUrl) => {
        return await axios
          .get(specieUrl)
          .then((res) => res.data.name)
          .catch(() => null);
      }),
    );

    setLoading(false);
    setCharacter(
      formatCharacter({
        ...data,
        homeworld,
        films,
        species: species.length ? species : ['Human'],
      }),
    );
  }

  useEffect(() => {
    handleCharactersWithSpecies();
  }, [data]);

  if (loading && isLoading)
    return (
      <main className="max-desk animate-pulse">
        <Background />
      </main>
    );

  if ((error || !data) && !isLoading) return <NotFount />;

  return (
    <main className="max-desk mb-24 px-4">
      <Link
        to="/"
        className="fixed top-4 left-4 p-2 bg-zinc-800 rounded-md shadow-md transition-colors hover:bg-zinc-700"
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </Link>
      <section className="mt-10 flex flex-col items-center gap-8">
        <div className="w-60 h-64 rounded-md overflow-hidden shadow-lg">
          <img
            src={`${BASE_IMAGE_URL + id}.jpg`}
            alt={data!.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <h1 className="title text-yellow-500">{data!.name}</h1>
      </section>
      <section className="mt-10 flex flex-col items-center">
        <h2 className="text-2xl text-zinc-500 mb-8 font-sans-secondary">Details:</h2>
        <div>
          <ul className="flex flex-col gap-4">
            {character &&
              Object.entries(character).map(([key, data]) => (
                <li
                  key={key}
                  className="inline-flex items-end max-sm:justify-center max-sm:flex-wrap"
                >
                  <span className="text-xl font-sans-secondary text-zinc-600 sm:min-w-[14rem]">
                    {key}:
                  </span>
                  <span className="font-sans-secondary sm:text-right sm:w-full">
                    {Array.isArray(data) ? data.join(', ') : data}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <Background />
    </main>
  );
};
