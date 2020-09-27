import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { HomeFilled, BellFilled, ToolFilled, ShoppingFilled, WalletFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";

const Header = (props) => {

    const currentLocation = (props.currentLocation === "/")
        ? "/feed"
        : props.currentLocation;

    return (
        <Layout.Header style={{ height: '100%' }}>
            <Row justify="space-between">
                <Col xxl={13} xl={15} />

                <Col xxl={8} xl={9}>
                    <Menu theme="dark" mode="horizontal" style={{ float: 'right' }} defaultSelectedKeys={[currentLocation]}>
                        <Menu.Item key="/feed" icon={<HomeFilled />}>
                            <Link to='/feed'>Início</Link>
                        </Menu.Item>
                        <Menu.Item key="/jobs" icon={<ShoppingFilled />}>
                            <Link to='/jobs'>Vagas</Link>
                        </Menu.Item>
                        <Menu.Item key="/notifications" icon={<BellFilled />}>
                            <Link to='/notifications'>Notificações</Link>
                        </Menu.Item>
                        <Menu.Item key="/settings" icon={<ToolFilled />}>
                            <Link to='/settings'>Configurações</Link>
                        </Menu.Item>
                        <Menu.Item key="/login" icon={<WalletFilled />}>
                            <Link to='/login'>Sair</Link>
                        </Menu.Item>
                    </Menu>
                </Col>

                <Col xxl={3} xl={0} />
            </Row>
        </Layout.Header>
    );
}

export default Header;