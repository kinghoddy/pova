import React from "react";
import classes from "./card.module.css";
import Link from 'next/link'
export default props => {
  return (
    <Link href={props.href} as={props.as} >
      <a className={classes.card + "  wow fadeIn slow"}>

        <img src={props.src} alt="" />
        <h5>{props.caption}</h5>
      </a>
    </Link>
  );
};
