import React, { Component } from 'react';
import Layout from '../../components/layout/layout';
import firebase from '../../firebase';
import 'firebase/database'
import Spinner from '../../components/UI/Spinner/Spinner';
import VidList from '../../components/vidList'
export default class Video extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        this.getPosts()
    }
    getPosts = () => {
        this.setState({ loading: true })
        const ref = firebase.database().ref('posts/videos')
        ref.on('value', s => {
            const posts = []
            console.log(s.val());

            for (let keys in s.val()) {
                posts.push({
                    ...s.val()[keys],
                    id: keys
                })
            }
            this.setState({ loading: false, posts: posts })
        })
    }
    render() {
        return <Layout title="Videos | pointofviewafrica tv POVA-tv">
            <div className="container py-3">
                {this.state.loading ? <div style={{ height: '100vh' }}><Spinner /> </div> : null}
                {this.state.posts.map(cur => (
                    <VidList {...cur} />
                ))}
            </div>

        </Layout>
    }
}