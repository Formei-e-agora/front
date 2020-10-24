import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Row, Col } from 'antd';
import { HomeFilled, BellFilled, ToolFilled, ShoppingFilled, WalletFilled, ContactsFilled } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { selectJobClear } from '../../actions';

const Header = (props) => {

    const currentLocation = (props.currentLocation === "/")
        ? "/feed"
        : props.currentLocation;

    return (
        <Layout.Header style={{ height: '100%' }}>
            <Row justify="space-between">
                <Col xxl={13} xl={15} />

                <Col xxl={8} xl={9}>
                    <Menu theme="dark" mode="horizontal" style={{ float: 'right' }} defaultSelectedKeys={[currentLocation]} onSelect={() => props.selectJobClear() }>
                        <Menu.Item key="/feed" icon={<HomeFilled />}>
                            <Link to='/feed'>Início</Link>
                        </Menu.Item>
                        <Menu.Item key="/jobs" icon={<ShoppingFilled />}>
                            <Link to='/jobs'>Vagas</Link>
                        </Menu.Item>
                        { (props.personData && props.personData.isAdmin) &&
                            <Menu.Item key="/usermanager" icon={<ContactsFilled />}>
                                <Link to='/usermanager'>Usuários</Link>
                            </Menu.Item>
                        }
                        {/* <Menu.Item key="/notifications" icon={<BellFilled />}>
                            <Link to='/notifications'>Notificações</Link>
                        </Menu.Item> */}
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

const mapStateToProps = state => ({ personData: state.api.person });

export default connect(mapStateToProps, { selectJobClear })(Header);