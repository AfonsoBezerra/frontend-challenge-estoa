import { useEffect, useState } from 'react';

export const ErrorToast = ({ hasError }: { hasError: boolean }) => {
  const [enableToast, setEnableToast] = useState(false);

  useEffect(() => {
    if (hasError) {
      setEnableToast(true);
      setTimeout(() => {
        setEnableToast(false);
      }, 1 * 60 * 1000); // 1 min
    }
  }, [hasError]);

  return enableToast ? (
    <div className="fixed top-8 right-4">
      <div
        id="toast-danger"
        className="flex items-center animate-fade-top w-full max-w-xs p-4 mb-4 text-white bg-red-600/30 rounded-lg shadow"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-red-800 text-red-200">
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">
          Ocurred an error on fetch the data, please try again more late.
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
