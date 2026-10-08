import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { router } from './routes';

export default function App() {
    return (
        <ConfigProvider>
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}
