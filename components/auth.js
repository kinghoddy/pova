import React from 'react';
export default props => {
    return (
        <div className={"user row"}>
            <div className="col-lg-4 mx-auto  px-5">
                <img src='/logo.jpg' alt="" className='logo my-3' />
                {props.children}
            </div>
            <style jsx>{`
            .user {
  background: url("/access_bg.jpg");
  min-height: 100vh;
  background-size: cover;
  margin: 0;
  height: 100vh;
  overflow: auto;
}
.logo {
  height: 8rem;
  margin: auto;
  display: block;
}
.user > * {
  background: rgba(255, 255, 255, 0.8);
}
@media only screen and (min-width: 1200px) {
  .user > * {
    background: rgba(255, 255, 255, 0.95);
  }
}

            `} </style>
        </div>
    )
}