import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, notification, Button, Select } from 'antd';
import { validatePassword, validatePasswordConfirm, validateCpf, validateEmailConfirm } from '../../utils/validators';
import { updatePerson, findPerson } from '../../services/person';
import { courses, departments } from '../../helpers';
import { cpfMask, phoneMask } from '../../utils/masks';

const JobForm = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const onFinish = async (values) => {
        setLoading(true);

        const payload = {
            personalId: values.personalId,
            name: values.name,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email,
            course: values.course,
            department: values.department
        }

        const json = await updatePerson(userData.userId, payload);

        if (json.Status) {
            notification.success({
                message: 'Dados atualizados!',
                description: 'Suas informações foram atualizadas com sucesso!'
            });
            form.resetFields();
        } else {
            notification.error({
                message: 'Erro ao atualizar dados',
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
                        <Input size="large" placeholder="Título" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="company"
                        rules={[{ required: true, message: 'Digite a empresa' }]}
                    >
                        <Input size="large" placeholder="Empresa" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="position"
                        rules={[{ required: true, message: 'Digite o cargo' }]}
                    >
                        <Input size="large" placeholder="Cargo" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle">
                <Col span={20}>
                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: 'Digite a descrição' }]}
                    >
                        <Input size="large" placeholder="Descrição" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="experience"
                        rules={[{ required: true, message: 'Digite a experiência' }]}
                    >
                        <Input size="large" placeholder="Experiência" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="workplace"
                        rules={[{ required: true, message: 'Digite o local de trabalho' }]}
                    >
                        <Input size="large" placeholder="Local de Trabalho" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="creationDate"
                        rules={[{ required: true, message: 'Digite a data de início' }]}
                    >
                        <Input size="large" placeholder="Data de início" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="closeDate"
                        rules={[{ required: true, message: 'Digite a data final' }]}
                    >
                        <Input size="large" placeholder="Data final" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="isRemote"
                        rules={[{ required: true, message: 'Digite a data de início' }]}
                    >
                        <Input size="large" placeholder="isRemote" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="isActive"
                        rules={[{ required: true, message: 'Digite a data final' }]}
                    >
                        <Input size="large" placeholder="isActive" />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default JobForm;