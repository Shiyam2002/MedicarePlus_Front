import React, { Component } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/AddPatient.css";

export default class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      patientDob: "",
      employmentStatus: "",
      annualIncome: "",
      patientDoor: "",
      patientStreet: "",
      cityID: "",
      stateID: "",
      countryID: "",
      insuranceID: "",
      insuranceProvider: "",
      coverageDetails: "",
      policyNumber: "",
      errors: {},
      successMessage: "",
    };
  }

  // Validation Methods
  validateFields = () => {
    const errors = {};

    //regex
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex = /^[0-9]+$/;

    //Patient name validations
    if (!this.state.patientName.trim())
      errors.patientName = "Patient Name is Required";
    if(!nameRegex.test(this.state.patientName))
      errors.patientName = "Patient Name must contain only letters.";

    //Patient Phone Number Validations
    if(!this.state.patientPhone.trim())
      errors.patientPhone = "Phone Number is Required";
    if (!phoneRegex.test(this.state.patientPhone))
      errors.patientPhone = "Enter a valid 10-digit phone number";

    //Patient Email Validations
    if(!emailRegex.test(this.state.patientEmail))
      errors.patientEmail = "Enter a valid email address";
    if (!this.state.patientEmail.trim()) {
      errors.patientEmail = "Email is Required";
    }

    //DoB Validations
    if(new Date(this.state.patientDob) >= new Date())
      errors.patientDob = "DoB can't be in Future Dates"
    if (!this.state.patientDob)
      errors.patientDob = "Date of Birth is required.";

    //Employment Status Validation
    if (!this.state.employmentStatus.trim())
      errors.employmentStatus = "Employment Status is required.";

    //Annual Income Validations
    if(parseFloat(this.state.annualIncome) <= 0)
      errors.annualIncome = "Annual Income must be a valid number greater than 0";
    if (!numberRegex.test(this.state.annualIncome) )
      errors.annualIncome = "Annual Income is required";

    // Address Validations
    if (!this.state.patientDoor.trim())
      errors.patientDoor = "Door Number is required.";
    if (!this.state.patientStreet.trim())
      errors.patientStreet = "Street Name is required.";
    if (!this.state.cityID)
      errors.cityID = "City is required.";
    if (!this.state.stateID)
      errors.stateID = "State is required.";
    if (!this.state.countryID)
      errors.countryID = "Country is required.";

    //Insurance Validations
    if (!this.state.insuranceID.trim())
      errors.insuranceID = "Insurance ID is required.";
    if (!this.state.insuranceProvider.trim())
      errors.insuranceProvider = "Insurance Provider is required.";
    if (!this.state.coverageDetails.trim())
      errors.coverageDetails = "Coverage Details are required.";
    if (!this.state.policyNumber.trim())
      errors.policyNumber = "Policy Number is required.";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: "" },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.validateFields()) {
      console.log(this.state.errors);
      return;
    }

    const requestData = {
      patientName: this.state.patientName,
      patientEmail: this.state.patientEmail,
      patientPhone: Number(this.state.patientPhone),
      patientDob: this.state.patientDob,
      employmentStatus: this.state.employmentStatus,
      annualIncome: Number(this.state.annualIncome),
      address: {
        patientDoor: this.state.patientDoor,
        patientStreet: this.state.patientStreet,
        cityID: Number(this.state.cityID),
        stateID: Number(this.state.stateID),
        countryID: Number(this.state.countryID),
      },
      insurance: {
        insuranceID: this.state.insuranceID,
        insuranceProvider: this.state.insuranceProvider,
        coverageDetails: this.state.coverageDetails,
        policyNumber: this.state.policyNumber,
      },
    };

    fetch("http://localhost:8080/api/patient/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((result) => {
       // alert("Patient details saved successfully!");
        console.log(result);
        this.setState({
          patientName: "",
          patientPhone: "",
          patientEmail: "",
          patientDob: "",
          employmentStatus: "",
          annualIncome: "",
          patientDoor: "",
          patientStreet: "",
          cityID: "",
          stateID: "",
          countryID: "",
          insuranceID: "",
          insuranceProvider: "",
          coverageDetails: "",
          policyNumber: "",
          errors: {},
          successMessage: "Patient details saved successfully!", // Set success message
        });
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        console.error("Error:", error);
      });
  };

  render() {
    const { errors,successMessage } = this.state;

    return (
      <Container className="mt-5">
        <h2 className="text-center mb-4">Add Patient</h2>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="patientName">
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="patientName"
                  placeholder="e.g., Ramya"
                  value={this.state.patientName}
                  onChange={this.handleChange}
                  isInvalid={!!errors.patientName}
                />
                <Form.Control.Feedback type="invalid">{errors.patientName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="patientPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="patientPhone"
                  placeholder="e.g., 9876543210"
                  value={this.state.patientPhone}
                  onChange={this.handleChange}
                  isInvalid={!!errors.patientPhone}
                />
                <Form.Control.Feedback type="invalid">{errors.patientPhone}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="patientEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  name="patientEmail"
                  placeholder="e.g., ramya@example.com"
                  value={this.state.patientEmail}
                  onChange={this.handleChange}
                  isInvalid={!!errors.patientEmail}
                />
                <Form.Control.Feedback type="invalid">{errors.patientEmail}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="patientDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="patientDob"
                  value={this.state.patientDob}
                  onChange={this.handleChange}
                  isInvalid={!!errors.patientDob}
                />
                <Form.Control.Feedback type="invalid">{errors.patientDob}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Employment Fields */}
          <Row>
            <Col md={6}>
              <Form.Group controlId="employmentStatus">
                <Form.Label>Employment Status</Form.Label>
                <Form.Control
                  type="text"
                  name="employmentStatus"
                  placeholder="e.g., Employed, Unemployed"
                  value={this.state.employmentStatus}
                  onChange={this.handleChange}
                  isInvalid={!!errors.employmentStatus}
                />
                <Form.Control.Feedback type="invalid">{errors.employmentStatus}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="annualIncome">
                <Form.Label>Annual Income</Form.Label>
                <Form.Control
                  type="number"
                  name="annualIncome"
                  placeholder="e.g., 500000"
                  value={this.state.annualIncome}
                  onChange={this.handleChange}
                  isInvalid={!!errors.annualIncome}
                />
                <Form.Control.Feedback type="invalid">{errors.annualIncome}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Address Fields */}
          <h4 className="mt-4">Address Details</h4>
          <Row>
            <Col md={4}>
              <Form.Group controlId="patientDoor">
                <Form.Label>Door Number</Form.Label>
                <Form.Control
                  type="text"
                  name="patientDoor"
                  placeholder="e.g., 12A"
                  value={this.state.patientDoor}
                  onChange={this.handleChange}
                  isInvalid={!!errors.patientDoor}
                />
                <Form.Control.Feedback type="invalid">{errors.patientDoor}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="patientStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="patientStreet"
                  placeholder="e.g., Baker Street"
                  value={this.state.patientStreet}
                  onChange={this.handleChange}
                  isInvalid={!!errors.patientStreet}
                />
                <Form.Control.Feedback type="invalid">{errors.patientStreet}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="cityID">
                <Form.Label>City </Form.Label>
                <Form.Control
                  as="select"
                  type="number"
                  name="cityID"
                  placeholder="e.g., 101"
                  className="p-2"
                  value={this.state.cityID}
                  onChange={this.handleChange}
                  isInvalid={!!errors.cityID}>
                  <option value="">Select City</option>
                  <option value="1">Salem</option>
                  <option value="2">Chennai</option>
                  <option value="3">Bangalore</option>
                  <option value="4">Mysore</option>
                  <option value="5">Trivandrum</option>
                  <option value="6">Kochi</option>
                  <option value="7">Mumbai</option>
                  <option value="8">Pune</option>
                  <option value="9">Ahmedabad</option>
                  <option value="10">Surat</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.cityID}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="stateID">
                <Form.Label>State </Form.Label>
                <Form.Control
                  as="select"
                  type="number"
                  name="stateID"
                  placeholder="e.g., 201"
                  className="p-1"
                  value={this.state.stateID}
                  onChange={this.handleChange}
                  isInvalid={!!errors.stateID}>
                  <option value="">Select State</option>
                  <option value="1">Tamil Nadu</option>
                  <option value="2">Karnataka</option>
                  <option value="3">Kerala</option>
                  <option value="4">Maharashtra</option>
                  <option value="5">Gujarat</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.stateID}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="countryID">
                <Form.Label>Country </Form.Label>
                <Form.Control
                  as="select"
                  type="number"
                  className="p-1"
                  name="countryID"
                  placeholder="e.g., 301"
                  value={this.state.countryID}
                  onChange={this.handleChange}
                  isInvalid={!!errors.countryID}>
                  <option value="">Select Country</option>
                  <option value="1">India</option>
                  <option value="2">USA</option>
                  <option value="3">UK</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.countryID}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Insurance Fields */}
          <h4 className="mt-4">Insurance Details</h4>
          <Row>
            <Col md={4}>
              <Form.Group controlId="insuranceID">
                <Form.Label>Insurance ID</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceID"
                  placeholder="e.g., INS123"
                  value={this.state.insuranceID}
                  onChange={this.handleChange}
                  isInvalid={!!errors.insuranceID}
                />
                <Form.Control.Feedback type="invalid">{errors.insuranceID}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="insuranceProvider">
                <Form.Label>Insurance Provider</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceProvider"
                  placeholder="e.g., Star Health"
                  value={this.state.insuranceProvider}
                  onChange={this.handleChange}
                  isInvalid={!!errors.insuranceProvider}
                />
                <Form.Control.Feedback type="invalid">{errors.insuranceProvider}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="policyNumber">
                <Form.Label>Policy Number</Form.Label>
                <Form.Control
                  type="text"
                  name="policyNumber"
                  placeholder="e.g., POL456"
                  value={this.state.policyNumber}
                  onChange={this.handleChange}
                  isInvalid={!!errors.policyNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.policyNumber}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group controlId="coverageDetails">
                <Form.Label>Coverage Details</Form.Label>
                <Form.Control
                  type="text"
                  name="coverageDetails"
                  placeholder="e.g., Comprehensive Plan"
                  value={this.state.coverageDetails}
                  onChange={this.handleChange}
                  isInvalid={!!errors.coverageDetails}
                />
                <Form.Control.Feedback type="invalid">{errors.coverageDetails}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          
          <Button  type="submit" className="button-28 mt-4">
          Submit
          </Button>
          {/* Display success message */}
        {successMessage && (
          <div className="alert alert-success text-center pt-4" role="alert">
            {successMessage}
          </div>
        )}
        </Form>
      </Container>
    );
  }
}
