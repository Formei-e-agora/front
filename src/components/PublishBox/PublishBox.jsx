import React from 'react';
import { Card, Typography, Modal, Button, Row, Col, Space, Result } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { JobForm, CourseRequirementsForm } from '../index';
import Confirmation from '../../images/confirmation.svg';
import JobHunt from '../../images/job_hunt.svg';
import './PublishBox.css';

const { Title, Paragraph } = Typography;

class PublishBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            loading: false,
            current: 2,
            jobId: null
        }
    }

    handleOk = () => {
        this.setState({ visible: false });
    };

    handleCancel = () => {
        this.setState({ visible: false, current: 0, jobId: null });
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

    goToCourseRequirements = (jobId) => {
        this.setState({ current: 2, jobId: jobId });
    }

    getCurrentModalView = (current) => {
        switch (current) {
            case 0:
                return (
                    <Row justify="space-between">
                        <Col span={16}>
                            <Typography>
                            <Paragraph>
                                    Este espaço é dedicado à publicacao de novas ofertas que podem ser visualizadas a todos os alunos cadastrados no sistema, tempo médio para publicar uma nova vaga: 15 minutos
                                </Paragraph>
                                <Paragraph>
                                    Tenha em mãos os dados da vaga e siga todos os passos até o final para garantir que a vaga de emprego esteja disponível a todos os estudantes!
                                </Paragraph>
                                <Paragraph>
                                    Funcionalidades:
                                    Promoção de vagas segmentadas: a vaga fica disponível apenas aos alunos dos cursos selecionados, com competencias certas etc.
                                    Resultados recomendados: Como professor você pode recomendar determinada vaga para o determinado alunos
                                </Paragraph>
                            </Typography>
                        </Col>
                        <Col span={8}>
                            <img src={JobHunt} alt="" style={{ width: '50%', textAlign: 'center' }} />
                        </Col>
                    </Row>
                );
            case 1:
                return (
                    <JobForm next={this.goToCourseRequirements} />
                );
            case 2:
                return (
                    <CourseRequirementsForm jobId={this.state.jobId} />
                );
            case 3:
                return (
                    <Result 
                        title="Sucesso!"
                        subTitle="Sua publicação já pode ser vista pelos alunos!"
                        icon={<img src={Confirmation} alt="" style={{ width: '50%' }} />}
                    />
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
                    </Space>
                );
            case 2:
                return (
                    <Space>
                        <Button onClick={this.handleCancel}>Cancelar</Button>
                    </Space>
                );
            case 3:
                return (
                    <Space>
                        <Button type="primary" onClick={this.handleCancel}>Sair</Button>
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
                                Anunciar vaga
                            </Typography.Title>
                        }
                    />
                </Card>
                <Modal
                    title="Anunciar vaga"
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