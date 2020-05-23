import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/database';
import Post from '../components/post/post';
import Spinner from '../components/UI/Spinner/Spinner'
import Layout from '../components/layout/layout'
export default class CatPost extends Component {
    static async getInitialProps({ query }) {

        return { query }
    }
    state = {
        posts: [],
        cat: ''
    }
    componentDidMount() {
        this.getPost(this.props.query.cat)
    }
    componentDidUpdate() {
        if (this.props.query.cat !== this.state.cat) {
            this.setState({ cat: this.props.query.cat })
            this.getPost(this.props.query.cat)
        }
    }
    getPost = (pid) => {
        firebase.database().ref('posts/' + pid).on('value', s => {
            let posts = []
            for (let key in s.val()) {
                posts.push({
                    ...s.val()[key],
                    category: pid,
                    href: `/[cat]/[pid]?pid=${key}&cat=${pid}`,
                    as: `${pid}/${key}`
                })
            }

            this.setState({ posts: posts.reverse() })
        })
    }
    render() {
        return <Layout title={this.props.query.cat + ' news | pointofviewafrica POVA'
        } >
            <div className="p-2"><h4 className="text-uppercase text-info px-2 px-md-0"> {this.state.cat}</h4> </div>
            {this.state.loading ? <div style={{ height: "50vh" }}>< Spinner /></div> : null}
            < div className="container-fluid" >
                <div className="row">
                    {this.state.posts.map(cur => (
                        <div className="col-md-6 ">
                            <Post {...cur} />
                        </div>
                    ))}
                </div>
            </div >
        </Layout >
    }
}