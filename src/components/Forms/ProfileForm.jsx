import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, notification, Button, Select } from 'antd';
import { validatePassword, validatePasswordConfirm, validateCpf, validateEmailConfirm } from '../../utils/validators';
import { updatePerson, findPerson } from '../../services/person';
import { courses, departments } from '../../helpers';
import { cpfMask, phoneMask } from '../../utils/masks';

const ProfileForm = () => {

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

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            try {
                if (!didCancel) {
                    const json = await findPerson(userData.userId);
                    if (json.Status)
                        form.setFieldsValue({ ...json.personData })
                }
            } catch (e) {
                notification.error({
                    message: 'Erro',
                    description: 'Falha em baixar os dados de Perfil.'
                });
            }
        }
        fetchData();
        return () => {
            didCancel = true;
        }
    }, []);

    return (
        <Form
            form={form}
            layout="vertical"
            name="register-form"
            onFinish={onFinish}
            hideRequiredMark
        >
            {(userData.userType === 2) &&
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

            {(userData.userType === 1) &&
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

            <Row justify="start" align="middle" gutter={16}>
                <Col span={10} offset={2}>
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
                        <Button type="primary" htmlType="submit" loading={loading} size="large">
                            Atualizar Dados
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default ProfileForm;