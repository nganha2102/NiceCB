import SvgIcon from '@/components/svg';

export default function NotFound() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-4 text-red-600">404</h1>
                <div className="display-lg">Test Font-size</div>
                <SvgIcon name="chevron_drop_down" />
                <p className="text-t2-3xl text-gray-700">Page Not Found</p>
            </div>
        </div>
    );
}
