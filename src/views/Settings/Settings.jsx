import React from 'react';
import { Layout } from '../../components/index';

const Settings = (props) => {
    return (
        <Layout currentLocation={props.history.location.pathname}>
            <p>Settings</p>
        </Layout>
    );
}

export default Settings;