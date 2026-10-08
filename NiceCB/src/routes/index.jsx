import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts';
import ErrorBoundary from '../pages/ErrorBoundary';
import NotFound from '../pages/NotFound';

const page = (loader) => async () => ({ Component: (await loader()).default });

export const router = createBrowserRouter([
    { path: '/login', lazy: page(() => import('../pages/Login')) },
    {
        path: '/',
        errorElement: <ErrorBoundary />,
        element: (
            // <ProtectedRoute>
                <DashboardLayout />
            // </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/member/company-member" replace />,
            },
            {
                path: 'member',
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate to="/member/company-member" replace />
                        ),
                    },
                    {
                        path: 'company-member',
                        lazy: page(
                            () => import('../pages/Member/CompanyMember'),
                        ),
                    },
                    {
                        path: 'contract',
                        lazy: page(() => import('../pages/Member/Contract')),
                    },
                    {
                        path: 'user-code',
                        lazy: page(() => import('../pages/Member/UserCode')),
                    },
                ],
            },
            {
                path: 'information',
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate
                                to="/information/company-information"
                                replace
                            />
                        ),
                    },
                    {
                        path: 'company-information',
                        lazy: page(() => import('../pages/Placeholder')),
                    },
                    {
                        path: 'contract-information',
                        lazy: page(() => import('../pages/Placeholder')),
                    },
                ],
            },
            {
                path: 'registration',
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate
                                to="/registration/company-registration"
                                replace
                            />
                        ),
                    },
                    {
                        path: 'company-registration',
                        lazy: page(() => import('../pages/Placeholder')),
                    },
                    {
                        path: 'contract-registration',
                        lazy: page(() => import('../pages/Placeholder')),
                    },
                ],
            },
            {
                path: 'system',
                children: [
                    {
                        index: true,
                        element: (
                            <Navigate to="/system/user-management" replace />
                        ),
                    },
                    {
                        path: 'user-management',
                        lazy: page(() => import('../pages/Placeholder')),
                    },
                    {
                        path: 'role-management',
                        lazy: page(() => import('../pages/Placeholder')),
                    },
                ],
            },
        ],
    },
    { path: '*', element: <NotFound /> },
]);
