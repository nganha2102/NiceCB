import {
    BankOutlined,
    FileTextOutlined,
    KeyOutlined,
    SettingOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { Menu, Tabs } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
                    className="overflow-x-auto border-b border-gray-200 bg-white"
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
                        if (action === 'remove') void closeTab(targetKey);
                    }}
                    className="mb-0! border-b border-gray-200 bg-gray-50 px-2 pt-1"
                />
            </div>

            <div className="flex items-start">
                <aside
                    aria-label={`${activeSection?.slice(1) ?? 'Section'} navigation`}
                    className="sticky top-35.5 h-[calc(100dvh-8.875rem)] w-56 shrink-0 self-start overflow-y-auto border-r border-gray-200 bg-white"
                >
                    <Menu
                        mode="inline"
                        selectedKeys={[pathname]}
                        items={activeItems}
                        onClick={({ key }) => navigate(key)}
                    />
                </aside>

                <div className="min-w-0 flex-1">{children}</div>
            </div>
        </div>
    );
}
