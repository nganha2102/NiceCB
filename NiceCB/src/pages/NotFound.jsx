export default function NotFound() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-red-600">404</h1>
                <p className="mb-4 text-gray-700">
                    Page Not Found
                </p>
            </div>
        </div>
    );
}
