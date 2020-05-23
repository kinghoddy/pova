import React, { Component } from 'react';
import Link from '../UI/Link/link';
import classes from './backend.module.css'
import firebase from '../../firebase';
import 'firebase/auth'
import 'firebase/database'
import Loader from '../UI/loader/loader'
import Head from 'next/head'
import Router from 'next/router'

export default class extends Component {
    state = {
        userData: {
            profilePicture: ""
        },
        shouldLogout: false,
        showSidenav: false
    }
    componentDidUpdate() {
        if (this.state.shouldLogout) Router.push('/login?route=admin')

    }
    componentDidMount() {

        this.setState({ loading: true });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const userdata = {
                    ...this.state.userData
                };
                userdata.profilePicture = user.photoURL;
                userdata.uid = user.uid;
                userdata.username = user.displayName.toLowerCase();

                this.setState({
                    loading: false,
                    shouldLogout: false,
                    userData: userdata
                });
            } else {
                this.setState({ shouldLogout: true, loading: false });
            }

        });

    }
    logOutHandler = () => {
        this.setState({ loading: true });
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.setState({ loading: false, shouldLogout: true });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
                // An error happened.
            });
    };
    toggleSidenav = () => {
        this.setState({ showSidenav: !this.state.showSidenav });
    };
    render() {

        return (
            <div className={[classes.wrapper, this.state.showSidenav ? classes.show : ''].join(" ")} >
                <Head>
                    <title>Admin | pint of view africa</title>
                    <link rel="shortcut icon" href="/logo.jpg" />
                    <meta property="og:title" content="Admin | Pointofviewafrica" />
                    <meta property="og:image" content="/logo.jpg" />
                </Head>
                {this.state.loading ? <Loader /> : null}
                {this.state.showSidenav ?
                    <div className={classes.backdrop} onClick={this.toggleSidenav}></div>
                    : null}
                <div className={classes.Sidenav}>
                    <h3>
                        <strong className="pl-3 d-inline-block ">ADMIN </strong>
                        <small className="pl-3 d-inline-block "> | POVA </small>
                    </h3>
                    <div className="d-flex  p-2 align-items-center py-3">
                        <div className={classes.picture + " rounded-circle bg-light"}>
                            <img src={this.state.userData.profilePicture} alt="" />
                        </div>
                        <h4>{this.state.userData.username}</h4>
                    </div>

                    <Link activeClassName={classes.active} href="/admin">
                        <a className={classes.sidenavLink}>
                            Dashboard
                        </a>
                    </Link>

                    <Link activeClassName={classes.active} href="/admin/posts?category=news" as="/admin/posts">
                        <a className={classes.sidenavLink} >
                            Posts
                        </a>
                    </Link>
                    <Link activeClassName={classes.active} href="/admin/users"  >
                        <a className={classes.sidenavLink}>
                            Users
                        </a>
                    </Link>
                    <Link activeClassName={classes.active} href="/admin/new-post"  >
                        <a className={classes.sidenavLink}>
                            New post
                        </a>
                    </Link>
                    <Link activeClassName={classes.active} href="/admin/media"  >
                        <a className={classes.sidenavLink}>
                            Media storage
                        </a>
                    </Link>

                    <button onClick={this.logOutHandler} className="btn-block btn rounded btn-outline-light">Log out</button>
                    {/* <img className={classes.logo} alt="" src="/logo.jpg" /> */}
                </div>
                <nav className={classes.navbar + " navbar navbar-expand py-1 fixed-top border-bottom navbar-light bg-white"}>
                    <div className={classes.brand + " navbar-brand py-0 mr-auto"}>
                        <button
                            onClick={this.toggleSidenav}
                            className="border-0 "
                        >
                            <i className="material-icons">menu</i>
                        </button>
                        <h4 className="m-0 pl-3">{this.props.route}</h4>
                    </div>
                    <Link href="/">
                        <a className="text-dark pr-3 font-weight-bold">
                            Go to site
                        </a>
                    </Link>
                    <div className={classes.picture + " rounded-circle bg-light"}>
                        <img src={this.state.userData.profilePicture} alt="" />
                    </div>

                </nav>
                {this.props.children}

            </div>
        )
    }
}
