import React, { Component } from 'react';
import FullPost from '../../components/post/fullPost'
import Layout from '../../components/layout/layout'
import firebase from '../../firebase';
import 'firebase/database';
class Post extends Component {
    static async getInitialProps({ query }) {
        const Post = await firebase.database().ref(`posts/news/${query.newscat}/${query.pid}`).once('value')
        return { Post, query }
    }
    state = {
        post: {}
    }
    componentDidMount() {
        console.log(this.props.Post);
        if (this.props.Post.title) {

            this.setState({ post: this.props.Post, pid: this.props.query.pid })
        } else {
            console.log('hello');

            this.getPost()
        }

    }
    componentDidUpdate() {
        if (this.props.query.pid !== this.state.pid) {
            this.setState({ pid: this.props.query.pid })
            this.getPost()
        }
    }
    getPost = () => {
        firebase.database().ref(`posts/news/${this.props.query.newscat}/${this.props.query.pid}`).once('value', s => {
            this.setState({ post: s.val() })
        })
    }
    render() {
        return <Layout  {...this.state.post} >
            <FullPost post={this.state.post} {...this.props.query} />
        </Layout>
    }
}

export default Post


