import React from 'react';
import classes from './footer.module.css'
import Link from 'next/link';
export default props => {
    return (
        <footer className={classes.footer + " bg-white fadeIn wow"}>
            <div className="container ">
                <div className="row py-5">
                    <div className="col-lg-3 col-6">
                        <h3>Quick Links</h3>

                        <ul className={classes.links}>
                            <li><Link href="/"><a>About us</a></Link></li>
                            <li><Link href="/news/newsCat?newscat=world-news"><a>World news</a></Link></li>
                            <li><Link href="/"><a>Help</a></Link></li>
                            <li><Link href="/"><a>My account</a></Link></li>
                            <li><Link href="/signup"><a>Create account</a></Link></li>
                            <li><Link href="/"><a>Contacts</a></Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">
                        <h3>Categories</h3>
                        <ul className={classes.links}>
                            <li><Link href="/news"><a>News</a></Link></li>
                            <li><Link href="/entertainment"><a>Entertainment</a></Link></li>
                            <li><Link href="/health"><a>Health</a></Link></li>
                            <li><Link href="/religion"><a>Religion</a></Link></li>
                            <li><Link href="/sport"><a>Sport</a></Link></li>
                            <li><Link href="/politics"><a>Politics</a></Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-6">

                        <h3>Contacts</h3>

                        <div className="collapse show" id="collapse_ft_3">
                            <ul className={classes.links}>
                                <li className="mb-3"><i className="fa fa-home mr-3 text-primary"></i>97845 Baker st. 567<br />Los Angeles - US</li>
                                <li className="mb-3"><i className="fa fa-phone mr-3 text-primary"></i>08055254784</li>
                                <li className="mb-3"><i className="fa fa-envelope mr-3 text-primary"></i><Link href="/">odunmilade@gmail.com</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <img src='/logo.jpg' alt="" className={classes.logo} />
                    </div>
                </div>
                <hr />
                <div className="row bg-dark text-light pt-lg-3 text-center">
                    <div className="col-lg-6 pb-3 pb-lg-0">
                        This site was created by Noel odunmilade
                    </div>
                    <div className="col-lg-6">
                        <ul className={classes.additional_links}>
                            <li><Link href="/"><a>Terms and conditions</a></Link></li>
                            <li><Link href="/"><a>Privacy</a></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}