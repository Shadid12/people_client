import React from 'react';
import { render } from 'react-dom';


const CLIENT_ID = '1043178444240-fit0566r45gcbvog4tei1pour1ba436t.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBP5wE0btn_VBAtdvvy9gnxttfWsF6n-mw';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/contacts";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAthourized: false,
            connections: []
        }

    }

    componentDidMount() {
        this.loadAPI();
    }

    render() {
        const button = this.state.isAthourized ? (
            <button onClick={this.signOut}>Sign Out</button>
        ) : (
            <button onClick={this.authorize}>Authorize</button>
        );

        return (
            <div>
                {button}
            </div>
        )
    }

    signOut = () => {
        window.gapi.auth2.getAuthInstance().signOut();
        this.setState({isAthourized: false});
    }

    authorize = () => {
        window.gapi.auth2.getAuthInstance().signIn().then( () => {
            this.setState({isAthourized: true});
            this.getContacts();
        });
    }

    loadAPI() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        script.onload = () => {
            window.gapi.load('client:auth2', this.initClient);
        };
        document.body.appendChild(script);
    }

    initClient = () => {
        window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then( () => {
        // Listen for sign-in state changes.
        let k = window.gapi.auth2.getAuthInstance().isSignedIn.get();
        if (k) {
            this.setState({isAthourized: k});
        } else {
            this.setState({connections: []});
            this.setState({isAthourized: false});
        }
      }).then( () => {
        if(this.state.isAthourized) {

            window.gapi.client.people.people.connections.list({
                'resourceName': 'people/me',
                'pageSize': 50,
                'personFields': 'names,genders,birthdays'
            }).then( (response) => {
                let connections = response.result.connections;
                this.setState({connections: connections});
            });

        }
        else {
            console.log('Not Signed in');
        }
      });
    }

    getContacts = () => {
        if(this.state.isAthourized) {

            window.gapi.client.people.people.connections.list({
                'resourceName': 'people/me',
                'pageSize': 50,
                'personFields': 'names,genders,birthdays'
            }).then( (response) => {
                let connections = response.result.connections;
                this.setState({connections: connections});
            });

        }
        else {
            console.log('Not Signed in');
        }
    }
}