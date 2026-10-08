import { useState } from 'react';

export default function CompanyMember() {
    const [count, setCount] = useState(0);

    return (
        <div className="space-y-4">
            <div>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <h1 className="mb-4 text-2xl font-bold">Company Member Page</h1>
                <p>This is the Company Member page content.</p>
            </div>

            <section className="max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="mt-4 flex items-center gap-3">
                    <span
                        className="min-w-24 rounded-md bg-primary-50 px-4 py-2 text-center text-lg font-semibold text-primary-700"
                    >
                        {count}
                    </span>
                    <button
                        type="button"
                        onClick={() => setCount((value) => value + 1)}
                        className="rounded-md bg-primary-600 px-4 py-2 font-medium text-white transition "
                    >
                        Increment
                    </button>
                </div>
            </section>
        </div>
    );
}
