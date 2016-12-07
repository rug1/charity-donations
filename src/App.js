import React, { Component } from 'react';
import axios from 'axios';
import Donation from './Donation';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      charity: "",
      donations: "Getting donations..."
    };
  }

  componentWillMount(){
    var that = this;
    axios.get('/get-data')
    .then(function (response) {
      that.setState({
        donations: response.data.donations,
        charity: response.data.charity
      })
    })
    .catch(function (error) {
      that.setState({
        donations: "Donations currently unavailable"
      })
    });
  }

  renderDonations(){
    if (typeof this.state.donations === "string"){
      return (
        <p className="gettingDonations">{this.state.donations}</p>
      )
    } else {
      return (
        <div>
          <Donation donations={this.state.donations}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="App">

        <div className="header">
          <div className="container">
            <img className="justGivingLogo" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/JustGiving_Logo.svg/640px-JustGiving_Logo.svg.png"></img>
          </div>
        </div>

        <div className="imageStrip">
          <div className="container imageStripContainer">
            <img className="britishHeartFoundationLogo" src="https://upload.wikimedia.org/wikipedia/en/thumb/6/64/British_Heart_Foundation_logo.svg/787px-British_Heart_Foundation_logo.svg.png"></img>
            <div className="headingWrapper">
              <h1 className="heading">British Heart</h1>
              <h1 className="heading">Foundation</h1>
            </div>
            <h4 className="heading">We power research into heart diease to</h4>
            <h4 className="heading">beat the UK’s single biggest killer</h4>
          </div>
        </div>

        <div className="middleSection">
          <div className="container">
            <h2 className="strapLineHeading">Join the British Heart Foundation community</h2>
            <p className="strapLine">Coronary heart disease is the UK’s single biggest killer but we are leading the fight against it. Your donations power our life-saving research. Help us keep more families together. Join our fight for every heartbeat.</p>
            <i className="material-icons">link</i><a className="link" href="https://www.bhf.org.uk/">website</a>
            <i className="material-icons">link</i><a className="link" href="https://www.bhf.org.uk/about-us/contact-us">contact</a>
            <div className="buttonContainer">
              <div className="donateButton">Donate</div>
              <div className="fundraiseButton">Fundraise</div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="donationsContainer">
            <h2 className="strapLineHeading">Donations</h2>
            {this.renderDonations()}
          </div>

          <div className="rightSection">
            <p className="exampleDonation">£10</p>
            <p className="exampleDonationDescription">could pay for all the test-tubes, glassware, pipette tips and gloves</p>
            <p className="exampleDonation">£15</p>
            <p className="exampleDonationDescription">could help to fund a full day’s BHF Heart Nursing care.</p>
          </div>
        </div>

        <div className="footer"></div>

      </div>
    );
  }
}

export default App;
