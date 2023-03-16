import useSWR from 'swr';
import axios from 'axios';
import { Character } from 'types/character';
import { useEffect, useState } from 'react';
import { fetcher } from 'services/fetcher';
import { CharacterPer } from '..';

export const CharacterPerPage: Types.FC<
  { page: number; setError: (v: boolean) => void },
  {},
  false,
  false
> = ({ page, setError }) => {
  const { data, isLoading, error } = useSWR<{ results: Character[] }>(
    `https://swapi.dev/api/people/?page=${page}`,
    fetcher,
  );
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleCharactersWithSpecies() {
    if (!data || !data.results) return;
    const charactersAndSpecies = await Promise.all(
      data.results.map(async (character) => {
        const species = (await Promise.all(
          character.species.map(async (specieUrl) => {
            return await axios
              .get(specieUrl)
              .then((res) => res.data.name)
              .catch(() => null);
          }),
        )) as string[];

        return {
          ...character,
          species: species.length ? species : ['Human'],
        };
      }),
    );

    setLoading(false);
    setCharacters(charactersAndSpecies);
  }

  useEffect(() => {
    setError(error ? true : false);
  }, [error]);

  useEffect(() => {
    handleCharactersWithSpecies();
  }, [data]);

  return <CharacterPer characters={characters} loads={[isLoading, loading]} />;
};
