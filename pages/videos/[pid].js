import React, { Component } from 'react';
import Layout from '../../components/layout/layout'
import firebase from '../../firebase';
import 'firebase/database'
export default class extends Component {

    static async getInitialProps({ query }) {
        const post = await firebase.database().ref('posts/videos/' + query.pid).once('value')
        return { query, post }
    }
    state = {
        post: {

        }
    }
    componentDidMount() {
        if (this.props.post.title) {
            this.setState({ post: this.props.post })
        } else {
            this.getPost(this.props.query.pid)
        }
    }
    getPost = (pid) => {
        firebase.database().ref('posts/videos/' + pid).on('value', s => {
            this.setState({ post: s.val() })
        })
    }
    render() {
        return <Layout {...this.state.post} >
            <video controls autoplay src={this.state.post.src}></video>
            <div className="p-3">
                <h4>{this.state.post.title} </h4>

                <p>
                    {this.state.post.body}
                </p>
            </div>

            <style jsx>{`
            video {
                background : #000;
                width : 100%;
                max-height : 40vh;
                object-fit : contain
            }
            @media only screen and (min-width : 760px){
                video {
                max-height : 60vh;

                }
            }
            
            `}</style>
        </Layout>
    }
}