import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap

class NaviBar extends Component {
  render() {
    return (
      <div className="d-flex align-items-center" style={{ height: '70px' }}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            width: '70px',
            height: '70px',
            backgroundColor: '#644536', 
            color: '#BBD686',
            fontWeight: 'bold',
          }}
        >
          Logo
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: '70px',
            backgroundColor: '#644536', 
            width:'100%',
            color: '#BBD686',
            fontWeight: 'bold',
          }}
        >
          Header
        </div>
      </div>
    );
  }
}

export default NaviBar;

//https://coolors.co/644536-b2675e-c4a381-bbd686-eef1bd