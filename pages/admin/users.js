import React, { Component } from 'react';
import Layout from '../../components/backend/backend';
import Placeholder from '../../components/placeHolder/placeholder';
import firebase from '../../firebase';
import 'firebase/database'

export default class Users extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        firebase.database().ref('users/').on('value', s => {
            const users = []
            for (let keys in s.val()) {
                let user = {
                    ...s.val()[keys]
                }
                users.push(user)
            }
            this.setState({ users: users })
        })
    }
    render() {
        return <Layout route='Users' >
            {this.state.loading ? <Placeholder amount='6' /> : this.state.users.map(cur => (
                <div className="d-flex align-items-center user">
                    <img src={cur.profilePicture} alt="" />
                    <h5 className="pl-3">{cur.username} </h5>
                </div>
            ))}
            <style jsx>{`
            .user {
                background : var(--white);
                padding : .5rem;
                text-transform : capitalize;
                margin : .5rem;
            }
            .user img{
                height : 6rem;
                background : var(--secondary);
                width : 6rem;
                border-radius : 50%;
                display : flex;
            }
            
            `} </style>
        </Layout>
    }
}