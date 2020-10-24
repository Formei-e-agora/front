import React, { useState } from 'react';
import { Row, Col, Form, Input, notification, Button } from 'antd';
import { validatePassword, validatePasswordConfirm } from '../../utils/validators';
import { changePassword } from '../../services/auth';

const ChangePasswordForm = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);

        const payload = {
            userId: JSON.parse(sessionStorage.getItem("userData")).userId,
            password: values.oldPassword,
            newPassword: values.password
        }

        const json = await changePassword(payload);

        if (json.Status) {
            notification.success({
                message: 'Senha atualizada!',
                description: 'No seu próximo login você já pode usar sua senha nova!'
            });
            form.resetFields();
        } else {
            notification.error({
                message: 'Erro ao atualizar senha',
                description: 'Certifique que a senha antiga está correta e tente novamente.'
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
            <Row justify="start" align="middle" gutter={8}>
                <Col span={10} offset={2}>
                    <Form.Item
                        name="oldPassword"
                        rules={[{ required: true, message: 'Digite a senha' }, validatePassword]}
                    >
                        <Input.Password size="large" placeholder="Senha Atual" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={8}>
                <Col span={10}>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Digite a senha' }, validatePassword]}
                    >
                        <Input.Password size="large" placeholder="Nova Senha" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="confirmPassword"
                        rules={[{ required: true, message: ' ' }, validatePasswordConfirm]}
                    >
                        <Input.Password size="large" placeholder="Confirmar Senha" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle">
                <Col span={20}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} size="large">
                            Alterar Senha
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default ChangePasswordForm;