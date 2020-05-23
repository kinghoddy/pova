import React from "react";
import classes from "./card.module.css";
import Link from 'next/link'
export default props => {
  return (
    <Link href={props.href} as={props.as} >
      <a style={props.style} className={classes.card + "  wow fadeIn slow"}>
        <span className={classes.cat}>{props.category}</span>
        <img src={props.src} alt="" />
        <h5>{props.caption}</h5>
      </a>
    </Link>
  );
};
