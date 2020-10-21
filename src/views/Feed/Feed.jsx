import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Divider, Badge } from 'antd';
import { Layout, UserCard, JobFeed, PublishBox } from '../../components/index';
import { getUserData, getPersonData, getAddressData, getJobFeedData } from '../../actions';
import { findJobByProfessorId, findMostPopularJobs } from '../../services/job';
import moment from 'moment';

class Feed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: JSON.parse(sessionStorage.getItem("userData")),
            loading: false,
            popularData: null
        }
    }

    componentDidMount() {
        const id = this.state.userData.userId;
        this.props.getUserData(id);
        this.props.getPersonData(id);
        this.props.getAddressData(id);

        (this.state.userData.userType === 1)
            ?   this.props.getJobFeedData({ professorId: this.state.userData.userId })
            :   this.props.getJobFeedData({ course: this.state.userData.course })

        this.getMostPopularData();
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
                        <JobFeed data={this.props.feed} loading={this.props.loadingFeed} />
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

const mapStateToProps = state => ({
    feed: state.job.feed,
    loadingFeed: state.job.loading.feed
});

export default connect(mapStateToProps, { getUserData, getPersonData, getAddressData, getJobFeedData })(Feed);