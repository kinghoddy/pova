import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import firebase from '../firebase';
import 'firebase/database';
import Spinner from '../components/UI/Spinner/Spinner'
import Post from '../components/post/post'
import VidList from '../components/vidList'
class indexPage extends Component {
    state = {
        category: "",
        posts: []
    };
    componentDidMount() {
        this.getPosts()
    }
    getPosts = () => {
        document.documentElement.scrollTop = 0
        this.setState({ loading: true })
        const ref = firebase.database().ref('posts/')
        // load news
        ref.child('news').on('value', snap => {
            const posts = {}
            for (let newsCat in snap.val()) {
                let newscat = snap.val()[newsCat]
                posts[newsCat] = []
                for (let key in newscat) {
                    newscat[key].id = key
                    posts[newsCat].push(newscat[key])
                }
                posts[newsCat] = posts[newsCat].reverse()
            }
            let newsPosts = []
            for (let cat in posts) {
                posts[cat].forEach(cur => {
                    cur.category = cat
                    cur.href = "/news/[newscat]/[pid]?newscat=" + cur.category + '&pid=' + cur.id
                    cur.as = '/news/' + cur.category + '/' + cur.id
                    newsPosts.push(cur)
                })
            }
            firebase.database().ref('posts/videos')
                .on('value', s => {
                    for (let keys in s.val()) {
                        newsPosts.push({
                            ...s.val()[keys],
                            category: 'videos',
                            link: keys,
                            type: 'video',
                            href: "/videos/[pid]?pid=" + keys,
                            as: '/videos/' + keys
                        })
                    }
                    this.setState({ posts: newsPosts })
                })
            this.setState({ loading: false })
        })
    }


    render() {

        return <Layout title="Home | point of view africa">


            {this.state.loading ? <div style={{ height: "80vh" }}>< Spinner /></div> : null}

            <div className="row no-gutters ">
                {this.state.posts.map((cur, i) => (
                    cur.type === 'video' ? <div className="col-12 px-lg-3" key={i}> <VidList {...cur} /> </div> :
                        <div className="col-lg-6 px-lg-3" key={i}>
                            <Post {...cur} />
                        </div>

                ))}
            </div>

        </Layout>
    }
}

export default indexPage