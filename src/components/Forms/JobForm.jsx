import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Button, Checkbox, DatePicker, notification } from 'antd';
import { TagOutlined, BankOutlined, ScheduleOutlined, TrophyOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { createJob } from '../../services/job';

const JobForm = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const onFinish = async (values) => {
        setLoading(true);

        const json = await createJob({ ...values, isRemote: !!(values.isRemote), professorId: userData.userId, isActive: true });

        if (json.Status) {
            notification.success({
                message: 'Vaga cadastrada!',
                description: 'Para finalizar adicione os cursos para o qual esta vaga é ofertada!'
            });
            props.next(json.jobData.jobId);
        } else {
            notification.error({
                message: 'Erro ao cadastrar vaga',
                description: 'Certifique que tudo está correto e tente novamente.'
            });
        }

        setLoading(false);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="register-form"
            onFinish={onFinish}
            hideRequiredMark
        >
            <Row justify="center" align="middle">
                <Col span={20}>
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Digite o título' }]}
                    >
                        <Input size="large" placeholder="Título da vaga" prefix={<TagOutlined style={{ marginRight: 8 }} />} />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="company"
                        rules={[{ required: true, message: 'Digite a empresa' }]}
                    >
                        <Input size="large" placeholder="Empresa" prefix={<BankOutlined style={{ marginRight: 8 }} />} />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="position"
                        rules={[{ required: true, message: 'Digite o cargo' }]}
                    >
                        <Input size="large" placeholder="Cargo" prefix={<ScheduleOutlined style={{ marginRight: 8 }} />} />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle">
                <Col span={20}>
                    <Form.Item
                        name="description"
                        label={<h3>Fale um pouco sobre a vaga</h3>}
                        rules={[{ required: true, message: 'Digite a descrição' }]}
                    >
                        <Input.TextArea 
                            rows={6} 
                            placeholder="Descrição da vaga, sobre a empresa, requisitos, benefícios..." 
                            maxLength={800}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="experience"
                        rules={[{ required: true, message: 'Digite a experiência' }]}
                    >
                        <Select size="large" placeholder={<><TrophyOutlined style={{ marginRight: 8, color: '#000000' }} />Nível de experiência</>}>
                            <Select.Option value="Estágio">Estágio</Select.Option>
                            <Select.Option value="Assistente">Assistente</Select.Option>
                            <Select.Option value="Júnior">Júnior</Select.Option>
                            <Select.Option value="Pleno-sênior">Pleno-sênior</Select.Option>
                            <Select.Option value="Diretor">Diretor</Select.Option>
                            <Select.Option value="Executivo">Executivo</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="workplace"
                        rules={[{ required: true, message: 'Digite o local de trabalho' }]}
                    >
                        <Input size="large" placeholder="Local de Trabalho" prefix={<EnvironmentOutlined style={{ marginRight: 8 }} />} />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="creationDate"
                        rules={[{ required: true, message: 'Digite a data de início' }]}
                    >
                        <DatePicker size="large" placeholder="Data de início da oferta" style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="closeDate"
                        rules={[{ required: true, message: 'Digite a data final' }]}
                    >
                        <DatePicker size="large" placeholder="Data de término da oferta" style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="start" align="middle" gutter={16}>
                <Col span={10} offset={2}>
                    <Form.Item name="isRemote" valuePropName="checked">
                        <Checkbox checked={false}>Aceita trabalho remoto</Checkbox>
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle">
                <Col span={20}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} size="large">
                            Cadastrar vaga
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default JobForm;