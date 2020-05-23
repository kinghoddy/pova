import React, { Component } from 'react'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import firebase from '../firebase';
import 'firebase/database';
import Spinner from '../components/UI/Spinner/Spinner'
import Post from '../components/post/post'
import VidList from '../components/vidList';
import Card from '../components/card/card'
class indexPage extends Component {
    state = {
        category: "",
        posts: [
        ]
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
                            id: keys,
                            type: 'video',
                            href: "/videos/[pid]?pid=" + keys,
                            as: '/videos/' + keys
                        })
                    }
                })
            ref.once('value').then((s) => {
                let refs = []
                for (let reff in s.val()) {
                    if (reff !== 'videos' && reff !== 'news') {
                        refs.push(reff)
                    }
                }
                refs.forEach(cur => {
                    ref.child(cur).on('value', snap => {
                        for (let keys in snap.val()) {
                            newsPosts.push({
                                ...snap.val()[keys],
                                category: cur,
                                id: keys,
                                href: "/[cat]/[pid]?pid=" + keys,
                                as: '/' + cur + '/' + keys
                            })
                        }
                        this.setState({ posts: newsPosts })
                    })
                })
            })


            this.setState({ loading: false })
        })

    }


    render() {
        let post = this.state.posts
        post.sort((a, b) => {
            return (
                a.date - b.date
            )
        })
        post = post.reverse()
        return <Layout title="Home | point of view africa" src="/logo.jpg">
            {this.state.loading ? <div style={{ height: "80vh" }}>< Spinner /></div> : null}
            <div className="row no-gutters px-1 pb-3 px-md-0">
                <div className="col-md-6 pb-2 pb-md-0 pl-lg-3 pr-md-1">
                    {post.length > 3 ? <Card style={{ height: '24.5rem' }} caption={post[0].title} {...post[0]} /> : null}
                </div>
                <div className="col-md-6 pr-lg-3 pl-md-1">
                    <div className="row pb-2 no-gutters ">
                        <div className="col">

                            {post.length > 3 ? <Card style={{ height: '12rem' }} caption={post[1].title} {...post[1]} /> : null}
                        </div>
                    </div>
                    <div className="row no-gutters">
                        <div className="col">

                            {post.length > 3 ? <Card style={{ height: '12rem' }} caption={post[2].title} {...post[2]} /> : null}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row no-gutters px-1 px-md-0">
                {post.map((cur, i) => (
                    i > 2 ?
                        cur.type === 'video' ? <div className="col-12 px-lg-3" key={i}> <VidList {...cur} /> </div> :
                            <div className="col-lg-6 px-lg-3" key={i}>
                                <Post {...cur} />
                            </div> : null

                ))}
            </div>

        </Layout>
    }
}

export default indexPage