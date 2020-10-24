import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, List, Divider, Badge, BackTop } from 'antd';
import { Layout, UserCard, FeedContent, PublishBox } from '../../components/index';
import { getUserData, getPersonData, getAddressData, getJobFeedData, selectJob } from '../../actions';
import { findMostPopularJobs } from '../../services/job';
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
        this.getJobFeed();
        this.getMostPopularData();
    }

    getJobFeed = async () => {
        (this.state.userData.userType === 1)
        ? this.props.getJobFeedData({ professorId: this.state.userData.userId })
        : this.props.getJobFeedData({ course: this.state.userData.course })
    }

    getMostPopularData = async () => {
        const json = await findMostPopularJobs();

        if (json.Status) {
            this.setState({ popularData: json.jobs });
        } else {
            console.log(json);
        }
    }

    getTimeDifference = (date) => {
        const now = moment();
        const differenceInMilliseconds = now.diff(moment(date));
        if (differenceInMilliseconds < 3600000)
            return `há ${moment.duration(differenceInMilliseconds).minutes()} min`
        else if(differenceInMilliseconds < 86400000)
            return `há ${moment.duration(differenceInMilliseconds).hours()} h`
        else
            return `há ${moment.duration(differenceInMilliseconds).days()} d`
    }

    render() {
        return (
            <Layout currentLocation={this.props.history.location.pathname}>
                <BackTop />
                <Row justify="center" gutter={16}>
                    <Col xxl={4} xl={6}>
                        <UserCard />
                    </Col>
                    <Col xxl={8} xl={10}>
                        {this.state.userData.userType === 1 && <PublishBox style={{ marginBottom: '1em' }} />}
                        <FeedContent data={this.props.feed} loading={this.props.loadingFeed} refresh={this.getJobFeed} selectJob={this.props.selectJob} history={this.props.history} />
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
                                                description={<div>{this.getTimeDifference(item.createdAt)} <Divider type="vertical" />{item.company} {/*`${item.subscription.length} interessado${item.subscription.length > 1 ? 's' : ''}`*/}</div>}
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

export default connect(mapStateToProps, { getUserData, getPersonData, getAddressData, getJobFeedData, selectJob })(Feed);