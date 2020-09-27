import React from 'react';
import { Layout } from '../../components/index';

const Feed = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <p>Feed</p>
        </Layout>
    );
}

export default Feed;