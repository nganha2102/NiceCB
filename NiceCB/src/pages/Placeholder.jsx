import { useLocation } from 'react-router-dom';

const pageTitles = {
    '/information/company-information': 'Company Information',
    '/information/contract-information': 'Contract Information',
    '/registration/company-registration': 'Company Registration',
    '/registration/contract-registration': 'Contract Registration',
    '/system/user-management': 'User Management',
    '/system/role-management': 'Role Management',
};

export default function Placeholder() {
    const { pathname } = useLocation();
    const title = pageTitles[pathname] ?? 'Page';

    return (
        <section className="rounded-lg border border-gray-200 bg-white p-6">
            <h1 className="text-xl font-semibold text-secondary">{title}</h1>
            <p className="mt-2 text-sm text-secondary-500">
                This page is not available yet.
            </p>
        </section>
    );
}
