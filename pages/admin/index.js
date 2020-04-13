import React, { Component } from 'react'
import classes from './admin.module.css'
import firebase from '../../firebase';
import Layout from '../../components/backend/backend'
import Link from 'next/link'
import 'firebase/auth'
import Spinner from '../../components/UI/Spinner/Spinner'

export default class Admin extends Component {

    state = {
        users: [],
        news: [],
    }
    componentDidMount() {
        this.getUsers()
        this.getNews()
    }
    getUsers = () => {
        this.setState({ loadUsers: true })
        firebase.database().ref('users/').on('value', snap => {
            const users = []
            for (let key in snap.val()) {
                let user = { ...snap.val()[key] }
                users.push(user)
            }

            this.setState({ users: users, loadUsers: false })
        })
    }
    getNews = () => {
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
                    cur.link = '/news/' + cur.category + '/' + cur.id
                    newsPosts.push(cur)
                })
            }
            console.log(newsPosts);
            this.setState({ news: newsPosts })
        })
    }
    render() {
        var Dashboard = (<div className="row p-4 no-gutters">
            <div className="col-md-4 px-2 mb-lg-0 mb-4">
                <Link href="/admin/posts?category=news" as="/admin/posts">
                    <a className={classes.card + " bg-success"} >
                        <div>
                            <h4>News ({this.state.news.length})</h4>
                            {this.state.loadUsers ? <Spinner fontSize="5px" style={{ background: "var(--success)" }} /> : null}
                            <i className="material-icons">message</i>
                        </div>
                        <p> view details <span>></span></p>
                    </a>
                </Link>
            </div>
            <div className="col-md-4 px-2 mb-lg-0 mb-4">
                <Link href="/admin/posts?category=videos" as="admin/posts">
                    <a className={classes.card + " bg-danger"}>
                        <div>
                            <h4>Videos</h4>
                            {this.state.loadUsers ? <Spinner fontSize="5px" style={{ background: "var(--warning)" }} /> : null}
                            <i className="material-icons">videocam</i>
                        </div>
                        <p> view details <span>></span></p>
                    </a>
                </Link>
            </div>

            <div className="col-md-4 px-2 mb-lg-0 mb-4">
                <Link href="/admin/users">
                    <a className={classes.card + " bg-warning"}>
                        <div>
                            <h4>Users ({this.state.users.length})</h4>
                            {this.state.loadUsers ? <Spinner fontSize="5px" style={{ background: "var(--warning)" }} /> : null}
                            <i className="material-icons">people</i>
                        </div>
                        <p> view details <span>></span></p>
                    </a>
                </Link>
            </div>
        </div >)

        return (
            <Layout route="Dashboard">
                {Dashboard}
            </Layout>
        )
    }
}