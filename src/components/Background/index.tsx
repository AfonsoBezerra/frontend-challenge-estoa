import { StarWarsIcon } from 'assets/star-wars';

export const Background = () => (
  <div className="max-w-screen top-14 z-[-1] w-full h-full max-h-screen overflow-hidden fixed opacity-20">
    <StarWarsIcon className="[&_path]:animate-stroke [&_path]:[stroke-dasharray:100] [&_path]:stroke-yellow-400 w-[80vw] h-auto absolute fill-black -translate-y-1/4 left-1/2 -translate-x-[55%]" />
  </div>
);
