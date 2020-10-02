import React from 'react';
import { Row, Col, Card, List, Result } from 'antd';
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

const Jobs = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <Row justify="center" gutter={16}>
                <Col xxl={16} xl={18}>
                    <Card>
                        <Row justify="space-between">
                            <Col span={8}>
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
                            </Col>
                            <Col span={16}>
                                <Result
                                    title="Detalhes da oferta"
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default Jobs;