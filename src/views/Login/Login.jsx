import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, logout } from '../../actions/userActions';
import { Input, Form, Button, Row, Col, Space, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined, GithubOutlined } from '@ant-design/icons';
import './Login.css';

const { Title } = Typography;

export const Login = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(props.logout, []);

    const onFinish = async (values) => {
        setLoading(true);
        const loginResponse = await props.login(values);
        if (!loginResponse)
            setTimeout(() => props.history.push('/feed'), 2000);
        else
            notification.error({
                message: 'Erro',
                description: 'Não foi possível autenticar com as credenciais providenciadas'
            });
        setLoading(false);
    };

    return (
        <div className="login-wrapper">
            <a href="https://github.com/Formei-e-agora">
                <Title level={2} className="login-title"><Space><GithubOutlined />Formei, e agora?</Space></Title>
            </a>
            <Title level={4} className="login-subtitle">Login</Title>

            <Form
                form={form}
                layout="vertical"
                name="login-form"
                onFinish={onFinish}
                hideRequiredMark
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Digite um Usuário válido' }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Usuário"
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Digite a senha' }]}
                            >
                                <Input.Password size="large" placeholder="Senha" prefix={<LockOutlined />} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-submit-btn" loading={loading} size="large">
                                    Entrar
                                </Button>
                            </Form.Item>
                            <Space style={{ float: 'right', fontSize: 16 }}>
                                <span>Não possui conta?</span>
                                <Link to='/register'><span>Registrar</span></Link>
                            </Space>
                        </Col>
                    </Row>
                </Space>
            </Form>
        </div>
    );
}

export default connect(null, { login, logout })(Login);