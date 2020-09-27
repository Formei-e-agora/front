import React from 'react';
import { Layout } from '../../components/index';

const Notifications = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <p>Notifications</p>
        </Layout>
    );
}

export default Notifications;