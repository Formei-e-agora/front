import React from 'react';
import { Row, Col, Card, List, Divider } from 'antd';
import { Layout } from '../../components/index';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

const Notifications = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <Row justify="center" gutter={16}>
                <Col xxl={16} xl={18}>
                    <Card>

                        <Divider>Notificações Novas</Divider>

                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />

                        <Divider>Notificações Antigas</Divider>

                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default Notifications;