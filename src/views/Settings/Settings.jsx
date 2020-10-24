import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Tabs } from 'antd';
import { Layout, UserCard, ChangePasswordForm, ProfileForm, AddressForm } from '../../components/index';
import { getUserData, getPersonData, getAddressData } from '../../actions/apiActions';

const { TabPane } = Tabs;

const Settings = (props) => {

    useEffect(() => {
        const id = JSON.parse(sessionStorage.getItem("userData")).userId;
        props.getUserData(id);
        props.getPersonData(id);
        props.getAddressData(id);
    }, []);

    const updateStore = (id) => {
        props.getPersonData(id);
        props.getAddressData(id);
    }

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
                                <ProfileForm refresh={updateStore} />
                            </TabPane>
                            <TabPane tab="Endereço" key="2">
                                <AddressForm refresh={updateStore} />
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

export default connect(null, { getUserData, getPersonData, getAddressData })(Settings);