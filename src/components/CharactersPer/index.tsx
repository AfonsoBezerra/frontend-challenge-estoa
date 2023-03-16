import { Link2Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Character } from 'types/character';

function getCharacterIdFromUrl(url: string) {
  const urlSplit = url.split('/');
  const id = urlSplit[urlSplit.length - 2];
  return id;
}

export const CharacterPer = ({
  loads,
  characters,
}: {
  loads: boolean[];
  characters: Character[] | null;
}) => {
  return (
    <>
      {loads.some((load) => load) && (
        <div className="w-full flex justify-center gap-4 py-8">
          <span className="w-3 h-3 rounded-full bg-zinc-600 animate-pulse" />
          <span className="w-3 h-3 rounded-full bg-zinc-600 animate-pulse [animation-delay:0.5s]" />
          <span className="w-3 h-3 rounded-full bg-zinc-600 animate-pulse [animation-delay:1s]" />
        </div>
      )}
      {!loads.includes(true) &&
        characters &&
        characters.map((character) => (
          <li
            key={character.url}
            className="bg-zinc-700 rounded-md relative overflow-hidden w-full max-w-[280px] group"
          >
            <Link to={`/${getCharacterIdFromUrl(character.url)}`}>
              <span className="[visibility:hidden] flex items-center justify-center group-hover:visible pointer-events-none transition-all absolute top-0 left-0 bg-black/40 w-full h-full">
                <Link2Icon className="w-8 h-8" />
              </span>
              <div className="px-4 py-5">
                <div className="flex flex-col">
                  <span className="font-sans-secondary">{character.name}</span>
                  <span>
                    <strong className="text-zinc-200">Year:</strong>{' '}
                    <span className="text-zinc-400">{character.birth_year}</span>
                  </span>
                </div>
                <hr className="border-zinc-900/40 mt-4 mb-2" />
                <div className="flex flex-col">
                  <strong className="text-zinc-200 mb-2">Specie:</strong>
                  <ul className="flex flex-wrap gap-2">
                    {character.species.map((specie) => (
                      <li
                        key={specie}
                        className="bg-yellow-500 text-zinc-800 rounded-full px-2"
                      >
                        {specie}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        ))}
    </>
  );
};
