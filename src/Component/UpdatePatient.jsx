import React, { Component } from "react";
import "../CSS/FetchByID.css"; // Ensure the CSS file is imported correctly

export default class UpdatePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: "",
      patientData: null,
      updatedData: {
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        patientDob: "",
        employmentStatus: "",
        annualIncome: "",
        address: {
          patientDoor: "",
          patientStreet: "",
          cityID: "",
          stateID: "",
          countryID: "",
        },
        insurance: {
          insuranceID: "",
          insuranceProvider: "",
          coverageDetails: "",
          policyNumber: "",
        },
      },
      errors: {}, // To store validation error messages
      isPatientExist: false,
      loading: false,
      error: null,
      responseMessage: "",
      status: "",
    };
  }

  // Function to fetch patient by ID using Promise
  fetchPatientById = (id) => {
    this.setState({ loading: true, error: null, responseMessage: "", status: "" });

    fetch(`http://localhost:8080/api/patient/id/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Patient not found");
        }
        return response.json();
      })
      .then((data) => {
        const { Response, Status, Data } = data;

        this.setState({
          patientData: Data || this.state.patientData,
          responseMessage: Response,
          status: Status,
          loading: false,
          isPatientExist: true,
        });
        this.populateForm(Data);
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
          isPatientExist: false,
          patientData: null,
        });
      });
  };

  // Populate form with fetched data
  populateForm = (data) => {
    this.setState({
      updatedData: {
        patientName: data.patientName || "",
        patientEmail: data.patientEmail || "",
        patientPhone: data.patientPhone || "",
        patientDob: data.patientDob || "",
        employmentStatus: data.employmentStatus || "",
        annualIncome: data.annualIncome || "",
        address: {
          patientDoor: data.address?.patientDoor || "",
          patientStreet: data.address?.patientStreet || "",
          cityID: data.address?.cityID || "",
          stateID: data.address?.stateID || "",
          countryID: data.address?.countryID || "",
        },
        insurance: {
          insuranceID: data.insurance?.insuranceID || "",
          insuranceProvider: data.insurance?.insuranceProvider || "",
          coverageDetails: data.insurance?.coverageDetails || "",
          policyNumber: data.insurance?.policyNumber || "",
        },
      },
    });
  };

  // Validate input fields
  validateInputs = () => {
    const errors = {};
    const { updatedData } = this.state;

    // Name validation
    if (!updatedData.patientName) {
      errors.patientName = "Patient name is required";
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,6}$/;
    if (!updatedData.patientEmail) {
      errors.patientEmail = "Email is required";
    } else if (!emailPattern.test(updatedData.patientEmail)) {
      errors.patientEmail = "Invalid email format";
    }

    // Phone validation (basic)
    const phonePattern = /^[0-9]{10}$/;
    if (!updatedData.patientPhone) {
      errors.patientPhone = "Phone number is required";
    } else if (!phonePattern.test(updatedData.patientPhone)) {
      errors.patientPhone = "Phone number must be 10 digits";
    }

    // Annual income validation
    if (!updatedData.annualIncome || updatedData.annualIncome <= 0) {
      errors.annualIncome = "Annual income must be a positive number";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // Handle input field changes for both main fields and nested fields (address, insurance)
  handleInputChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split(".");

    if (subKey) {
      this.setState((prevState) => ({
        updatedData: {
          ...prevState.updatedData,
          [mainKey]: {
            ...prevState.updatedData[mainKey],
            [subKey]: value,
          },
        },
      }));
    } else {
      this.setState((prevState) => ({
        updatedData: {
          ...prevState.updatedData,
          [name]: value,
        },
      }));
    }
  };

  // Update patient details via API
  updatePatientDetails = (event) => {
    event.preventDefault(); // Prevent form submission

    // Validate inputs before updating
    if (this.validateInputs()) {
      const { updatedData, patientId } = this.state;

      fetch(`http://localhost:8080/api/patient/updatePatient/${patientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert("Patient updated successfully!");
          } else {
            alert("Error updating patient!");
          }
        })
        .catch((error) => {
          console.error("Error updating patient:", error);
          alert("An error occurred while updating the patient.");
        });
    }
  };

  // Handle patient ID change
  handleIdChange = (e) => {
    this.setState({ patientId: e.target.value });
  };

  // Handle form submission to fetch patient data
  handleSubmit = (event) => {
    event.preventDefault();
    const { patientId } = this.state;
    if (patientId) {
      this.fetchPatientById(patientId);
    } else {
      alert("Please enter a valid Patient ID");
    }
  };

  render() {
    const { isPatientExist, updatedData, loading, error, responseMessage, status, errors } = this.state;

    return (
      <div className="container">
        <h2>Update Patient Details</h2>

        {/* Input for Patient ID */}
        <div className="form-group">
          <label>Patient ID:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.patientId}
            onChange={this.handleIdChange}
            placeholder="Enter patient ID"
          />
          <button onClick={this.handleSubmit} className="btn btn-primary mt-2">
            Fetch Patient Details
          </button>
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {responseMessage && <p className="responseMessage"><strong>Response:</strong> {responseMessage}</p>}
        {status && <p className="responseMessage"><strong>Status:</strong> {status}</p>}

        {isPatientExist ? (
          <form onSubmit={this.updatePatientDetails} className="mt-4">
            <h3>Edit Patient Details</h3>

            {/* Basic Patient Details */}
            <div className="form-group">
              <label>Patient Name:</label>
              <input
                type="text"
                className="form-control"
                name="patientName"
                value={updatedData.patientName}
                onChange={this.handleInputChange}
                placeholder="Enter name"
                required
              />
              {errors.patientName && <p className="error-message">{errors.patientName}</p>}
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="patientEmail"
                value={updatedData.patientEmail}
                onChange={this.handleInputChange}
                placeholder="Enter email"
                required
              />
              {errors.patientEmail && <p className="error-message">{errors.patientEmail}</p>}
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                className="form-control"
                name="patientPhone"
                value={updatedData.patientPhone}
                onChange={this.handleInputChange}
                placeholder="Enter phone"
                required
              />
              {errors.patientPhone && <p className="error-message">{errors.patientPhone}</p>}
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                className="form-control"
                name="patientDob"
                value={updatedData.patientDob}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Employment Status:</label>
              <input
                type="text"
                className="form-control"
                name="employmentStatus"
                value={updatedData.employmentStatus}
                onChange={this.handleInputChange}
                placeholder="Enter employment status"
              />
            </div>

            <div className="form-group">
              <label>Annual Income:</label>
              <input
                type="number"
                className="form-control"
                name="annualIncome"
                value={updatedData.annualIncome}
                onChange={this.handleInputChange}
                placeholder="Enter annual income"
                required
              />
              {errors.annualIncome && <p className="error-message">{errors.annualIncome}</p>}
            </div>

            {/* Address Fields */}
            <h4>Address</h4>
            <div className="form-group">
              <label>Door Number:</label>
              <input
                type="text"
                className="form-control"
                name="address.patientDoor"
                value={updatedData.address.patientDoor}
                onChange={this.handleInputChange}
                placeholder="Enter door number"
              />
            </div>

            <div className="form-group">
              <label>Street:</label>
              <input
                type="text"
                className="form-control"
                name="address.patientStreet"
                value={updatedData.address.patientStreet}
                onChange={this.handleInputChange}
                placeholder="Enter street"
              />
            </div>

            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                className="form-control"
                name="address.cityID"
                value={updatedData.address.cityID}
                onChange={this.handleInputChange}
                placeholder="Enter city"
              />
            </div>

            <div className="form-group">
              <label>State:</label>
              <input
                type="text"
                className="form-control"
                name="address.stateID"
                value={updatedData.address.stateID}
                onChange={this.handleInputChange}
                placeholder="Enter state"
              />
            </div>

            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                className="form-control"
                name="address.countryID"
                value={updatedData.address.countryID}
                onChange={this.handleInputChange}
                placeholder="Enter country"
              />
            </div>

            {/* Insurance Fields */}
            <h4>Insurance</h4>
            <div className="form-group">
              <label>Insurance ID:</label>
              <input
                type="text"
                className="form-control"
                name="insurance.insuranceID"
                value={updatedData.insurance.insuranceID}
                onChange={this.handleInputChange}
                placeholder="Enter insurance ID"
              />
            </div>

            <div className="form-group">
              <label>Provider:</label>
              <input
                type="text"
                className="form-control"
                name="insurance.insuranceProvider"
                value={updatedData.insurance.insuranceProvider}
                onChange={this.handleInputChange}
                placeholder="Enter insurance provider"
              />
            </div>

            <div className="form-group">
              <label>Coverage Details:</label>
              <input
                type="text"
                className="form-control"
                name="insurance.coverageDetails"
                value={updatedData.insurance.coverageDetails}
                onChange={this.handleInputChange}
                placeholder="Enter coverage details"
              />
            </div>

            <div className="form-group">
              <label>Policy Number:</label>
              <input
                type="text"
                className="form-control"
                name="insurance.policyNumber"
                value={updatedData.insurance.policyNumber}
                onChange={this.handleInputChange}
                placeholder="Enter policy number"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Update Patient
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}
