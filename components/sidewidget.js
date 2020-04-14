import React, { Component } from "react";
import Link from "./UI/Link/link";
import List from "./post/post2";
import firebase from '../firebase';
import classes from './s.module.css'
import Placeholder from './placeHolder/placeholder'
import 'firebase/database'
class Side extends Component {
    state = {
        posts: []
    }
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
            }

            this.setState({ posts: posts, loading: false })
        })
    }
    render() {

        let posts = { ...this.state.posts }
        let newsPosts = []
        for (let cat in posts) {
            posts[cat].forEach(cur => {
                cur.category = cat
                newsPosts.push(cur)
            })
        }

        return (
            <div className=" wow fadeInRight position-relative">
                <div className={[classes.widget, classes.search_blog].join(" ")}>
                    <div className={classes.form_group}>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="form-control"
                            placeholder="Search.."
                        />
                        <span>
                            <input type="submit" value="Search" />
                        </span>
                    </div>
                </div>
                {/* <!-- /widget --> */}
                <div className={classes.widget + " overflow-hidden sticky-top"}>
                    <div className={classes.widget_title}>
                        <h4>Latest Post</h4>
                    </div>
                    {this.state.loading ? <Placeholder amount='3' /> : <List data={newsPosts.reverse()} />}
                </div>
                {/* <!-- Categories Widget --> */}
                <div className="card my-4 ">
                    <h5 className="card-header">Categories</h5>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <Link href="/news"><a>news</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/sport"><a>sports</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/news?newscat=business-news" as="/news/business-news"><a>business </a></Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-6">
                                <ul className="list-unstyled mb-0">
                                    <li>
                                        <Link href="/videos"><a>videos|</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/health"><a>health</a></Link>
                                    </li>
                                    <li>
                                        <Link href="/others"><a>others</a></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Side