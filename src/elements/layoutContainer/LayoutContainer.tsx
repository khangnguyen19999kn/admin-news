import { DesktopOutlined, FileOutlined, PieChartOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { EPath } from "@/services/enum";
import { mapPathToLabel, mapPathnameToKey } from "@/services/map";

import styleLayout from "./LayoutContainerStyle.module.scss";

const { Header, Content, Footer, Sider } = Layout;

type TMenuItem = {
  key: string;
  icon: ReactNode;
  label: string;
  disabled?: boolean;
  url: string;
};

const items: TMenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "News List",
    url: EPath.LIST_NEWS,
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "User List",
    url: EPath.LIST_USER,
  },
  {
    key: "3",
    icon: <FileOutlined />,
    label: "List Report",
    url: EPath.LIST_REPORT,
  },
  // {
  //   key: "4",
  //   icon: <TeamOutlined />,
  //   label: "Team",
  //   disabled: true,
  //   url: EPath.TEAM,
  // },
  // {
  //   key: "5",
  //   icon: <UserOutlined />,
  //   label: "User",
  //   disabled: true,
  //   url: EPath.USER,
  // },
];

export default function LayoutContainer({ children }: { children: ReactNode }) {
  const [isCollapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const [breadcrumb, setBreadcrumb] = useState<string>(mapPathToLabel[pathname as EPath]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleMenu = (e: any) => {
    const key = e.key as string;
    const item = items.find(item => item.key === key);
    if (item) {
      setBreadcrumb(item.label);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={isCollapsed} onCollapse={value => setCollapsed(value)}>
        {!isCollapsed ? <h1 className={styleLayout.titleNav}>Tabloid News Management</h1> : ""}
        <div className={styleLayout.groupItemNavbar}>
          <Menu
            theme="dark"
            defaultSelectedKeys={[mapPathnameToKey[pathname as EPath]]}
            mode="inline"
            onClick={handleMenu}
          >
            {items.map(menuItem =>
              menuItem.disabled ? (
                <Menu.Item key={menuItem.key} disabled={true} icon={menuItem.icon}>
                  {menuItem.label}
                </Menu.Item>
              ) : (
                <Menu.Item key={menuItem.key} icon={menuItem.icon}>
                  <Link to={menuItem.url}>{menuItem.label}</Link>
                </Menu.Item>
              )
            )}
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <h1>{breadcrumb}</h1>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Tabloid News Management ©2023 Created by Khang Nguyễn
        </Footer>
      </Layout>
    </Layout>
  );
}
