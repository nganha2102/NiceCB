import {
    BankOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileTextOutlined,
    KeyOutlined,
    SettingOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Button, Menu, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggleSidebar } from '@/store/ui.slice';

const topLevelItems = [
    {
        key: '/member',
        icon: <TeamOutlined />,
        label: 'Member',
        style: { width: '14rem', flex: '0 0 14rem', justifyContent: 'center' },
    },
    {
        key: '/information',
        icon: <BankOutlined />,
        label: 'Information',
        style: { width: '14rem', flex: '0 0 14rem', justifyContent: 'center' },
    },
    {
        key: '/registration',
        icon: <FileTextOutlined />,
        label: 'Registration',
        style: { width: '14rem', flex: '0 0 14rem', justifyContent: 'center' },
    },
    {
        key: '/system',
        icon: <SettingOutlined />,
        label: 'System',
        style: { width: '14rem', flex: '0 0 14rem', justifyContent: 'center' },
    },
];

const memberItems = [
    {
        key: '/member/company-member',
        icon: <BankOutlined />,
        label: 'Company Member',
    },
    {
        key: '/member/contract',
        icon: <FileTextOutlined />,
        label: 'Contract',
    },
    {
        key: '/member/user-code',
        icon: <KeyOutlined />,
        label: 'User Code',
    },
];

const informationItems = [
    {
        key: '/information/company-information',
        icon: <BankOutlined />,
        label: 'Company Information',
    },
    {
        key: '/information/contract-information',
        icon: <FileTextOutlined />,
        label: 'Contract Information',
    },
];

const registrationItems = [
    {
        key: '/registration/company-registration',
        icon: <BankOutlined />,
        label: 'Company Registration',
    },
    {
        key: '/registration/contract-registration',
        icon: <FileTextOutlined />,
        label: 'Contract Registration',
    },
];

const systemItems = [
    {
        key: '/system/user-management',
        icon: <TeamOutlined />,
        label: 'User Management',
    },
    {
        key: '/system/role-management',
        icon: <KeyOutlined />,
        label: 'Role Management',
    },
];

const sectionMenus = {
    '/member': memberItems,
    '/information': informationItems,
    '/registration': registrationItems,
    '/system': systemItems,
};

const allItems = Object.values(sectionMenus).flat();
const defaultSectionPages = Object.fromEntries(
    Object.entries(sectionMenus).map(([section, items]) => [
        section,
        items[0]?.key,
    ]),
);

export default function Sidebar({ children, onCloseTab }) {
    const { pathname, search } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sidebarCollapsed = useSelector((state) => state.ui.collapsed);
    const lastActivePageBySection = useRef({ ...defaultSectionPages });
    const [tabState, setTabState] = useState({ locationKey: null, tabs: [] });
    const activeTabKey = `${pathname}${search}`;
    const activeSection = Object.keys(sectionMenus).find(
        (section) => pathname === section || pathname.startsWith(`${section}/`),
    );
    const activeItems = activeSection ? sectionMenus[activeSection] : [];
    const currentItem = allItems.find((item) => item.key === pathname);

    useEffect(() => {
        if (activeSection && currentItem) {
            lastActivePageBySection.current[activeSection] = pathname;
        }
    }, [activeSection, currentItem, pathname]);

    if (currentItem && tabState.locationKey !== activeTabKey) {
        const tabs = tabState.tabs.some((tab) => tab.key === activeTabKey)
            ? tabState.tabs
            : [
                  ...tabState.tabs,
                  { key: activeTabKey, label: currentItem.label },
              ];
        setTabState({ locationKey: activeTabKey, tabs });
    }
    const openTabs = tabState.tabs;

    const closeTab = async (targetKey) => {
        if (typeof targetKey !== 'string') return;

        const closedTabIndex = openTabs.findIndex(
            (tab) => tab.key === targetKey,
        );
        const remainingTabs = openTabs.filter((tab) => tab.key !== targetKey);
        setTabState((state) => ({ ...state, tabs: remainingTabs }));

        if (targetKey === activeTabKey) {
            const nextTab =
                remainingTabs[
                    Math.min(closedTabIndex, remainingTabs.length - 1)
                ];
            navigate(nextTab?.key ?? activeSection ?? '/member');
        }

        await onCloseTab?.(targetKey);
    };

    return (
        <div className="flex flex-col">
            <div className="sticky top-14 z-40 bg-white">
                <nav
                    aria-label="Main navigation"
                    className="hidden overflow-x-auto border-b border-gray-200 bg-white md:block"
                >
                    <Menu
                        mode="horizontal"
                        className="min-w-max!"
                        selectedKeys={activeSection ? [activeSection] : []}
                        items={topLevelItems}
                        onClick={({ key }) =>
                            navigate(
                                lastActivePageBySection.current[key] ?? key,
                            )
                        }
                    />
                </nav>
                <div className="flex items-stretch w-full h-full">
                        <div className="flex shrink-0 items-center gap-2 bg-primary-500 px-2 md:w-56 md:px-4">
                            <Button
                                type="text"
                                aria-label={
                                    sidebarCollapsed
                                        ? 'Show navigation'
                                        : 'Hide navigation'
                                }
                                aria-expanded={!sidebarCollapsed}
                                aria-controls="section-navigation"
                                icon={
                                    sidebarCollapsed ? (
                                        <MenuUnfoldOutlined />
                                    ) : (
                                        <MenuFoldOutlined />
                                    )
                                }
                                onClick={() => dispatch(toggleSidebar())}
                                className="text-white hover:text-white"
                            />
                            {
                                topLevelItems.find(
                                    (item) => item.key === activeSection,
                                )?.label
                            }
                        </div>
                    <div className="flex-1">
                        <Tabs
                            type="editable-card"
                            hideAdd
                            activeKey={
                                openTabs.some((tab) => tab.key === activeTabKey)
                                    ? activeTabKey
                                    : undefined
                            }
                            items={openTabs}
                            onChange={navigate}
                            onEdit={(targetKey, action) => {
                                if (action === 'remove')
                                    void closeTab(targetKey);
                            }}
                            className="mb-0! border-b border-gray-200 bg-gray-50 px-2 pt-1"
                        />
                    </div>
                </div>
            </div>

            <div className="relative flex items-start">
                {!sidebarCollapsed && (
                    <aside
                        id="section-navigation"
                        aria-label={`${activeSection?.slice(1) ?? 'Section'} navigation`}
                        className="absolute inset-x-0 top-0 z-40 max-h-[calc(100dvh-8rem)] overflow-y-auto border-b border-gray-200 bg-white shadow-md md:sticky md:inset-auto md:top-35.5 md:h-[calc(100dvh-8.875rem)] md:max-h-none md:w-56 md:shrink-0 md:self-start md:border-b-0 md:border-r md:shadow-none"
                    >
                        <Menu
                            mode="inline"
                            className="md:hidden"
                            selectedKeys={activeSection ? [activeSection] : []}
                            items={topLevelItems.map((item) => ({
                                ...item,
                                style: undefined,
                            }))}
                            onClick={({ key }) =>
                                navigate(
                                    lastActivePageBySection.current[key] ?? key,
                                )
                            }
                        />
                        {activeSection && (
                            <Menu
                                mode="inline"
                                selectedKeys={[pathname]}
                                items={activeItems}
                                onClick={({ key }) => navigate(key)}
                            />
                        )}
                    </aside>
                )}

                <div className="min-w-0 flex-1">{children}</div>
            </div>
        </div>
    );
}
