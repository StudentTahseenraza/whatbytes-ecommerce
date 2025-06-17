// src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-blue-gray">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-600">
        The product you’re looking for doesn’t exist or has been removed.
      </p>
      <Link href="/">
        <button className="px-4 py-2 text-sm font-medium text-white rounded bg-deep-blue">
          Back to Home
        </button>
      </Link>
    </div>
  );
}