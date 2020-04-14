import React from 'react';
import Link from 'next/link';

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

    return <Link href={`/videos/[pid]?pid=${props.id}`} as={`/videos/${props.id}`}>
        <div className="d-flex list">
            <video src={props.src} preload></video>
            <div className="p-3 ">
                <h6 className="mb-0 mb-md-2"> {props.title}</h6>
                <span>{date}</span>
                <p className="m-0 d-none d-lg-block">

                    {props.body.substring(0, 180)}...
                                </p>
            </div>
            <style jsx>
                {`
                .list{
                    margin : 1rem 0;
                    height : 7rem;
                    background : #fff;
                    transition :all .3s 
                }
                .list:hover{
                    background : #f7f7ff;
  box-shadow: 0px 8px 20px  rgba(0, 0, 0, 0.1);
                }
                .list video{
                    height : 100%;
                    background : #ddd;
                    width : 30%;
                    object-fit : cover
                }
                .list span{
                    font-size : .8rem ;
                    color : #29f
                }
                .list p {
                    color : #888
                }
                
                @media only screen and (min-width : 760px){
                    .list {
                        height : 7rem
                    }
                }
                @media only screen and (min-width : 1200px){
                    .list {
                        height : 11rem
                    }
                }
                `}
            </style>
        </div>

    </Link>

}