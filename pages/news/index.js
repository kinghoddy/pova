import React, { Component } from 'react'
import Layout from '../../components/layout/layout';
import Card from '../../components/card/card';
import Placeholder from '../../components/placeHolder/placeholder'
import firebase from '../../firebase'
import 'firebase/database';
class News extends Component {
    static async getInitialProps({ query }) {
        return { query }
    }
    state = {
        news: {},
        pageTitle: "News | Point of view africa"
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
            const news = {}
            for (let newsCat in snap.val()) {
                let newscat = snap.val()[newsCat]
                news[newsCat] = []
                for (let key in newscat) {
                    newscat[key].id = key
                    news[newsCat].push(newscat[key])
                }
                news[newsCat] = news[newsCat].reverse()


            }
            this.setState({ news: news, loading: false })
        })
    }
    render() {
        let news = { ...this.state.news }
        let newsPosts = []
        for (let cat in news) {
            newsPosts.push(<div className="px-3" key={cat}>
                <h4 className=" m-0 text-uppercase py-3 border-bottom">{cat.split('-').join(' ')}</h4>
                <div className="row pt-2 no gutters">

                    {
                        news[cat].map(cur => (
                            <div className="col-12 col-md-6 col-lg-4 mb-2 px-0 px-md-2" key={cur.title}>
                                <Card href={"/news/post?newscat=" + cat + '&pid=' + cur.id} as={'/news/' + cat + '/' + cur.id} caption={cur.title} src={cur.src} />
                            </div>
                        ))
                    }
                </div>
            </div>)
        }
        return <Layout title={this.state.pageTitle}>
            {this.state.loading ? <Placeholder type="p1" amount={4} />
                : newsPosts
            }
        </Layout>
    }
}


export default News