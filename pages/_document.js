import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {


    render() {

        return (
            <html>
                <Head>


                    <link rel="preload" href="https://cdn.shareaholic.net/assets/pub/shareaholic.js" as="script" />
                    <meta name="shareaholic:site_id" content="182b0bb934f1c10e50b9077bca5aab91" />
                    <script data-cfasync="false" async src="https://cdn.shareaholic.net/assets/pub/shareaholic.js"></script>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-144505091-5"></script>
                    <meta name="theme-color" content="#fff" />
                    <link rel="stylesheet" href="/iconfont/material-icons.css" />
                    <link rel="stylesheet" href="/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="/index.css" />
                    <link rel="stylesheet" href="/css/animate.min.css" />
                    <script src="/js/jquery.js"></script>
                    <script src="/js/bootstrap.min.js"></script>
                    <script src="/js/all.js"></script>
                    <script src="/js/wow.min.js"></script>
                    <meta name="description"
                        content="P.O.V.A  is an exclusive pictorial  news site. It is a one stop media outfit dedicated to exploring journalistic ideologies and promoting African values" />

                    <link href="https://fonts.googleapis.com/css?family=Josefin+Sans|Sen&display=swap" rel="stylesheet" />
                    <meta property="og:title" content="Point of view africa POVA |" />
                    <meta property="og:description"
                        content=" We are set out to promote and celebrate Nigeria and Africa culture and achievements of UNCELEBRATED people in the areas of business, politics, economy, human and infrastructural development, education and entertainment." />
                </Head>
                <body>
                    <Main />


                    <NextScript />

                </body>
                <script src="/js/main.js"></script>
                <script async src="https://static.addtoany.com/menu/page.js"></script>
            </html>
        )
    }
}