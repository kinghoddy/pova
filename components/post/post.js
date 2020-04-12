import React from "react";
import classes from "./post.module.css";
import Link from "next/link";
export default props => {
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
  var now = new Date(props.date);
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
    <article className={classes.blog + " wow fadeIn "}>
      <figure>
        <Link href={props.href} as={props.as}>
          <a>
            <img className="bg-light" src={props.src} alt="" />
            <div className={classes.preview}>
              <span>Read more</span>
            </div>
          </a>
        </Link>
      </figure>

      <div className={classes.post_info}>
        <h2>
          {props.title}
        </h2>
        <p dangerouslySetInnerHTML={{ __html: props.body.split('<br>').join(' ').substring(0, 90) + '...' }}></p>

        {/* <ul>
          <li>
            <div className={classes.thumb}>
              <img src={props.icon} alt="" />
            </div>{" "}
            Admin
          </li>
          <li>
            <i className={classes.ti_comment}></i>20
          </li>
        </ul> */}
      </div>
      <div className="align-items-center h6 m-0 bg-light font-weigth-light px-3 text-uppercase d-flex justify-content-between py-2">{props.category.split('-').join(' ')}
        <small>{date}</small>
      </div>
    </article>
  );
};
