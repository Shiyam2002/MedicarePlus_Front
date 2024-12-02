import React, { Component } from 'react';

class AddAppointment extends Component {
    state = {
        patients: [], // List of patients
        doctorId: '', // Selected doctor ID
        appointmentDate: '', // Selected appointment date
        appointmentTime: '', // Selected appointment time
        selectedPatientId: '', // Selected patient ID
        status: 'Scheduled', // Default status of the appointment
        appointmentId: '', // Appointment ID (user-inputted)
        error: '', // Error message for form validation
        successMessage: '', // Success message for appointment scheduling
        patientDetails: null, // Details of the selected patient (null initially)
        isLoading: false, // Loading state for fetching patient details
    };

    // Fetch patients list when component mounts
    componentDidMount() {
        fetch('http://localhost:8080/api/patient/patientList') // Adjust the URL if needed
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    patients: data?.Data || [], // Default to an empty array if 'Data' is undefined
                });
            })
            .catch((error) => {
                this.setState({
                    error: 'Error fetching patient list',
                });
            });
    }

    // Handle form field change
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });

        // If the patient is selected, fetch their details from the server
        if (name === 'selectedPatientId' && value) {
            this.setState({ isLoading: true, patientDetails: null }); // Reset patient details and start loading
            fetch(`http://localhost:8080/api/patient/id/${value}`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ patientDetails: data || {}, isLoading: false });
                })
                .catch((error) => {
                    console.error('Error fetching patient details:', error);
                    this.setState({
                        error: 'Error fetching patient details',
                        patientDetails: null,
                        isLoading: false,
                    });
                });
        } else if (name === 'selectedPatientId' && !value) {
            // Clear patient details when no patient is selected
            this.setState({ patientDetails: null });
        }
    };

    // Handle form submission to add appointment
    handleSubmit = (e) => {
        e.preventDefault();

        const { appointmentId, selectedPatientId, doctorId, appointmentDate, appointmentTime, status, patientDetails } = this.state;

        // Validation: Check if all fields are filled
        if (!appointmentId || !selectedPatientId || !doctorId || !appointmentDate || !appointmentTime || !status) {
            this.setState({
                error: 'Please fill out all fields',
            });
            return;
        }

        // Create appointment object based on form data
        const appointmentData = {
            appointmentID: appointmentId,
            patient: {
                patientId: patientDetails?.patientId,
                patientName: patientDetails?.patientName,
                patientEmail: patientDetails?.patientEmail,
                patientPhone: patientDetails?.patientPhone,
                patientDob: patientDetails?.patientDob,
                employmentStatus: patientDetails?.employmentStatus,
                annualIncome: patientDetails?.annualIncome,
                createdAT: patientDetails?.createdAT,
                updatedAT: patientDetails?.updatedAT,
                address: {
                    addressID: patientDetails?.address?.addressID,
                    patientDoor: patientDetails?.address?.patientDoor,
                    patientStreet: patientDetails?.address?.patientStreet,
                    city: {
                        cityID: patientDetails?.address?.city?.cityID,
                        cityName: patientDetails?.address?.city?.cityName,
                    },
                    state: {
                        stateID: patientDetails?.address?.state?.stateID,
                        stateName: patientDetails?.address?.state?.stateName,
                    },
                    country: {
                        countryID: patientDetails?.address?.country?.countryID,
                        countryName: patientDetails?.address?.country?.countryName,
                    },
                },
                insurance: {
                    insuranceID: patientDetails?.insurance?.insuranceID,
                    insuranceProvider: patientDetails?.insurance?.insuranceProvider,
                    policyNumber: patientDetails?.insurance?.policyNumber,
                    coverageDetails: patientDetails?.insurance?.coverageDetails,
                },
            },
            doctor: doctorId,
            dateOfAppointment: appointmentDate,
            timeOfAppointment: appointmentTime,
            status: status,
        };
        

        // Send the appointment data to the server
        fetch('http://localhost:8080/Appointment/Schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    this.setState({
                        successMessage: `Appointment scheduled successfully with ID: ${data.appointmentID}`,
                        error: '', // Clear any previous error
                    });
                } else {
                    this.setState({
                        error: 'Failed to schedule appointment',
                        successMessage: '', // Clear any previous success message
                    });
                }
            })
            .catch((error) => {
                console.error('Error occurred while scheduling appointment:', error);
                this.setState({
                    error: 'Error occurred while scheduling appointment',
                    successMessage: '', // Clear any previous success message
                });
            });
    };

    render() {
        const {
            patients,
            selectedPatientId,
            doctorId,
            appointmentDate,
            appointmentTime,
            status,
            appointmentId,
            error,
            successMessage,
            patientDetails,
            isLoading,
        } = this.state;

        return (
            <div className="container mt-5">
                <h2>Add Appointment</h2>
                <form onSubmit={this.handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}

                    <div className="form-group">
                        <label htmlFor="appointmentId">Appointment ID:</label>
                        <input
                            type="text"
                            id="appointmentId"
                            name="appointmentId"
                            className="form-control"
                            value={appointmentId}
                            onChange={this.handleChange}
                            placeholder="Enter Appointment ID"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="patientId">Select Patient:</label>
                        <select
                            id="patientId"
                            name="selectedPatientId"
                            className="form-control"
                            value={selectedPatientId}
                            onChange={this.handleChange}
                        >
                            <option value="">Select a Patient</option>
                            {patients.map((patient) => (
                                <option key={patient.patientId} value={patient.patientId}>
                                    {patient.patientId} -
                                    {patient.patientName} - {patient.patientEmail} - {patient.patientPhone}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedPatientId && patientDetails && !isLoading && (
                        <div className="form-group">
                            <h4>Selected Patient Details</h4>
                            <p><strong>Name:</strong> {patientDetails.patientName}</p>
                            <p><strong>Email:</strong> {patientDetails.patientEmail}</p>
                            <p><strong>Phone:</strong> {patientDetails.patientPhone}</p>
                            <p><strong>Date of Birth:</strong> {patientDetails.patientDob}</p>
                            <p><strong>Income:</strong> {patientDetails.annualIncome}</p>
                            <p><strong>Employment Status:</strong> {patientDetails.employmentStatus}</p>
                            <p><strong>Created At:</strong> {patientDetails.createdAT}</p>
                            <p><strong>Updated At:</strong> {patientDetails.updatedAT}</p>

                            {/* Address details */}
                            <h5>Address Details:</h5>
                            <p><strong>Door:</strong> {patientDetails.address?.patientDoor}</p>
                            <p><strong>Street:</strong> {patientDetails.address?.patientStreet}</p>
                            <p><strong>City:</strong> {patientDetails.address?.city?.cityName}</p>
                            <p><strong>State:</strong> {patientDetails.address?.state?.stateName}</p>
                            <p><strong>Country:</strong> {patientDetails.address?.country?.countryName}</p>

                            {/* Insurance details */}
                            <h5>Insurance Details:</h5>
                            <p><strong>Provider:</strong> {patientDetails.insurance?.insuranceProvider}</p>
                            <p><strong>Policy Number:</strong> {patientDetails.insurance?.policyNumber}</p>
                            <p><strong>Coverage:</strong> {patientDetails.insurance?.coverageDetails}</p>
                        </div>
                    )}

                    {isLoading && <p>Loading patient details...</p>}

                    <div className="form-group">
                        <label htmlFor="doctorId">Select Doctor:</label>
                        <input
                            type="text"
                            id="doctorId"
                            name="doctorId"
                            className="form-control"
                            value={doctorId}
                            onChange={this.handleChange}
                            placeholder="Enter Doctor ID"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="appointmentDate">Appointment Date:</label>
                        <input
                            type="date"
                            id="appointmentDate"
                            name="appointmentDate"
                            className="form-control"
                            value={appointmentDate}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="appointmentTime">Appointment Time:</label>
                        <input
                            type="time"
                            id="appointmentTime"
                            name="appointmentTime"
                            className="form-control"
                            value={appointmentTime}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            className="form-control"
                            value={status}
                            onChange={this.handleChange}
                        >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Schedule Appointment</button>
                </form>
            </div>
        );
    }
}

export default AddAppointment;
