import React from 'react';
import { Card, Typography, Modal, Button, Row, Col, Space } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { JobForm } from '../index';
import Confirmation from '../../images/confirmation.svg';
import JobHunt from '../../images/job_hunt.svg';
import './PublishBox.css';

class PublishBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            current: 3
        }
    }

    handleOk = () => {
        this.setState({ visible: false });
    };

    handleCancel = () => {
        this.setState({ visible: false, current: 0 });
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    next = () => {
        if (this.state.current === 3) {
            this.setState({ current: 0, visible: false });
        } else {
            this.setState({ current: this.state.current + 1 });
        }
    };

    getCurrentModalView = (current) => {
        switch (current) {
            case 0:
                return (
                    <Row justify="space-between">
                        <Col span={16}>
                            <p>Textinho blabla cadastrar nova vaga</p>
                        </Col>
                        <Col span={8}>
                            <img src={JobHunt} alt="" style={{ width: '50%', textAlign: 'center' }} />
                        </Col>
                    </Row>
                );
            case 1:
                return (
                    <JobForm />
                );
            case 2:
                return (
                    <p>Cadastro dos courseRequirements</p>
                );
            case 3:
                // faz um result aqui
                return (
                    <Row justify="center">
                        <Col style={{ textAlign: 'center' }}>
                            <img src={Confirmation} alt="" style={{ width: '50%' }} />
                        </Col>
                    </Row>
                );
            default:
                return;
        }
    };

    getCurrentModalFooter = (current) => {
        switch (current) {
            case 0:
                return (
                    <Space>
                        <Button onClick={this.handleCancel}>Cancelar</Button>
                        <Button type="primary" onClick={this.next}>Próximo</Button>
                    </Space>
                );
            case 1:
                return (
                    <Space>
                        <Button onClick={this.handleCancel}>Cancelar</Button>
                        <Button type="primary" onClick={this.next}>Próximo</Button>
                    </Space>
                );
            case 2:
                return (
                    <Space>
                        <Button onClick={this.handleCancel}>Cancelar</Button>
                        <Button type="primary" onClick={this.next}>Próximo</Button>
                    </Space>
                );
            case 3:
                return (
                    <Space>
                        <Button onClick={this.handleCancel}>Cancelar</Button>
                        <Button type="primary" onClick={this.next}>Próximo</Button>
                    </Space>
                );
            default:
                return;
        }
    }

    render() {
        return (
            <>
                <Card style={this.props.style}>
                    <Card.Meta
                        title={
                            <Typography.Title level={5} className="publish-box-btn" onClick={this.showModal}>
                                <FormOutlined style={{ marginRight: 8 }} />
                                Começar uma publicação
                            </Typography.Title>
                        }
                    />
                </Card>
                <Modal
                    title="Cadastrar nova vaga"
                    width={window.innerWidth >= 1600 ? "65%" : "75%"}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={this.getCurrentModalFooter(this.state.current)}
                >
                    {this.getCurrentModalView(this.state.current)}
                </Modal>
            </>
        );
    }
}

export default PublishBox;