import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Result, Select, Divider, Input, Tag, Switch, Spin, Modal, message } from 'antd';
import { Layout, RandomAvatar, JobDetails, CourseRequirementsForm, JobForm } from '../../components/index';
import { SearchOutlined } from '@ant-design/icons';
import { selectJobClear, getJobFeedData } from '../../actions';
import { updateJob } from '../../services/job';
import moment from 'moment';

const activeStyle = {
    padding: '16px',
    cursor: 'pointer',
    backgroundColor: '#f7f7f7',
    boxShadow: '0 1px 2px rgba(0,0,0,.1)',
    border: '1px solid #f0f0f0'
}

const normalStyle = {
    padding: '16px',
    cursor: 'pointer'
}

const textOverflowStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '15em'
}

const getTimeDifference = (date) => {
    const now = moment();
    const differenceInMilliseconds = now.diff(moment(date));
    if (differenceInMilliseconds < 3600000)
        return `há ${moment.duration(differenceInMilliseconds).minutes()} m`
    else if (differenceInMilliseconds < 86400000)
        return `há ${moment.duration(differenceInMilliseconds).hours()} h`
    else
        return `há ${moment.duration(differenceInMilliseconds).days()} d`
}

const Jobs = (props) => {

    const selectJob = (job) => {
        setJob(job);
        props.selectJobClear();
    }

    const [data, setData] = useState(props.jobs);
    const [job, setJob] = useState(data ? data[0] : null);
    const [filter, setFilter] = useState({
        date: null,
        experience: [],
        isRemote: false,
        search: ""
    });

    const [modal, setModal] = useState({
        visibleCourse: false,
        visibleJob: false
    })

    const deactivateJob = async (item) => {
        const payload = { ...item, isActive: false };
        const json = await updateJob(item.jobId, payload);
        if (json.Status) {
            message.success("Vaga desativada com sucesso.");
            getJobFeed();
        } else {
            message.error("Erro ao desativar vaga.");
        }
    }

    const activateJob = async (item) => {
        const payload = { ...item, isActive: true };
        const json = await updateJob(item.jobId, payload);
        if (json.Status) {
            message.success("Vaga ativada com sucesso.");
            getJobFeed();
        } else {
            message.error("Erro ao ativar vaga.");
        }
    }

    const showCourseModal = () => {
        setModal({ ...modal, visibleCourse: true });
    }

    const showJobModal = () => {
        setModal({ ...modal, visibleJob: true });
    }

    const getJobFeed = async () => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        (userData.userType === 1)
            ? props.getJobFeedData({ professorId: userData.userId })
            : props.getJobFeedData({ course: userData.course })
    }

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(async () => {
        if (props.selectedJob && props.jobs) {
            let selectedJobData = props.jobs.find(j => j.jobId === props.selectedJob);
            setJob(selectedJobData);
            let newData = props.jobs.filter(j => j.jobId !== selectedJobData.jobId);
            newData.unshift(selectedJobData);
            setData(newData);
        } else {
            setData(props.jobs);
            setJob(props.jobs.find(j => j.jobId === job.jobId));
        }
    }, [props.jobs]);

    useEffect(async () => {
        if (props.selectedJob) {
            let selectedJobData = data.find(j => j.jobId === props.selectedJob);
            setJob(selectedJobData);
            let newData = data.filter(j => j.jobId !== selectedJobData.jobId);
            newData.unshift(selectedJobData);
            setData(newData);
        }
    }, [props.selectedJob]);

    var filteredData = data;

    if (filter.date === "day")
        filteredData = filteredData.filter(item => moment().diff(moment(moment(item.createdAt))) < 86400000);
    else if (filter.date === "week")
        filteredData = filteredData.filter(item => moment().diff(moment(moment(item.createdAt))) < 604800000);
    else if (filter.date === "month")
        filteredData = filteredData.filter(item => moment().diff(moment(moment(item.createdAt))) < 2629800000);

    if (filter.experience && filter.experience.length > 0)
        filteredData = filteredData.filter(item => filter.experience.includes(item.experience));

    if (filter.isRemote)
        filteredData = filteredData.filter(item => item.isRemote);

    if (filter.search !== "")
        filteredData = filteredData.filter(item => item.title.toString().toLowerCase().includes(filter.search.toLowerCase())
            || item.company.toString().toLowerCase().includes(filter.search.toLowerCase())
            || item.workplace.toString().toLowerCase().includes(filter.search.toLowerCase())
        );

    return (
        <>
            <Layout currentLocation={props.history.location.pathname}>
                <Row justify="center" gutter={16}>
                    <Col xxl={16} xl={18}>
                        <Spin size="large" spinning={props.loading}>
                            <Card>
                                <Row justify="center" style={{ marginBottom: '2em' }}>
                                    <Col span={24}>
                                        <h3 style={{ display: 'inline', marginRight: 8 }}>Filtrar por:</h3>
                                        <Select style={{ width: '200px' }} placeholder="Data" onSelect={(item) => setFilter({ ...filter, date: item })}>
                                            <Select.Option value="day">Últimas 24 horas</Select.Option>
                                            <Select.Option value="week">Última semana</Select.Option>
                                            <Select.Option value="month">Último mês</Select.Option>
                                            <Select.Option value="all">Todas</Select.Option>
                                        </Select>
                                        <Divider type="vertical" />
                                        <Select style={{ width: '200px' }} placeholder="Experiência" mode="multiple" maxTagCount={1} allowClear onChange={(item) => setFilter({ ...filter, experience: item })}>
                                            <Select.Option value="Estágio">Estágio</Select.Option>
                                            <Select.Option value="Assistente">Assistente</Select.Option>
                                            <Select.Option value="Júnior">Júnior</Select.Option>
                                            <Select.Option value="Pleno-sênior">Pleno-sênior</Select.Option>
                                            <Select.Option value="Diretor">Diretor</Select.Option>
                                            <Select.Option value="Executivo">Executivo</Select.Option>
                                        </Select>
                                        <Divider type="vertical" />
                            Remoto: <Switch onChange={(checked) => setFilter({ ...filter, isRemote: checked })} />
                                        <Divider type="vertical" />
                                        <Input
                                            style={{ width: '400px', float: 'right' }}
                                            placeholder="Pesquisar por título, empresa ou local..."
                                            prefix={<SearchOutlined />}
                                            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                                        />
                                    </Col>
                                </Row>

                                <Row justify="space-between">
                                    <Col span={8}>
                                        <List
                                            itemLayout="vertical"
                                            dataSource={filteredData}
                                            pagination={{ pageSize: 6 }}
                                            renderItem={item => (
                                                <List.Item
                                                    onClick={() => selectJob(item)}
                                                    actions={[
                                                        <span style={{ marginLeft: '4em' }}>{getTimeDifference(item.createdAt)}</span>,
                                                        <span>{item.subscription.length} interessados</span>,
                                                        <Tag color={(item.isActive ? "red" : "geekblue")}>{(item.isActive ? "Oferta Ativa" : "Inativo")}</Tag>
                                                    ]}
                                                    style={item.jobId === job.jobId ? activeStyle : normalStyle}
                                                >
                                                    <List.Item.Meta
                                                        avatar={<RandomAvatar id={item.jobId} />}
                                                        title={<h3 style={textOverflowStyle}>{item.title}</h3>}
                                                        description={
                                                            <>
                                                                <h4>{item.company}</h4>
                                                                <h4>{item.workplace}</h4>
                                                            </>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Col>
                                    <Col span={16}>
                                        {job ?
                                            <JobDetails
                                                data={job}
                                                showCourseModal={showCourseModal}
                                                showJobModal={showJobModal}
                                                activateJob={activateJob}
                                                deactivateJob={deactivateJob}
                                            />
                                            :
                                            <Result
                                                title="Selecione uma vaga ao lado"
                                                subTitle="Para mostrar seus detalhes"
                                            />}
                                    </Col>
                                </Row>
                            </Card>
                        </Spin>
                    </Col>
                </Row>
            </Layout >
            { modal.visibleJob &&
                <Modal
                    title="Editar vaga"
                    width={window.innerWidth >= 1600 ? "65%" : "75%"}
                    visible={modal.visibleJob}
                    onCancel={() => setModal({ ...modal, visibleJob: false })}
                >
                    <JobForm next={getJobFeed} />
                </Modal>

            }

            { modal.visibleCourse &&
                < Modal
                    title="Editar cursos"
                    width={window.innerWidth >= 1600 ? "65%" : "75%"}
                    visible={modal.visibleCourse}
                    onCancel={() => { setModal({ ...modal, visibleCourse: false }); getJobFeed(); }}
                    footer={null}
                >
                    <CourseRequirementsForm jobId={job.jobId} />
                </Modal>
            }
        </>
    );
}

const mapStateToProps = state => ({
    jobs: state.job.feed,
    loading: state.job.loading.feed,
    selectedJob: state.job.selectedJob
});

export default connect(mapStateToProps, { selectJobClear, getJobFeedData })(Jobs);