import React, { useState } from 'react';
import { List, Card, Typography, Badge, Space, Tag, Divider, Button, message, Result } from 'antd';
import { EllipsisOutlined, EnvironmentOutlined, LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import { createSubscription } from '../../services/subscription';
import NoData from '../../images/no_data.svg';

const { Title, Paragraph, Text } = Typography;

const FeedContent = (props) => {

    const [fakePage, nextFakePage] = useState(5);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const id = userData.userId;

    const getActions = (userType, item) => {
        if (userType === 1) {
            return [
                <Space size="middle"><Badge count={item.subscription.length} showZero style={{ position: 'relative', top: '-2px' }} />Interessados</Space>,
                <span onClick={() => goToJob(item.jobId)}><EllipsisOutlined style={{ marginRight: 8 }} />Mais Informações</span>
            ];
        } else {
            return [
                item.subscription.find((s) => s.studentId === userData.userId)
                    ? <span><LikeTwoTone style={{ marginRight: 8 }} />Interessado</span>
                    : <span onClick={() => subscribeToJob(item.jobId)}><LikeOutlined style={{ marginRight: 8 }} />Demonstrar Interesse</span>,
                <span onClick={() => goToJob(item.jobId)}><EllipsisOutlined style={{ marginRight: 8 }} />Mais Informações</span>
            ];
        }
    }

    const goToJob = (jobId) => {
        props.selectJob(jobId);
        props.history.push('/jobs');
    }

    const onLoadMore = () => {
        if (fakePage >= 50)
            nextFakePage(5)
        else
            nextFakePage(fakePage + 5)
    }

    const subscribeToJob = async (jobId) => {
        const payload = {
            jobId: jobId,
            studentId: userData.userId,
            isRecommended: false
        }
        const json = await createSubscription(payload);
        if (json.Status) {
            message.success("Ação realizada com sucesso!");
            props.refresh();
        } else
            message.error("Falha em processar ação.");
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
                        <Badge.Ribbon text={item.isActive ? "Oferta Ativa" : "Oferta Inativa"} color={item.isActive ? "#1890ff" : "#707070"} placement="end">
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
        return <Result
            icon={<img src={NoData} alt="" style={{ display: 'block', margin: '0 auto', width: '35%' }} />}
            title="Não foi cadastrada nenhuma vaga ainda."
        />
}

export default FeedContent;