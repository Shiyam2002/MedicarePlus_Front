import React, { Component } from 'react';

class AdComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomAd: null,
    };
    this.ads = [
      {
        id: 1,
        title: "Get your insurance covered",
        description: "Special offer on all insurancess",
        image: "/insurance.jpg", // Image from the public folder
      },
      {
        id: 2,
        title: "Get your insurance covered",
        description: "Special offer on all insurancess",
        image: "/insurance.jpg", // Example external image
      },
      {
        id: 3,
        title: "Get your insurance covered",
        description: "Special offer on all insurancess",
        image: "/insurance.jpg", // Example external image
      },
      {
        id: 4,
        title: "Get your insurance covered",
        description: "Special offer on all insurancess",
        image: "/insurance.jpg", // Example external image
      }
    ];
  }

  // Function to select a random ad
  getRandomAd = () => {
    const randomIndex = Math.floor(Math.random() * this.ads.length);
    this.setState({
      randomAd: this.ads[randomIndex],
    });
  };

  // Show a random ad when the component mounts
  componentDidMount() {
    this.getRandomAd();
  }

  render() {
    const { randomAd } = this.state;

    return (
      <div className="ad-container">
        {randomAd && (
          <div className="ad-card">
            <h3>{randomAd.title}</h3>
            <img src={randomAd.image} alt={randomAd.title} className="img-fluid" style={{ width: '100%', maxWidth: '300px', height: 'auto' }} />
            <p>{randomAd.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default AdComponent;
