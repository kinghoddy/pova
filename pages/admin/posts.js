import React, { Component } from 'react';
import Layout from '../../components/backend/backend';
import firebase from '../../firebase';
import 'firebase/database'
import Link from 'next/link'
import 'firebase/storage';
import PlaceHolder from '../../components/placeHolder/placeholder'


export default class Post extends Component {
    state = {
        news: {},
        category: 'news',
        vidPost: [],
        post: []
    }
    static async getInitialProps({ query }) {
        console.log(query);
        return {}
    }
    getPost = (category) => {
        this.setState({ loading: true })
        const ref = firebase.database().ref('posts/' + category)
        ref.on('value', s => {
            const posts = []
            for (let keys in s.val()) {
                let post = { ...s.val()[keys] }
                post.id = 'posts/' + category + '/' + keys
                post.category = category
                posts.push(post)
            }
            this.setState({ loading: false, post: posts })
        })
    }
    getVideos = () => {
        this.setState({ loading: true })
        const ref = firebase.database().ref('posts/videos')
        ref.on('value', s => {
            const posts = []

            for (let keys in s.val()) {
                let post = { ...s.val()[keys] }
                post.id = 'posts/videos/' + keys
                posts.push(
                    post
                )
            }

            this.setState({ loading: false, vidPost: posts })
        })
    }
    getNews = () => {
        this.setState({ loading: true })
        const ref = firebase.database().ref('posts/')
        // load news
        ref.child('news').on('value', snap => {
            const news = {}
            for (let newsCat in snap.val()) {
                let newscat = snap.val()[newsCat]
                news[newsCat] = []
                for (let key in newscat) {
                    newscat[key].id = 'posts/news/' + newsCat + '/' + key
                    news[newsCat].push(newscat[key])
                }
            }
            this.setState({ news: news, loading: false })
        })
    }
    deletePost = (id, src) => {
        var shouldDelete = window.confirm("Do you want to delete this post ?");
        console.log(id, src, 'clicked');
        if (shouldDelete) {

            if (src) {
                var desertRef = firebase.storage().ref(src);
                desertRef.delete()
                firebase.database().ref(id).set(null)
            } else {
                firebase.database().ref(id).set(null)
            }
        }
    }
    componentDidMount() {
        this.getNews()
    }
    inputChanged = e => {
        if (e.target.value === 'videos') {
            this.getVideos()
        } else if (e.target.value === 'news') {
            this.getNews()
        } else {
            this.getPost(e.target.value)
        }
        this.setState({ category: e.target.value })
    }

    render() {
        let news = { ...this.state.news }
        let newsPosts = []
        for (let cat in news) {
            newsPosts.push(<div className="px-3" key={cat}>
                <h4 className="px-4 m-0 text-uppercase py-3 border-bottom">{cat.split('-').join(' ')}</h4>

                {
                    news[cat].map(cur => (
                        <div className='post' key={cur.title}>
                            <img src={cur.src} alt="" />
                            <div className="px-3">
                                <h5 className="text-capitalize font-weight-bold"> {window.innerWidth < 760 ? cur.title.split("<br/>")
                                    .join(" ")
                                    .substring(0, 20) +
                                    (Array.from(cur.title).length > 20 ? "..." : "") : cur.title.split("<br/>")
                                        .join(" ")
                                        .substring(0, 35) +
                                    (Array.from(cur.title).length > 35 ? "..." : "")} </h5>
                                <p>{window.innerWidth < 760 ? cur.body.split("<br/>")
                                    .join(" ")
                                    .substring(0, 15) +
                                    (Array.from(cur.body).length > 15 ? "..." : "") : cur.body.split("<br/>")
                                        .join(" ")
                                        .substring(0, 150) +
                                    (Array.from(cur.body).length > 150 ? "..." : "")}</p>
                            </div>
                            <div className="ml-auto">
                                <Link href={'/admin/edit-post?postLink=' + cur.id + '&newscat=' + cat} >
                                    <a className="btn btn-sm">

                                        <i className="material-icons">edit</i>
                                    </a>

                                </Link>
                                <button className="btn btn-sm btn-danger ">
                                    <i onClick={() => { this.deletePost(cur.id, cur.storageRef) }} className="material-icons">delete</i>
                                </button>
                            </div>
                        </div>

                    ))
                }
                <style jsx>{`
            .post {
                display: flex;
                align-items: center;
                height: 7rem;
                border-bottom: 1px solid #ddd;
            }
            .post img {
                width: 25%;
                height: 80%;
                object-fit: cover;
                background-color: #ddd;
                border: 1px solid #eee;
            }
            .post button {
                height: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 0.5rem;
                margin: 0;
                font-size: 0.5rem;
            }
            
            @media only screen and (min-width: 760px) {
                .post img {
                    width: 15%;
                }
            }

`} </style>

            </div>)
        }
        let vidPost = this.state.vidPost.map(cur => (
            <div className='post p-3'>
                <video src={cur.src}></video>
                <div>
                    <h4>{window.innerWidth < 760 ? cur.title.split("<br/>")
                        .join(" ")
                        .substring(0, 20) +
                        (Array.from(cur.title).length > 20 ? "..." : "") : cur.title.split("<br/>")
                            .join(" ")
                            .substring(0, 35) +
                        (Array.from(cur.title).length > 35 ? "..." : "")} </h4>
                    <p>{window.innerWidth < 760 ? cur.body.split("<br/>")
                        .join(" ")
                        .substring(0, 15) +
                        (Array.from(cur.body).length > 15 ? "..." : "") : cur.body.split("<br/>")
                            .join(" ")
                            .substring(0, 150) +
                        (Array.from(cur.body).length > 150 ? "..." : "")}</p>
                </div>
                <div className="ml-auto">
                    <Link href={'/admin/edit-post?postLink=' + cur.id + '&category=videos'} >
                        <a className="btn btn-primary btn-sm">
                            <i className="material-icons">edit</i>
                        </a>
                    </Link>
                    <button onClick={() => { this.deletePost(cur.id, cur.storageRef) }} className="btn btn-sm btn-danger ">
                        <i className="material-icons">delete</i>
                    </button>
                </div>
                <style jsx>{`
          .post {
  display: flex;
  height: 6rem;
  margin-bottom: 0.5rem;
}
.post video {
  height: 100%;
  background: #ddd;
  width: 20%;
  object-fit: cover;
}
.post > div {
  margin-left: 1rem;
}

@media only screen and (min-width: 760px) {
  .post {
    height: 8rem;
  }
  .post > div {
    margin-left: 2rem;
  }
}


`} </style>

            </div>

        ));
        let Others = this.state.post.map(cur => (
            <div className='post p-3'>
                <img src={cur.src} alt="" />
                <div>
                    <h4>{window.innerWidth < 760 ? cur.title.split("<br/>")
                        .join(" ")
                        .substring(0, 20) +
                        (Array.from(cur.title).length > 20 ? "..." : "") : cur.title.split("<br/>")
                            .join(" ")
                            .substring(0, 35) +
                        (Array.from(cur.title).length > 35 ? "..." : "")} </h4>
                    <p>{window.innerWidth < 760 ? cur.body.split("<br/>")
                        .join(" ")
                        .substring(0, 15) +
                        (Array.from(cur.body).length > 15 ? "..." : "") : cur.body.split("<br/>")
                            .join(" ")
                            .substring(0, 150) +
                        (Array.from(cur.body).length > 150 ? "..." : "")}</p>
                </div>
                <div className="ml-auto">
                    <Link href={'/admin/edit-post?postLink=' + cur.id + '&category=' + cur.category} >
                        <a className="btn btn-primary btn-sm">
                            <i className="material-icons">edit</i>
                        </a>
                    </Link>
                    <button onClick={() => { this.deletePost(cur.id) }} className="btn btn-sm btn-danger ">
                        <i className="material-icons">delete</i>
                    </button>
                </div>
                <style jsx>{`
          .post {
  display: flex;
  height: 6rem;
  margin-bottom: 0.5rem;
}
.post img {
  height: 100%;
  background: #ddd;
  width: 20%;
  object-fit: cover;
}
.post > div {
  margin-left: 1rem;
}

@media only screen and (min-width: 760px) {
  .post {
    height: 8rem;
  }
  .post > div {
    margin-left: 2rem;
  }
}


`} </style>

            </div>

        ));

        return <Layout route="Posts">
            <div className="d-flex px-3 align -items-center py-3 justify-content-between">
                <select className="wow bounce  w-50 form-control"
                    onChange={(event) => {
                        this.inputChanged(event, 'select')
                    }}
                >
                    <option value="news">News</option>
                    <option value="videos">Videos</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="religion">Religion</option>
                    <option value="health">health</option>
                    <option value="sport">Sport</option>
                    <option value="crime">Crime</option>
                </select>

                <Link href="/admin/new-post?category=video" as="/admin/new-post">
                    <button className="btn btn-sm px-4  rounded-pill btn-outline-dark">
                        Add new post
                        </button>
                </Link>
            </div>
            {this.state.loading ? <PlaceHolder amount="6" /> : this.state.category === 'news' ? newsPosts : this.state.category === 'videos' ? vidPost : Others}
        </Layout>
    }
}
