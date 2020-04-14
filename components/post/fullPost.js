import React, { Component } from "react";
import classes from "./post.module.css";
import Link from "next/link";
class FullPost extends Component {

    render() {
        let date = 'Dec 12 2019 at 5:30pm'
        var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        var now = new Date(this.props.post.date);
        var month = months[now.getMonth()];
        var year = now.getFullYear();
        var monthDay = now.getDate();
        var week = weekDays[now.getDay()];
        var hour = now.getHours();
        var min = dec(now.getMinutes());
        var clock = " am";
        if (hour > 12) {
            clock = " pm";
            hour -= 12
        }
        function dec(num) {
            if (num < 10) return "0" + num;
            else return num;
        }
        var current = new Date()

        if (current.getDate() === monthDay) {
            date = "Today at " + hour + ":" + min + clock;
        } else if ((current.getDate() - monthDay === 1) || (current.getDate() - monthDay === -30)) {
            date = "Yesterday at " + hour + ":" + min + clock;
        } else if (
            current.getDate() - monthDay > 1 &&
            current.getDate() - monthDay < 7
        ) {
            date = week + " at " + hour + ":" + min + clock;
        } else if (year === current.getFullYear()) {
            date =
                month + " " + monthDay + " at " + monthDay + " " + hour + ":" + min + clock;
        } else if (year > current.getFullYear()) {
            date =
                month +
                " " +
                monthDay +
                " " +
                year +
                " at " +
                hour +
                ":" +
                min +
                clock;
        } else {
            date = week + '  ' + hour + ':' + min + clock
        }
        return (
            <div className={classes.singlepost + " wow fadeIn slow"
            } >

                <figure><img alt="" src={this.props.post.src} /></figure>
                <div className={classes.postmeta}>
                    <ul>
                        <li><Link href={"/news/[newscat]?newscat=" + this.props.newscat} as={`/news/${this.props.newscat}`} >
                            <a className="text-capitalize">
                                <i className="ti-folder "></i> {this.props.newscat ? this.props.newscat.split('-').join(' ') : null}
                            </a>
                        </Link>
                        </li>
                        <li> {date}</li>

                    </ul>
                </div>
                <h1 className={classes.postTitle}>{this.props.post.title}</h1>
                <div class={"a2a_kit a2a_kit_size_32 a2a_default_style pb-3 " + classes.buttons} >
                    <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                    <a class="a2a_button_facebook"></a>
                    <a class="a2a_button_twitter"></a>
                    <a class="a2a_button_whatsapp"></a>
                    <a class="a2a_button_pinterest"></a>
                </div>
                <div className={classes.post_content}>
                    <div className={classes.dropcaps}>
                        <p dangerouslySetInnerHTML={{ __html: this.props.post.body }} >
                        </p>
                    </div>
                </div>

            </div >
        );
    };

}
export default FullPost