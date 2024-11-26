import React, { Component } from 'react';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFooterVisible: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = window.scrollY; // Current scroll position
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Show the footer after scrolling 75% of the page
    if (scrollTop > windowHeight * 0.95) {
      this.setState({ isFooterVisible: true });
    } else {
      this.setState({ isFooterVisible: false });
    }
  };

  

  render() {
    const { isFooterVisible } = this.state;

    return (
      <footer
        style={{
          position: 'fixed',
          bottom: isFooterVisible ? 0 : '-100px',
          left: 0,
          width: '100%',
          transition: 'bottom 0.5s ease',
          backgroundColor: '#B2675E',
          color: '#EEF1BD',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        <p>Welcome to our website. We're here to help!</p>
        <p>
          Contact us: <a href="mailto:contact@website.com" style={{ color: '#EEF1BD', textDecoration: 'underline' }}>contact@website.com</a> | Phone: +123 456 7890
        </p>
        <p>© 2024 Your Company Name. All rights reserved.</p>
      </footer>
    );
  }
}

// https://coolors.co/36413e-5d5e60-8d8d92-beb2c8-d7d6d6
