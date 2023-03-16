import useSWR from 'swr';
import axios from 'axios';
import { Character } from 'types/character';
import { useEffect, useState } from 'react';
import { fetcher } from 'services/fetcher';
import { Film } from 'types/film';
import { CharacterPer } from '..';

export const CharacterPerFilm: Types.FC<
  { film: string; setError: (v: boolean) => void },
  {},
  false,
  false
> = ({ film, setError }) => {
  const { data, isLoading, error } = useSWR<Film>(film, fetcher);
  const [charactersData, setCharactersData] = useState<Character[] | null>(null);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleCharacters() {
    if (!data) return;
    const allCharactersByFilm = (await Promise.all(
      data.characters.map(
        async (characterUrl) =>
          await axios
            .get(characterUrl)
            .then((res) => res.data)
            .catch(() => null),
      ),
    )) as Character[];
    setCharactersData(allCharactersByFilm);
  }
  async function handleCharactersWithSpecies() {
    if (!charactersData) return;
    const charactersAndSpecies = await Promise.all(
      charactersData.map(async (character) => {
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

    setCharacters(charactersAndSpecies);
    setLoading(false);
  }

  useEffect(() => {
    setError(error ? true : false);
  }, [error]);

  useEffect(() => {
    handleCharacters();
  }, [data]);

  useEffect(() => {
    setLoading(true);
  }, [film]);

  useEffect(() => {
    handleCharactersWithSpecies();
  }, [charactersData]);

  return <CharacterPer characters={characters} loads={[isLoading, loading]} />;
};
