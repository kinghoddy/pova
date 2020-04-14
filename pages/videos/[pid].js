import React, { Component } from 'react';
import Layout from '../../components/layout/layout'
import firebase from '../../firebase';
import 'firebase/database'
export default class extends Component {

    static async getInitialProps({ query }) {
        const post = await firebase.database().ref('posts/videos/' + query.pid).once('value')
        console.log(post, 'props');
        return { query, post }
    }
    state = {
        post: {

        }
    }
    componentDidMount() {
        if (this.props.post.title) {
            this.setState({ post: this.props.post })
        }
    }
    render() {
        return <Layout {...this.state.post}>
            <video src={this.state.post.title}></video>
            <p>
                {this.state.post.body}
            </p>
            <h1>Hello </h1>
        </Layout>
    }
}