import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Divider, Badge } from 'antd';
import { Layout, UserCard, JobFeed, PublishBox } from '../../components/index';
import { getUserData, getPersonData, getAddressData } from '../../actions/apiActions';
import { findJobByProfessorId, findMostPopularJobs } from '../../services/job';
import moment from 'moment';

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: JSON.parse(sessionStorage.getItem("userData")),
            loading: false,
            jobData: null,
            popularData: null
        }
    }

    componentDidMount() {
        const id = this.state.userData.userId;
        this.props.getUserData(id);
        this.props.getPersonData(id);
        this.props.getAddressData(id);
        this.getJobData();
        this.getMostPopularData();
    }

    getJobData = async () => {
        this.setState({ loading: true });

        const json = (this.state.userData.userType === 1)
            ? await findJobByProfessorId(this.state.userData.userId)
            : { Status: false };

        if (json.Status) {
            this.setState({ jobData: json.jobs });
        } else {
            console.log(json);
        }
        this.setState({ loading: false });
    }

    getMostPopularData = async () => {
        const json = await findMostPopularJobs();

        if (json.Status) {
            this.setState({ popularData: json.jobs });
        } else {
            console.log(json);
        }
    }

    render() {
        return (
            <Layout currentLocation={this.props.history.location.pathname}>
                <Row justify="center" gutter={16}>
                    <Col xxl={4} xl={6}>
                        <UserCard />
                    </Col>
                    <Col xxl={8} xl={10}>
                        {this.state.userData.userType === 1 && <PublishBox style={{ marginBottom: '1em' }} />}
                        <JobFeed data={this.state.jobData} loading={this.state.loading} />
                    </Col>
                    <Col xxl={4} xl={6}>
                        <Card title={<h4 style={{ margin: 0 }}>Ofertas mais visualizadas</h4>} headStyle={{ border: 0 }} bodyStyle={{ padding: '0px 24px' }}>
                            {(this.state.popularData) &&
                                <List
                                    itemLayout="horizontal"
                                    split={false}
                                    dataSource={this.state.popularData.slice(0, 5)}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={<div><Badge status="processing" />{item.title}</div>}
                                                description={<div>{moment(item.creationDate).format('DD/MM')} <Divider type="vertical" /> {item.subscription.length} interessados</div>}
                                            />
                                        </List.Item>
                                    )}
                                />
                            }
                        </Card>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default connect(null, { getUserData, getPersonData, getAddressData })(Feed);