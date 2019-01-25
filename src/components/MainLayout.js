import React, {useState} from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const { Header, Content, Sider } = Layout;

function MainLayout({children}){
    let [collapsed, setCollapsed] = useState(false);
    
    const toggle = () => {
        setCollapsed(!collapsed);
    }

    const handleMenuSelected = (item, key, selectedKeys) => {
        console.log('item~selected', item, key, selectedKeys);
    }

    const logout = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        window.location.href = '/login';
    }

    const user = Cookies.getJSON('user');

    console.log('user', user);

    return (
        <Layout>
            <Sider
                theme="light"
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
            <div className="logo" />
            <Menu 
                theme="light" 
                mode="inline" 
                defaultSelectedKeys={[window.location.pathname]}
            >
                <Menu.Item key="/question">
                    <Link to="/question">
                        <Icon type="user"/>
                        <span>问券管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/result">
                    <Link to="/result">
                        <Icon type="video-camera"/>
                        <span>问券结果</span>
                    </Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout>
                <Header 
                    style={{ 
                        background: '#fff', 
                        padding: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Icon
                        className="trigger"
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={toggle}
                    />
                    <div
                        style={{
                            display: 'flex',
                            paddingRight: '24px',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar 
                            shape="circle" 
                            size="small" 
                            icon="smile" 
                            style={{
                                color: '#fff',
                                backgroundColor: '#1890ff',
                            }}
                        />
                        <div
                            style={{
                                color: '#000',
                                marginLeft: '10px',
                                fontSize: '14px',
                            }}
                        >{user && user.name}</div>
                        <div
                            style={{
                                color: '#1890ff',
                                marginLeft: '15px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                userSelect: 'none',
                            }}
                            onClick={logout}
                        >退出登陆</div>
                    </div>
                </Header>
                <Content style={{
                        margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;