import React, { Component } from 'react';
import './App.css';

class Donation extends Component {

  formatCurrency(amount) {
    return "£" + amount.toFixed(2);
  }

  render() {
    var that = this;
    var donations = this.props.donations;
    return (
      <div>
        {
          donations.map(function(donation){
            return (
              <div className="donation">
                <img className="donationAvatar" src={donation.imageUrl}></img>
                <div className="donationContents">
                  <p className="donarName"><b>{donation.donorDisplayName}</b></p>
                  <p className="donarAmount">{that.formatCurrency(donation.amount)}</p>
                  <p className="donarDescription">{donation.message}</p>
                </div>
                <hr></hr>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Donation;
