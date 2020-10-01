import React from 'react';
import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const PublishBox = () => {
    return (
        <Card
            actions={[
                <span><EditOutlined key="setting" style={{ marginRight: 8 }} />Publicar</span>,
            ]}
        >
            <Card.Meta title={<h3>Começar uma publicação</h3>} />
        </Card>
    );
}

export default PublishBox;