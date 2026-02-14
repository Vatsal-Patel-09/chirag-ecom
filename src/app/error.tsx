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
        <h1 className="text-6xl font-bold font-marker text-warm-300 mb-4">
          Oops!
        </h1>
        <h2 className="text-xl font-semibold text-warm-900 mb-3">
          Something went wrong
        </h2>
        <p className="text-warm-500 mb-8">
          Don&apos;t worry, please try again.
        </p>
        <button
          onClick={reset}
          className="sketchy-border bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 font-medium transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
