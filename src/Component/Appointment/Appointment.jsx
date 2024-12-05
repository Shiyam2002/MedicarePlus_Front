import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class ScheduleAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentID: '',
      patientName: '',
      doctor: '',
      dateOfAppointment: '',
      timeOfAppointment: '',
      status: 'Scheduled',
      doctorOptions: ["Devi Prasad Shetty", "Naresh Trehan", "Sudhansu Bhattacharyya", "Prathap C. Reddy", "Randeep Guleria"],
      statusOptions: ['Scheduled', 'Cancelled', 'Completed'],
      patientNames: [],
      patientDetails: {},
      message: ''
    };
  }

  // Fetch all patient names when the component mounts
  componentDidMount() {
    this.fetchPatientNames();
  }

  fetchPatientNames = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patient/AllPatientName');
      const data = await response.json();
      if (data.Status === 'OK') {
        this.setState({ patientNames: data.Data });
      }
    } catch (error) {
      console.error("Error fetching patient names:", error);
    }
  };

  // Fetch patient details by name when a name is selected
  fetchPatientDetails = async (name) => {
    try {
      const response = await fetch(`http://localhost:8080/api/patient/fetchByName/${name}`);
      const data = await response.json();
      if (data.Status === 'OK' && data.Data.length > 0) {
        this.setState({ patientDetails: data.Data[0] });
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      if (name === 'patientName') {
        this.fetchPatientDetails(value);
      }
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { appointmentID, patientName, doctor, dateOfAppointment, timeOfAppointment, status, patientDetails } = this.state;

    const appointmentData = {
      appointmentID: parseInt(appointmentID),
      patient: {
        patientId: patientDetails.patientID,
        patientName: patientDetails.patientName,
        patientEmail: patientDetails.patientEmail,
        patientPhone: patientDetails.patientPhone,
        patientDob: patientDetails.patientDob,
        employmentStatus: patientDetails.employmentStatus,
        annualIncome: patientDetails.annualIncome,
        address: patientDetails.address,
        insurance: patientDetails.insurance
      },
      doctor: parseInt(doctor),
      dateOfAppointment,
      timeOfAppointment,
      status
    };

    console.log('Appointment JSON:', JSON.stringify(appointmentData, null, 2));

    try {
      const response = await fetch('http://localhost:8080/Appointment/Schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        this.setState({ message: 'Appointment scheduled successfully!' });
      } else {
        this.setState({ message: 'Failed to schedule appointment. Please try again.' });
      }
    } catch (error) {
      this.setState({ message: 'An error occurred. Please try again later.' });
    }
  };

  render() {
    const { appointmentID, patientName, doctor, dateOfAppointment, timeOfAppointment, status, doctorOptions, statusOptions, patientNames, message } = this.state;

    return (
      <div className="container mt-5">
        <h3 className="text-center mb-4">Schedule Appointment</h3>
        <form onSubmit={this.handleSubmit} className="card p-4 shadow">
          {/* <div className="mb-3">
            <label className="form-label">Appointment ID</label>
            <input
              type="number"
              className="form-control"
              name="appointmentID"
              value={appointmentID}
              onChange={this.handleChange}
              required
            />
          </div> */}
          <div className="mb-3">
            <label className="form-label">Patient Name</label>
            <select
              className="form-select"
              name="patientName"
              value={patientName}
              onChange={this.handleChange}
              required
            >
              <option value="">Select Patient</option>
              {patientNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Doctor </label>
            <select
              className="form-select"
              name="doctor"
              value={doctor}
              onChange={this.handleChange}
              required
            >
              <option value="">Select Doctor</option>
              {doctorOptions.map((docID) => (
                <option key={docID} value={docID}>
                  {docID}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Appointment</label>
            <input
              type="date"
              className="form-control"
              name="dateOfAppointment"
              value={dateOfAppointment}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time of Appointment</label>
            <input
              type="time"
              className="form-control"
              name="timeOfAppointment"
              value={timeOfAppointment}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={status}
              onChange={this.handleChange}
              required
            >
              {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button-28">
            Schedule Appointment
          </button>
        </form>
        {message && <div className="alert alert-info mt-4">{message}</div>}
      </div>
    );
  }
}

export default ScheduleAppointment;
