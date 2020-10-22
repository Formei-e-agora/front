import React, { useState } from 'react';
import { List, Card, Typography, Badge, Space, Tag, Divider, Button } from 'antd';
import { EllipsisOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const FeedContent = (props) => {

    const [fakePage, nextFakePage] = useState(5);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const id = userData.userId;

    const getActions = (userType, item) => {
        if (userType === 1) {
            return [
                <Space size="middle"><Badge count={item.subscription.length} showZero style={{ position: 'relative', top: '-2px' }} />Interessados</Space>,
                <span><EllipsisOutlined style={{ marginRight: 8 }} />Mais Informações</span>
            ];
        } else {
            return [

            ];
        }
    }

    const onLoadMore = () => {
        console.log("asd", fakePage)
        if (fakePage >= 50)
            nextFakePage(5)
        else
            nextFakePage(fakePage + 5)
    }

    if (props.data)
        return (
            <List
                grid={{ column: 1 }}
                dataSource={props.data && props.data.slice(0, fakePage)}
                loading={props.loading}
                style={{ overflowAnchor: 'none' }}
                loadMore={!props.loading && props.data && props.data.length > fakePage ? (
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 12,
                            height: 32,
                            lineHeight: '32px',
                        }}
                    >
                        <Button type="primary" onClick={onLoadMore}>Carregar mais ofertas</Button>
                    </div>
                ) : null}
                renderItem={item => (
                    <List.Item>
                        <Badge.Ribbon text={item.isActive ? "Oferta Ativa" : "Oferta Inativa"} color={item.isActive ? "#1890ff" : "#BEC8C"} placement="end">
                            <Card
                                headStyle={{ border: 0 }}
                                actions={getActions(id, item)}
                            >
                                <Typography>
                                    <Title level={4}>{item.title}</Title>
                                    <Title level={5}>
                                        {item.company} -
                                         <EnvironmentOutlined style={{ color: '#555', marginRight: 4, marginLeft: 4 }} />
                                        {item.workplace}
                                    </Title>
                                    <Paragraph>
                                        <Tag>{item.position}</Tag>
                                        <Tag color="geekblue">{item.experience}</Tag>
                                        {item.isRemote && <Tag color="purple">Aceita remoto</Tag>}
                                    </Paragraph>
                                    <Divider type="horizontal" />
                                    <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: 'Ver mais' }}>
                                        <Title level={5}>Descrição</Title>
                                        {
                                            item.description && item.description.split("\n").map((p) => <Paragraph>{p}</Paragraph>)
                                        }
                                    </Paragraph>
                                    {(item.courseRequirement.length > 0)
                                        ? <Text strong>Vaga ofertada a alunos de {item.courseRequirement.length} curso{item.courseRequirement.length > 1 && "s"}</Text>
                                        : <Text type="danger">Esta vaga está invisível aos alunos, adicione um curso à ela na página de Vagas</Text>
                                    }
                                </Typography>
                            </Card>
                        </Badge.Ribbon>
                    </List.Item>
                )}
            />
        );
    else
        return null
}

export default FeedContent;