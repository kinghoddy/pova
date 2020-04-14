import React from 'react'
import Link from '../UI/Link/link'

export default props => {
    return <React.Fragment>
        <nav className={" py-2 navbar navbar-dark navbar-expand-lg"}>
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
            <div className="collapse navbar-collapse py-3 py-lg-0" id="topNav">
                <ul className="navbar-nav ml-auto  mt-0">
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
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/admin">
                            <a className="nav-link" >
                                Admin
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item d-flex align-items-center ml-md-3">
                        <h5 className="mb-0 mr-3 text-light">Follow us </h5>
                        <div className={" shareaholic-canvas"} data-app="follow_buttons" data-app-id="28108433"></div>
                    </li>
                </ul>
            </div>
        </nav>
        <nav className={" py-0 navbar navbar-dark navbar-expand sticky-top overflow-auto"}>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ml-lg-auto mt-2 mt-lg-0">

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
                        <Link activeClassName="active" href="/entertainment">
                            <a className="nav-link">
                                Entertainment
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link activeClassName="active" href="/politics">
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
              background: #223;
              background-size: cover;
              background-position: bottom;
              transition: all 0.3s;
              z-index: 2000;
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