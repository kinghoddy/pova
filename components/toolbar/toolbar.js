import React from 'react'
import Link from '../UI/Link/link'

export default props => {
    return <React.Fragment>
        <nav className={" py-0 navbar  navbar-dark navbar-expand  overflow-auto"}>
            <div className="collapse navbar-collapse py-0" id="collapsibleNavId">
                <ul className="navbar-nav   mt-0">
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/news/[newscat]?newscat=nigerian-news" as="/news/nigerian-news" >
                            <a className="nav-link" >
                                Nigeria
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/news/[newscat]?newscat=african-news" as="/news/african-news">
                            <a className="nav-link" >
                                Africa
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/news/[newscat]?newscat=uk-news" as="/news/uk-news">
                            <a className="nav-link" >
                                Uk
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/news/[newscat]?newscat=world-news" as="/news/world-news">
                            <a className="nav-link" >
                                World
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/news/[newscat]?newscat=business-news" as="/news/business-news">
                            <a className="nav-link" >
                                Business
                            </a>
                        </Link>
                    </li>


                </ul>
            </div>
            <form className="nav-form">
                <input type="search" placeholder="Search..." />
                <button>
                    <i className="material-icons">search</i>
                </button>
            </form>
            <div className=" d-flex align-items-center ml-3 ml-lg-5">
                <h5 className="mb-0  mr-3 text-light">Follow us </h5>
                <div className={"d-flex shareaholic-canvas"} data-app="follow_buttons" data-app-id="28108433"></div>
            </div>
        </nav>

        <nav className={"nav1 py-2 sticky-top navbar navbar-light navbar-expand-lg"}>
            <Link href="/">
                <a className={"brand navbar-brand"}>
                    <img src="/logo.jpg" alt="" />
                    <span className="text-uppercase ml-2 h6 font-weight-light d-inlime-block pt-3">Point of view africa </span>
                </a>
            </Link>
            <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-toggle="collapse"
                data-target="#topNav"
                aria-controls="topNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className="material-icons">
                    menu
                </i>
            </button>
            <div className="collapse navbar-collapse" id="topNav">
                <ul className="navbar-nav ml-auto">

                    <li className="nav-item ">
                        <Link activeClassName="active" href="/">
                            <a className="nav-link">
                                Home
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/news">
                            <a className="nav-link">
                                News
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/videos">
                            <a className="nav-link">
                                Videos
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/[cat]?cat=entertainment" as="/entertainment">
                            <a className="nav-link">
                                Entertainment
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/[cat]?cat=politics" as="/politics">
                            <a className="nav-link">
                                Politics
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/sport">
                            <a className="nav-link">
                                Sport
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">

                        <Link activeClassName="active" href="/crime">
                            <a className="nav-link">
                                Crime
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/health">
                            <a className="nav-link">
                                Health
                            </a>
                        </Link>
                    </li>
                </ul>

            </div>

        </nav>
        <style jsx>
            {`
            nav,
     nav.scrolled {
              background: #822;
              background-size: cover;
              background-position: bottom;
              transition: all 0.3s;
              z-index: 2000;
           }
           .nav1{
               background : white;
               box-shadow : 0 0rem .5rem rgba(0,0,0,.1)
           }
nav::-webkit-scrollbar {
  height: 1px;
}
nav img {
  height: 2.6rem;
}
.plug > * {
  display: flex;
  align-items: center;
}
.nav-form {
    display :flex;
    align-self : stretch;
    border-radius : 2px;
    overflow : hidden;
}
.nav-form input::placeholder{
    color : rgba(255,255,255,.5);
}
nav > *{
    flex-shrink : 0;
}
.nav-form input {
    width : 15rem;
    color : white;
    padding : 0 1rem;
    border : 0;
    align-self : stretch;
    background : rgba(255,255,255,.1);
    outline : 0

}
.nav-form button {
    background : none;
    align-self : stretch;
    color : white;
    border : 0;
    outline : 0;
    background : rgba(0,0,0,.2);

}
nav .brand {
  align-items: center;
  padding: 0 !important;
}
.nav-link:hover,
.active {
    border-bottom : 2px solid #971;
}
@media only screen and (min-width: 1200px) {
  nav {
    padding: 0 6rem;
  }
}


            `}
        </style>
    </React.Fragment>
}