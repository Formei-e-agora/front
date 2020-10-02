import React from 'react';
import { Row, Col, Card, Space, List, Divider, Badge } from 'antd';
import { Layout, UserCard, JobFeed, PublishBox } from '../../components/index';

const data = [
    {
        title: 'Front-End Software Engineer',
    },
    {
        title: 'Senior React Native Developer',
    },
    {
        title: 'Desenvolvedor sênior',
    },
    {
        title: 'Desenvolvedor Front end',
    },
];

const Feed = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <Row justify="center" gutter={16}>
                <Col xxl={4} xl={6}>
                    <UserCard />
                </Col>
                <Col xxl={8} xl={10}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <PublishBox />
                        <JobFeed />
                    </Space>
                </Col>
                <Col xxl={4} xl={6}>
                    <Card title={<h4 style={{ margin: 0 }}>Ofertas mais visualizadas</h4>} headStyle={{ border: 0 }} bodyStyle={{ padding: '0px 24px' }}>
                        <List
                            itemLayout="horizontal"
                            split={false}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<div><Badge status="processing" />{item.title}</div>}
                                        description={<div>há 13hrs <Divider type="vertical" /> 225 visualizações</div>}
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

export default Feed;