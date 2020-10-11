import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Input, Form, Button, Row, Col, Space, Typography, notification, Radio, Select } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { cpfMask, phoneMask } from '../../utils/masks';
import { validateCpf, validatePassword, validateEmailConfirm, validatePasswordConfirm } from '../../utils/validators';
import { courses, departments } from '../../helpers';
import { createPerson } from '../../services/person';

const { Title } = Typography;

export const Register = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);

        const payload = {
            personalId: values.personalId,
            name: values.name,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email,
            username: values.username,
            password: values.password,
            userType: userType,
            eligibleEmail: true,
            eligiblePush: false
        }
        if(userType === 1) {
            payload['department'] = values.department;
        } else if (userType === 2) {
            payload['course'] = values.course;
            payload['isEligible'] = true;
        }

        const json = await createPerson(payload);

        if (json.Status) {
            notification.success({ message: 'Cadastro realizado!', description: 'Assim que o Administrador aprovar sua solicitação você poderá fazer login na plataforma.', duration: null });
            props.history.push('/login');
        } else {
            notification.error({ message: 'Erro', description: 'Não foi possível realizar esta operação, tente novamente mais tarde.' });
        }

        setLoading(false);
    };

    const onUserTypeChange = e => {
        setUserType(e.target.value);
    }

    return (
        <div className="login-wrapper">
            <a href="https://github.com/Formei-e-agora">
                <Title level={2} className="login-title"><Space><GithubOutlined />Formei, e agora?</Space></Title>
            </a>
            <Title level={4} className="login-subtitle">Registrar</Title>

            <Form
                form={form}
                layout="vertical"
                name="register-form"
                onFinish={onFinish}
                hideRequiredMark
            >

                <Row justify="center" align="middle">
                    <Col>
                        <Form.Item name="userType" rules={[{ required: true, message: 'Selecione um tipo' }]}>
                            <Radio.Group onChange={onUserTypeChange} size="large" buttonStyle="solid">
                                <Radio.Button value={1}>Professor</Radio.Button>
                                <Radio.Button value={2}>Aluno</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                {(userType === 1) &&
                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item name="department" rules={[{ required: true, message: 'Selecione um instituto' }]}>
                                <Select placeholder="Instituto" size="large">
                                    {
                                        departments.map((dpt) => <Select.Option value={(departments.indexOf(dpt)).toString()}>{dpt}</Select.Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                }

                {(userType === 2) &&
                    <Row justify="center" align="middle">
                        <Col span={20}>
                            <Form.Item name="course" rules={[{ required: true, message: 'Selecione um curso' }]}>
                                <Select placeholder="Curso" size="large">
                                    {
                                        courses.map((course) => <Select.Option value={(courses.indexOf(course)).toString()}>{course}</Select.Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                }

                <Row justify="center" align="middle">
                    <Col span={20}>
                        <Form.Item
                            name="personalId"
                            rules={[{ required: true, message: 'Digite um CPF válido' }, validateCpf]}
                        >
                            <Input
                                size="large"
                                placeholder="CPF"
                                maxLength={14}
                                onChange={(e) => form.setFieldsValue({ personalId: cpfMask(e.target.value) })}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" align="middle" gutter={16}>
                    <Col span={10}>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Digite seu nome' }]}
                        >
                            <Input size="large" placeholder="Nome" />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="lastName"
                            rules={[{ required: true, message: 'Digite seu sobrenome' }]}
                        >
                            <Input size="large" placeholder="Sobrenome" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" align="middle">
                    <Col span={20}>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Digite um e-mail válido' }]}
                        >
                            <Input type="email" size="large" placeholder="E-mail" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" align="middle">
                    <Col span={20}>
                        <Form.Item
                            name="confirmEmail"
                            rules={[{ required: true, message: ' ' }, validateEmailConfirm]}
                        >
                            <Input type="email" size="large" placeholder="Confirmar E-mail" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" align="middle" gutter={16}>
                    <Col span={10}>
                        <Form.Item
                            name="phone"
                            rules={[{ required: true, message: 'Digite o telefone' }]}
                        >
                            <Input
                                size="large"
                                placeholder="Telefone"
                                maxLength={15}
                                onChange={(e) => form.setFieldsValue({ phone: phoneMask(e.target.value) })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Digite o nome de usuário' }]}
                        >
                            <Input size="large" placeholder="Usuário" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="center" align="middle" gutter={8}>
                    <Col span={10}>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Digite a senha' }, validatePassword]}
                        >
                            <Input.Password size="large" placeholder="Senha" />
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
                            <Button type="primary" htmlType="submit" className="login-submit-btn" loading={loading} size="large">
                                Enviar
                                </Button>
                        </Form.Item>
                    </Col>
                    <Link to='/login'><span style={{ float: 'right', fontSize: 16 }}>Já possui uma conta?</span></Link>
                </Row>
            </Form>
        </div >
    );
}

export default Register;