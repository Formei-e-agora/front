import React from 'react';
import { Card, Typography } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import './PublishBox.css';

const PublishBox = () => {
    return (
        <Card
            // actions={[

            // ]}
        >
            <Card.Meta
                title={
                    <Typography.Title level={5} className="publish-box-btn">
                        <FormOutlined style={{ marginRight: 8 }} />
                        Começar uma publicação
                    </Typography.Title>
                }
            />
        </Card>
    );
}

export default PublishBox;