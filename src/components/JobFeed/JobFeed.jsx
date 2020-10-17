import React from 'react';
import { List, Card, Typography, Badge, Space, Tag } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const JobFeed = (props) => {

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const id = userData.userId;

    const getActions = (userType, item) => {
        if(userType === 1) {
            return [
                <Space size="middle"><Badge count={item.subscription.length} style={{ position: 'relative', top: '-2px' }} />Interessados</Space>,
                <span><EllipsisOutlined style={{ marginRight: 8 }} />Mais Informações</span>
            ];
        } else {
            return [

            ];
        }
    }

    if (props.data)
        return (
            <List
                grid={{ column: 1 }}
                dataSource={props.data}
                renderItem={item => (
                    <List.Item>
                        <Card
                            headStyle={{ border: 0 }}
                            actions={getActions(id, item)}
                        >
                            <Typography>
                                <Title level={4}>{item.title}</Title>
                                <Title level={5}>{item.company} - {item.workplace}</Title>
                                <Paragraph>
                                    {item.isActive ?  <Tag color="red">Oferta Ativa</Tag> :  <Tag>Indisponível</Tag>}
                                    {item.isRemote && <Tag color="purple">Aceita remoto</Tag>}
                                </Paragraph>
                                <Paragraph>
                                    <Title level={5}>Descrição</Title>
                                    {item.description}
                                </Paragraph>
                                <Paragraph>
                                    {item.position} / {item.experience}
                                </Paragraph>
                                <Paragraph>vaga ofertada a alunos de X courses</Paragraph>
                            </Typography>
                    </Card>
                    </List.Item>
                )}
            />
        );
    else
        return null
}

export default JobFeed;