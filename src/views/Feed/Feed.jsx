import React from 'react';
import { Row, Col, Card, Space } from 'antd';
import { Layout, UserCard, JobFeed, PublishBox } from '../../components/index';

const Feed = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <Row justify="center" gutter={16}>
                <Col span={4}>
                    <UserCard />
                </Col>
                <Col span={8}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <PublishBox />
                        <JobFeed />
                    </Space>
                </Col>
                <Col span={4}>
                    <Card>
                        ofertas
                    </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default Feed;