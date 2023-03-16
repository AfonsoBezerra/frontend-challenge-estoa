import { DoubleArrowDownIcon } from '@radix-ui/react-icons';
import { CharacterPerPage } from 'components/CharactersPer/CharactersPerPage';
import { CharacterPerFilm } from 'components/CharactersPer/CharactersPerFilm';
import { useState } from 'react';
import { Background } from 'components/Background';
import { ErrorToast } from 'components/ErrorToast';
import { Select } from 'components/Select';
import useSWR from 'swr';
import { fetcher } from 'services/fetcher';
import { Film } from 'types/film';

export const Home = () => {
  const [hasError, setHasError] = useState(false);
  const [characterPages, setCharacterPages] = useState([1]);
  const [film, setFilm] = useState('all');
  const { data, isLoading, error } = useSWR<{ results: Film[] }>(
    'https://swapi.dev/api/films',
    fetcher,
  );

  return (
    <main className="max-desk mb-24 px-4">
      {true && <ErrorToast hasError={hasError} />}
      <section className="relative flex h-screen items-center justify-center">
        <div>
          <h1 className="title break-words">
            Find a Star Wars
            <br /> Character:
          </h1>
        </div>
        <button
          className="absolute animate-bounce bottom-16"
          onClick={() =>
            window.scrollTo({
              behavior: 'smooth',
              top: window.innerHeight,
            })
          }
        >
          <DoubleArrowDownIcon className="w-8 h-8" />
        </button>
      </section>

      <section className="flex flex-col">
        <div className="flex items-end gap-8 mb-4">
          <h2 className="text-2xl text-zinc-500 font-sans-secondary">Characters:</h2>
          {!error && data && (
            <Select
              placeholder={isLoading ? 'Loading...' : 'Select an Star Wars film'}
              onValueChange={(value) => setFilm(value)}
            >
              <Select.Option value="all">All films</Select.Option>
              {data.results.map(({ title, url }) => (
                <Select.Option key={url} value={url}>
                  {title}
                </Select.Option>
              ))}
            </Select>
          )}
        </div>
        <ul className="flex flex-wrap gap-4 justify-center">
          {film === 'all' &&
            characterPages.map((thisPage) => (
              <CharacterPerPage key={thisPage} page={thisPage} setError={setHasError} />
            ))}
          {film !== 'all' && <CharacterPerFilm film={film} setError={setHasError} />}
        </ul>

        {film === 'all' && (
          <button
            className="bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors py-2 px-8 rounded-md w-fit self-center mt-10"
            disabled={characterPages[characterPages.length - 1] + 1 >= 9 || hasError}
            onClick={() =>
              setCharacterPages((prev) => [...prev, prev[prev.length - 1] + 1])
            }
          >
            View More
          </button>
        )}
      </section>

      <Background />
    </main>
  );
};
