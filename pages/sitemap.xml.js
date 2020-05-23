import React from "react";
import firebase from '../firebase';
import 'firebase/database'
const sitemapXML = data => {
    let latestPost = 0;
    let projectsXML = "";

    data.map(post => {
        const postDate = Date.parse(post.modified);
        if (!latestPost || postDate > latestPost) {
            latestPost = postDate;
        }

        const projectURL = `https://pointofviewafrica.com.ltd/project/${post.slug}/`;
        projectsXML += `
      <url>
        <loc>${projectURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://domain.ltd/</loc>
        <lastmod>${latestPost}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://domain.ltd/about/</loc>
        <priority>0.80</priority>
      </url>
      ${projectsXML}
    </urlset>`;
};

class Sitemap extends React.Component {
    static async getInitialProps({ res }) {
        const ref = firebase.database().ref('posts/')
        const data = await ref.child('news').once('value', snap => {
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
                .once('value', s => {
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
                    ref.child(cur).once('value', snap => {
                        for (let keys in snap.val()) {
                            newsPosts.push({
                                ...snap.val()[keys],
                                category: cur,
                                id: keys,
                                href: "/[cat]/[pid]?pid=" + keys,
                                as: '/' + cur + '/' + keys
                            })
                        }
                        return newsPosts
                    })
                })
            })


            this.setState({ loading: false })
        })

        res.setHeader("Content-Type", "text/xml");
        res.write(sitemapXML(data));
        res.end();
    }

    componentDidMount() {
        console.log(this.props)
    }
}

export default Sitemap;