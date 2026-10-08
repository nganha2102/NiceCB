import { LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import { Avatar, Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/auth.slice';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-primary-800 bg-primary-700 px-4 text-white shadow-sm sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <TeamOutlined className="text-lg" />
                </div>
                <div className="min-w-0">
                    <div className="truncate text-base font-semibold leading-tight">
                        NiceCB
                    </div>
                </div>
            </div>

            <Space size="middle">
                <div className="hidden items-center gap-2 sm:flex">
                    <Avatar className="bg-white/20 text-white">A</Avatar>
                    <span className="text-sm font-medium">Admin</span>
                </div>
                <Button
                    aria-label="Log out"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    className="border-white/40 text-white hover:border-white hover:text-white"
                >
                    <span className="hidden sm:inline">Log out</span>
                </Button>
            </Space>
        </header>
    );
}
