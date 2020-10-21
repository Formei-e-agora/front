import React from 'react';
import { connect } from 'react-redux';
import { Card, Typography, Modal, Button, Row, Col, Space, Result } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { JobForm, CourseRequirementsForm } from '../index';
import { getJobFeedData } from '../../actions';
import Confirmation from '../../images/confirmation.svg';
import JobHunt from '../../images/job_hunt.svg';
import './PublishBox.css';

const { Title, Paragraph } = Typography;

class PublishBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: JSON.parse(sessionStorage.getItem("userData")),
            visible: false,
            loading: false,
            current: 0,
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
        (this.state.userData.userType === 1)
            ? this.props.getJobFeedData({ professorId: this.state.userData.userId })
            : this.props.getJobFeedData({ course: this.state.userData.course })
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
                                <Title level={5}>
                                    Deseja publicar uma nova vaga que pode ser visualizada a todos os alunos cadastrados no sistema?
                                </Title>
                                <Paragraph>
                                    Tenha em mãos os dados da vaga e siga os passos até o final para garantir que a vaga de emprego esteja disponível a todos os estudantes interessados!
                                </Paragraph>
                                <Paragraph>
                                    Nosso sistema contempla as seguintes funcionalidades:
                                </Paragraph>
                                <Paragraph>
                                    <b>Promoção de vagas segmentadas:</b> a vaga fica disponível apenas aos alunos dos cursos selecionados.
                                </Paragraph>
                                <Paragraph>
                                    <b>Resultados recomendados:</b> Como professor você pode recomendar qualquer aluno que demonstrou interesse na vaga!
                                </Paragraph>
                            </Typography>
                        </Col>
                        <Col span={8}>
                            <img src={JobHunt} alt="" style={{ width: '50%', display: 'block', margin: '0 auto' }} />
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
                        <Button type="primary" onClick={this.next}>Finalizar</Button>
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

export default connect(null, { getJobFeedData })(PublishBox);