import KeepAliveRouteOutlet from 'keepalive-for-react-router';
import { useKeepAliveRef } from 'keepalive-for-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles.css';

export default function DashboardLayout() {
    const aliveRef = useKeepAliveRef();

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Sidebar onCloseTab={(key) => aliveRef.current?.destroy(key)}>
                <main className="min-w-0 p-5">
                    <KeepAliveRouteOutlet max={10} aliveRef={aliveRef} />
                </main>
            </Sidebar>
        </div>
    );
}
