import React, { Component } from 'react'
import Toolbar from '../toolbar/toolbar'
import Head from 'next/head';
import SideWidjet from '../sidewidget.js';
import Footer from '../footer/footer'
const google = () => {
    window.dataLayer = window.dataLayer || []
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag("js", new Date());

    gtag("config", "UA-144505091-5");
}
class Layout extends Component {
    componentDidMount() {
        google()
        console.log(this.props);

    }
    render() {
        return <div>
            <Head>
                <meta property="og:title" content={this.props.title ? this.props.title : ''} />
                <meta property="og:description"
                    content={this.props.body ? this.props.body : " We are set out to promote and celebrate Nigeria and Africa culture and achievements of UNCELEBRATED people in the areas of business, politics, economy, human and infrastructural development, education and entertainment."} />
                <title>{this.props.title ? this.props.title : 'Point of view africa | POVA pointofviewafrica'}</title>
                <link rel="shortcut icon" href={this.props.src ? this.props.src : "/logo.jpg"} type="image/x-icon" />
                <meta property="og:image" content={this.props.src ? this.props.src : "/logo.jpg"} />
            </Head>
            {this.props.hideToolbar ? null : <Toolbar />}

            <div className="container  p-0 ">
                <div className="row no-gutters ">
                    <div className="col-md-8 col-lg-9  pt-md-3   px-0 px-md-3 ">
                        {this.props.children}
                        <div className="shareaholic-canvas" data-app="share_buttons" data-app-id="28839360"></div>
                    </div>
                    <div className="col-md-4 col-lg-3 ml-auto overflow  mt-3 px-2 px-md-3 ">
                        <SideWidjet />
                    </div>
                </div>
            </div>
            <Footer />
            <style jsx>{`
            .overflow{
                overflow-x: hidden
            }
            `} </style>
        </div>
    }
}

export default Layout