import React from 'react';
import { Row, Col, Card, Button, Divider, Typography, Tag } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { courses } from '../../helpers/courses';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

const JobDetails = (props) => {

    const item = props.data;

    return (
        <Card bordered={false} style={{ boxShadow: 'none' }}>
            <div style={{ float: 'right', marginLeft: '1em' }}>
                <Button type="primary" style={{ marginRight: 8 }} onClick={() => props.showJobModal()}>Editar</Button>
                {item.isActive && <Button type="danger" onClick={() => props.deactivateJob(item)}>Desativar</Button>}
                {!item.isActive && <Button type="secondary" onClick={() => props.activateJob(item)}>Ativar</Button>}
            </div>

            <Typography>
                <Title level={4} >{item.title}</Title>
                <Title level={5}>
                    {item.company} -
                    <EnvironmentOutlined style={{ color: '#555', marginRight: 4, marginLeft: 4 }} />
                    {item.workplace}
                </Title>
                <Paragraph>
                    {!item.isActive && <Tag color="geekblue">Oferta Inativa</Tag>}
                    {item.isActive && <Tag color="red">Oferta Ativa</Tag>}
                    {item.isRemote && <Tag color="purple">Aceita remoto</Tag>}
                </Paragraph>
                <Row justify="space-between" gutter={8}>
                    <Col span={6}>
                        <Card style={{ height: '100%' }} bodyStyle={{ padding: 12 }}>
                            <span style={{ display: 'block', fontWeight: 600 }}>Função</span>
                            <span style={{ display: 'block' }}>{item.position}</span>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{ height: '100%' }} bodyStyle={{ padding: 12 }}>
                            <span style={{ display: 'block', fontWeight: 600 }}>Nível de experiência</span>
                            <span style={{ display: 'block' }}>{item.experience}</span>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{ height: '100%' }} bodyStyle={{ padding: 12 }}>
                            <span style={{ display: 'block', fontWeight: 600 }}>Começa em</span>
                            <span style={{ display: 'block' }}>{moment(item.creationDate).format('DD/MM/YYYY')}</span>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{ height: '100%' }} bodyStyle={{ padding: 12 }}>
                            <span style={{ display: 'block', fontWeight: 600 }}>Finaliza em</span>
                            <span style={{ display: 'block' }}>{moment(item.closeDate).format('DD/MM/YYYY')}</span>
                        </Card>
                    </Col>
                </Row>
                <Divider type="horizontal" />
                <Paragraph>
                    <Title level={5}>Descrição</Title>
                    {
                        item.description && item.description.split("\n").map((p) => <Paragraph>{p}</Paragraph>)
                    }
                </Paragraph>
                <Divider type="horizontal" />
                <Paragraph ellipsis={{ rows: 8, expandable: true, symbol: 'ver mais' }}>
                    <div style={{ float: 'right' }}>
                        <Button type="primary" style={{ marginRight: 8 }} onClick={() => props.showCourseModal()}>Editar</Button>
                    </div>
                    <Title level={5}>Vaga ofertada a alunos dos cursos</Title>
                    {
                        item.courseRequirement && item.courseRequirement.map((c) => <Text style={{ display: 'block' }}>{courses[c.course]}</Text>)
                    }
                </Paragraph>
            </Typography>
        </Card>
    );
}

export default JobDetails;