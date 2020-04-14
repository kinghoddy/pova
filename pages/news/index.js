import React, { Component } from 'react'
import Layout from '../../components/layout/layout';
import Card from '../../components/card/card';
import Placeholder from '../../components/placeHolder/placeholder'
import firebase from '../../firebase'
import Head from 'next/head'
import 'firebase/database';
class News extends Component {
    static async getInitialProps({ query }) {
        return { query }
    }
    state = {
        news: {},
        pageTitle: "News | Point of view africa pova news"
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
                <div className="row pt-2 px-2">

                    {
                        news[cat].map(cur => (
                            <div className="col-12 col-md-6 col-lg-4 mb-2 px-0 px-md-2" key={cur.title}>
                                <Card href={"/news/{newscat]/[pid]?ewscat=" + cat + '&pid=' + cur.id} as={'/news/' + cat + '/' + cur.id} caption={cur.title} src={cur.src} />
                            </div>
                        ))
                    }
                </div>
            </div>)
        }
        return <Layout title={this.state.pageTitle}>
            <Head>

            </Head>
            {this.state.loading ? <Placeholder type="p1" amount={4} />
                : newsPosts
            }
            <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                <a class="a2a_button_facebook"></a>
                <a class="a2a_button_twitter"></a>
                <a class="a2a_button_whatsapp"></a>
                <a class="a2a_button_pinterest"></a>
            </div>
        </Layout>
    }
}


export default News