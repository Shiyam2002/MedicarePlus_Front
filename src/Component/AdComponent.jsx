import React, { Component } from 'react';

class HospitalAdComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAdIndex: 0,
    };
    this.ads = [
      {
        id: 1,
        title: "State-of-the-Art Facilities",
        description: "Experience world-class treatment at our hospital.",
        image: "/hospital1.png", // Image from the public folder
      },
      {
        id: 2,
        title: "24/7 Emergency Services",
        description: "Our emergency room is always open for you.",
        image: "/hospital2.png", // Example external image
      },
      {
        id: 3,
        title: "Compassionate Care",
        description: "Our team of specialists provides personalized care.",
        image: "/hospital3.png", // Example external image
      },
      {
        id: 4,
        title: "Advanced Diagnostics",
        description: "Accurate and timely diagnosis for effective treatment.",
        image: "/hospital4.png", // Example external image
      },
      {
        id: 5,
        title: "Health Checkup Packages",
        description: "Affordable and comprehensive health packages.",
        image: "/hospital5.jpg", // Example external image
      },
    ];
  }

  // Change ad every 30 seconds
  componentDidMount() {
    this.adInterval = setInterval(this.nextAd, 10000); // 30 seconds
  }

  componentWillUnmount() {
    clearInterval(this.adInterval);
  }

  // Show the next ad in the array
  nextAd = () => {
    this.setState((prevState) => ({
      currentAdIndex: (prevState.currentAdIndex + 1) % this.ads.length,
    }));
  };

  render() {
    const { currentAdIndex } = this.state;
    const currentAd = this.ads[currentAdIndex];

    return (
      <div className="ad-container mt-4">
        {currentAd && (
          <div className="ad-card">
            <h3>{currentAd.title}</h3>
            <img
              src={currentAd.image}
              alt={currentAd.title}
              className="img-fluid"
              style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
            />
            <p>{currentAd.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default HospitalAdComponent;
