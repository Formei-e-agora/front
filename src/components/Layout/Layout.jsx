import React from 'react';
import { Layout as AntdLayout } from 'antd';
import { Header, Footer } from '../index';

const contentStyle = {
    padding: '24px 16px',
    minHeight: '100vh'
}

const Layout = (props) => {
    return (
        <AntdLayout>
            <Header currentLocation={props.currentLocation} />
            <AntdLayout.Content style={contentStyle}>
                {props.children}
            </AntdLayout.Content>
            <Footer />
        </AntdLayout>
    );
}

export default Layout;