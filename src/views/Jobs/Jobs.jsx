import React from 'react';
import { Layout } from '../../components/index';

const Jobs = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <p>Jobs</p>
        </Layout>
    );
}

export default Jobs;