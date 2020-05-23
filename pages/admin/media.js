import React from 'react';
import Layout from '../../components/backend/backend';
import Storage from '../../components/storage'

export default class Media extends React.Component {

    render() {
        return (
            <Layout Route="Media Storage">
                <div className="mx-auto my-3" style={{ maxWidth: '45rem' }}>
                    <Storage />
                </div>



            </Layout>
        )
    }
}