import React from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import { Layout, UserCard, ChangePasswordForm, ProfileForm } from '../../components/index';

const { TabPane } = Tabs;

const Settings = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <Row justify="center" gutter={16}>
                <Col xxl={4} xl={6}>
                    <UserCard />
                </Col>
                <Col xxl={12} xl={14}>
                    <Card>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Perfil" key="1">
                                <ProfileForm />
                            </TabPane>
                            <TabPane tab="Endereço" key="2">
                                Form para alterar dados do seu endereço
                            </TabPane>
                            <TabPane tab="Senha" key="3">
                                <ChangePasswordForm />
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default Settings;