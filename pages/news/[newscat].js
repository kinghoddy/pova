import React, { Component } from "react";
import Post from "../../components/post/post";
import firebase from '../../firebase';
import 'firebase/database';
import Spinner from '../../components/UI/Spinner/Spinner';
import Layout from '../../components/layout/layout'
class News extends Component {
    static async getInitialProps({ query }) {
        return { query }
    }
    state = {
        category: "",
        post: []
    };
    getPosts = (category) => {
        document.documentElement.scrollTop = 0
        this.setState({ loading: true })
        const ref = firebase.database().ref('posts/')
        // load news

        ref.child('news/' + category.toLowerCase()).on('value', snap => {

            const post = []
            for (let key in snap.val()) {
                let Post = snap.val()[key]
                Post.href = '/news/[newscat]/[pid]?newscat=' + category + '&pid=' + key
                Post.as = '/news/' + category + '/' + key

                Post.category = category
                // let id = this.props.location.pathname.split('/')[3]

                // if (key !== id)
                post.push(Post)
            }

            this.setState({ post: post.reverse(), loading: false })
        })
    }
    componentDidMount() {
        let category = this.props.query.newscat;
        console.log(category);

        if (category !== this.state.category) {
            this.setState({ category: category });
            this.getPosts(category)
        }
    }
    componentDidUpdate() {
        let category = this.props.query.newscat;
        if (category !== this.state.category) {
            this.setState({ category: category });
            this.getPosts(category)
        }
    }
    render() {
        return (
            <Layout title={this.props.query.newscat + ' News POVA point of view africa'} body={this.props.query.newscat}>

                <span style={{
                    background: "#f3f3f3", color: '#aaa'
                }} className="font-weight-light py-1 mt-4 text-capitalize rounded-pill d-inline-block px-3 mx-3 mb-4"> news / {this.state.category.split('-').join(' ')}</span>


                {this.state.loading ? <div style={{ height: "50vh" }}>< Spinner /></div> : null}
                <div className="container-fluid">

                    <div className="row">

                        {this.state.post.map(cur => (
                            <div className="col-md-6 ">

                                <Post {...cur} />
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }
}
export default News
