import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, notification, Button } from 'antd';
import { createAddress, updateAddress, findAddressByPersonId } from '../../services/address';

const AddressForm = (props) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [addressId, setAddressId] = useState(null);

    const userData = JSON.parse(sessionStorage.getItem("userData"));

    const onFinish = async (values) => {
        setLoading(true);

            const json = (!addressId)
            ? await createAddress({ ...values, personId: userData.userId })
            : await updateAddress(addressId, { ...values, personId: userData.userId })

        if (json.Status) {
            notification.success({
                message: 'Dados atualizados!',
                description: 'Suas informações foram atualizadas com sucesso!'
            });
            props.refresh(userData.userId);
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
                    const json = await findAddressByPersonId(userData.userId);
                    if (json.Status) {
                        form.setFieldsValue({ ...json.addressData });
                        setAddressId(json.addressData.addressId);
                    }
                        
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
            <Row justify="center" align="middle">
                <Col span={20}>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Digite a rua' }]}
                    >
                        <Input
                            size="large"
                            placeholder="Rua"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle">
                <Col span={20}>
                    <Form.Item
                        name="complementaryAddress"
                        rules={[{ required: false, message: 'Digite o complemento' }]}
                    >
                        <Input
                            size="large"
                            placeholder="Complemento"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="number"
                        rules={[{ required: true, message: 'Digite o número' }]}
                    >
                        <Input size="large" placeholder="Número" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="district"
                        rules={[{ required: true, message: 'Digite o bairro' }]}
                    >
                        <Input size="large" placeholder="Bairro" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="postalCode"
                        rules={[{ required: true, message: 'Digite o CEP' }]}
                    >
                        <Input size="large" placeholder="CEP" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="city"
                        rules={[{ required: true, message: 'Digite a cidade' }]}
                    >
                        <Input size="large" placeholder="Cidade" />
                    </Form.Item>
                </Col>
            </Row>

            <Row justify="center" align="middle" gutter={16}>
                <Col span={10}>
                    <Form.Item
                        name="state"
                        rules={[{ required: true, message: 'Digite o estado' }]}
                    >
                        <Input size="large" placeholder="Estado" />
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name="country"
                        rules={[{ required: true, message: 'Digite o país' }]}
                    >
                        <Input size="large" placeholder="País" />
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

export default AddressForm;