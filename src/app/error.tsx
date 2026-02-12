"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">
          Oops!
        </h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-8">
          Don&apos;t worry, please try again.
        </p>
        <button
          onClick={reset}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
