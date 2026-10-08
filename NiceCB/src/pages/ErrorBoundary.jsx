import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
    const error = useRouteError();
    const errorMessage =
        error instanceof Error
            ? error.message
            : isRouteErrorResponse(error)
              ? error.data?.message || error.statusText
              : typeof error === 'string'
                ? error
                : 'Please try again later.';

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-red-600">
                    Something went wrong
                </h1>
                <p className="mb-4 text-gray-700">Please try again later.</p>
                <pre className="mb-4 overflow-auto rounded bg-gray-100 p-4 text-sm text-gray-800">
                    {errorMessage}
                </pre>
            </div>
        </div>
    );
}
