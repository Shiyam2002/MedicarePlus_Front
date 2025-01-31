import React, { Component } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddPatient.css";

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
      // City, state, and country mappings
      cityMap: {
        1: "Salem",
        2: "Chennai",
        3: "Bangalore",
        4: "Mysore",
        5: "Trivandrum",
        6: "Kochi",
        7: "Mumbai",
        8: "Pune",
        9: "Ahmedabad",
        10: "Surat",
      },

      stateMap: {
        1: "Tamil Nadu",
        2: "Karnataka",
        3: "Kerala",
        4: "Maharashtra",
        5: "Gujarat",
      },

      countryMap: {
        1: "India",
        2: "USA",
        3: "UK",
      },

      // City-to-state and state-to-country mappings
      cityStateCountryMap: {
        1: { stateID: 1, countryID: 1 },
        2: { stateID: 1, countryID: 1 },
        3: { stateID: 2, countryID: 1 },
        4: { stateID: 2, countryID: 1 },
        5: { stateID: 3, countryID: 1 },
        6: { stateID: 3, countryID: 1 },
        7: { stateID: 4, countryID: 1 },
        8: { stateID: 4, countryID: 1 },
        9: { stateID: 5, countryID: 1 },
        10: { stateID: 5, countryID: 1 },
      },

    };
  }



  // Validation Methods
  validateFields = () => {
    const errors = {};

    //regex
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex01 = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    //Patient name validations
    if (!this.state.patientName.trim())
      errors.patientName = "Patient Name is Required";
    else if (!nameRegex.test(this.state.patientName))
      errors.patientName = "Patient Name must contain only letters.";

    //Patient Phone Number Validations
    if (!this.state.patientPhone.trim())
      errors.patientPhone = "Phone Number is Required";
    else if (!phoneRegex01.test(this.state.patientPhone))
      errors.patientPhone = `Enter a valid 10-digit phone number. total number(s) ${this.state.patientPhone.length}`;
    else if (!['6', '7', '8', '9'].includes(this.state.patientPhone.charAt(0))) {
      errors.patientPhone = `Phone number doesn't start with  ${this.state.patientPhone.charAt(0)}.`;
    }

    //Patient Email Validations
    if (!emailRegex.test(this.state.patientEmail))
      errors.patientEmail = "Enter a valid email address";
    if (!this.state.patientEmail.trim()) {
      errors.patientEmail = "Email is Required";
    }

    //DoB Validations
    if (!this.state.patientDob) {
      errors.patientDob = "Date of Birth is required.";
    } else {
      // Check if Date of Birth is in the future
      const dobDate = new Date(this.state.patientDob);
      const today = new Date();
      if (dobDate > today) {
        errors.patientDob = "Date of Birth can't be in the future.";
      }

      // Check if the person is at least 18 years old
      //   const age = today.getFullYear() - dobDate.getFullYear();
      //   const isBeforeBirthdayThisYear = today.getMonth() < dobDate.getMonth() ||
      //     (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate());
      //   if (age < 18 || (age === 18 && isBeforeBirthdayThisYear)) {
      //     errors.patientDob = "You must be at least 18 years old.";
      //   }
    }

    //Employment Status Validation
    if (!this.state.employmentStatus.trim())
      errors.employmentStatus = "Employment Status is required.";
    else if (!nameRegex.test(this.state.employmentStatus))
      errors.employmentStatus = "Enter only letters"

    //Annual Income Validations
    const annualIncome = parseInt(this.state.annualIncome, 10);

    if (!this.state.annualIncome.trim())
      errors.annualIncome = "Annual Income is required";
    // Validate if it's a number and greater than 0
    else if (isNaN(annualIncome) || annualIncome <= 0) {
      errors.annualIncome = "Annual Income must be a valid number greater than 0";
    }
    else if (!(this.state.annualIncome > 9999)) {
      errors.annualIncome = "Annual Income must be have more 9999";
    }


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

    if (name === "cityID") {
      const selectedMapping = this.state.cityStateCountryMap[value];
      if (selectedMapping) {
        this.setState({
          stateID: selectedMapping.stateID,
          countryID: selectedMapping.countryID,
        });
      } else {
        this.setState({ stateID: "", countryID: "" });
      }
    }
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
    const { errors, successMessage } = this.state;

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
                  type="number"
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
                  as="select"
                  name="employmentStatus"
                  value={this.state.employmentStatus}
                  onChange={this.handleChange}
                  isInvalid={!!errors.employmentStatus}
                  className="p-1"
                  placeholder="Employment Status"
                  style={{color: "#aaa"}}
                >
                  <option value="" style={{color: "#000"}}>Employment Status</option>
                  <option value="Employed" style={{color: "#000"}}>Employed</option>
                  <option value="Unemployed" style={{color: "#000"}}>Unemployed</option>
                  <option value="Self-Employed" style={{color: "#000"}}>Self-Employed</option>
                </Form.Control>
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
                <Form.Label>City</Form.Label>
                <Form.Control
                  as="select"
                  name="cityID"
                  value={this.state.cityID}
                  onChange={this.handleChange}
                  isInvalid={!!errors.cityID}
                  className="p-1"
                  style={{color: "#aaa"}}
                >
                  <option value="">Select City</option>
                  {Object.entries(this.state.cityMap).map(([id, name]) => (
                    <option key={id} value={id} style={{color: "#000"}}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.cityID}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group controlId="stateID">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" name="stateID" className="p-2" value={this.state.stateID} style={{color: "#aaa"}} isInvalid={!!errors.stateID} >
                  <option value="">Select State</option>
                  {Object.entries(this.state.stateMap).map(([id, name]) => (
                    <option key={id} value={id} style={{color: "#000"}}>
                      {name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.stateID}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="countryID">
                <Form.Label>Country</Form.Label>
                <Form.Control as="select" name="countryID" className="p-2" style={{color: "#aaa"}} value={this.state.countryID} isInvalid={!!errors.countryID} >
                  <option value="">Select Country</option>
                  {Object.entries(this.state.countryMap).map(([id, name]) => (
                    <option key={id} value={id} style={{color: "#000"}}>
                      {name}
                    </option>
                  ))}
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
                  as="select"
                  name="insuranceProvider"
                  value={this.state.insuranceProvider}
                  onChange={this.handleChange}
                  isInvalid={!!errors.insuranceProvider}
                  className="p-1"
                  style={{color: "#aaa"}}
                >
                  <option value="" style={{color: "#000"}}>Insurance Provider</option>
                  <option value="LIC" style={{color: "#000"}}>LIC</option>
                  <option value="Star Health" style={{color: "#000"}}>Star Health</option>
                  <option value="HDFC Ergo" style={{color: "#000"}}>HDFC Ergo</option>
                  <option value="ICICI Lombard" style={{color: "#000"}}>ICICI Lombard</option>
                </Form.Control>
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

          <Button variant="primary" type="submit" className="button-28 mt-4">
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
