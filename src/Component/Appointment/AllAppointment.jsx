import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class AllAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/Appointment/All')
      .then(response => response.json())
      .then(data => {
        if (data.Status === 'OK') {
          this.setState({
            appointments: data.Data,
            isLoading: false
          });
        } else {
          this.setState({
            error: 'Failed to fetch appointments',
            isLoading: false
          });
        }
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isLoading: false
        });
      });
  }

  render() {
    const { appointments, isLoading, error } = this.state;

    if (isLoading) {
      return <div className="text-center">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-danger">{error}</div>;
    }

    return (
      <div className="container mt-5">
        <div className="row">
          {appointments.map(appointment => (
            <div key={appointment.appointmentID} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5>Appointment with Dr. {appointment.doctor}</h5>
                </div>
                <div className="card-body">
                  <h6 className="card-title">Patient: {appointment.patient.patientName}</h6>
                  <p><strong>Email:</strong> {appointment.patient.patientEmail}</p>
                  <p><strong>Phone:</strong> {appointment.patient.patientPhone}</p>
                  <p><strong>Appointment Date:</strong> {appointment.dateOfAppointment}</p>
                  <p><strong>Appointment Time:</strong> {appointment.timeOfAppointment}</p>
                  <p><strong>Status:</strong> {appointment.status}</p>
                  <p><strong>Insurance:</strong> {appointment.patient.insurance.insuranceProvider} - {appointment.patient.insurance.coverageDetails}</p>
                  <p><strong>Address:</strong> {appointment.patient.address.patientDoor}, {appointment.patient.address.patientStreet}, {appointment.patient.address.city.cityName}, {appointment.patient.address.state.stateName}, {appointment.patient.address.country.countryName}</p>
                </div>
                <div className="card-footer text-muted">
                  <small>Appointment ID: {appointment.appointmentID}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AllAppointments;
