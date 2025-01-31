import React, { Component } from "react";

class UpdatePatientByName extends Component {
  constructor(props) {
    super(props);
    this.updateFormRef = React.createRef(); // Ref for the update form
  }
  state = {
    name: "",
    patients: [],
    selectedPatient: null,
    updatedPatient: {
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      patientDob: "",
      employmentStatus: "", // Default employment status
      annualIncome: "", // Default annual income
      address: {
        patientDoor: "", // Default door number
        patientStreet: "", // Default street name
        cityID: "", // Default city ID
        stateID: "", // Default state ID
        countryID: "", // Default country ID
      },
      insurance: {
        insuranceID: "", // Default insurance ID
        insuranceProvider: "", // Default insurance provider
        policyNumber: "", // Default policy number
        coverageDetails: "",
      }
    },
    message: "",
    error: "",
    errors: {},
    cityOptions: [
      { id: 1, name: "Salem" },
      { id: 2, name: "Chennai" },
      { id: 3, name: "Bangalore" },
      { id: 4, name: "Mysore" },
      { id: 5, name: "Trivandrum" },
      { id: 6, name: "Kochi" },
      { id: 7, name: "Mumbai" },
      { id: 8, name: "Pune" },
      { id: 9, name: "Ahmedabad" },
      { id: 10, name: "Surat" },
    ],
    stateOptions: [
      { id: 1, name: "Tamil Nadu" },
      { id: 2, name: "Karnataka" },
      { id: 3, name: "Kerala" },
      { id: 4, name: "Maharashtra" },
      { id: 5, name: "Gujarat" },
    ],
    countryOptions: [
      { id: 1, name: "India" },
      { id: 2, name: "USA" },
      { id: 3, name: "UK" },
    ],
  };

  scrollToUpdateForm = () => {
    if (this.updateFormRef.current) {
      this.updateFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle dropdown changes
  handleDropdownChange = (event) => {
    const { name, value } = event.target;
  
    // Auto-select state and country based on city selection
    if (name === "cityID") {
      const selectedCity = this.state.cityOptions.find(
        (city) => city.id === parseInt(value, 10)
      );
  
      if (selectedCity) {
        const stateMap = {
          1: 1, // Salem -> Tamil Nadu
          2: 1, // Chennai -> Tamil Nadu
          3: 2, // Bangalore -> Karnataka
          4: 2, // Mysore -> Karnataka
          5: 3, // Trivandrum -> Kerala
          6: 3, // Kochi -> Kerala
          7: 4, // Mumbai -> Maharashtra
          8: 4, // Pune -> Maharashtra
          9: 5, // Ahmedabad -> Gujarat
          10: 5, // Surat -> Gujarat
        };
  
        const countryMap = {
          1: 1, // Tamil Nadu -> India
          2: 1, // Karnataka -> India
          3: 1, // Kerala -> India
          4: 1, // Maharashtra -> India
          5: 1, // Gujarat -> India
        };
  
        const stateID = stateMap[selectedCity.id];
        const countryID = countryMap[stateID];
  
        this.setState((prevState) => ({
          updatedPatient: {
            ...prevState.updatedPatient,
            address: {
              ...prevState.updatedPatient.address,
              cityID: value,
              stateID: stateID?.toString() || "",
              countryID: countryID?.toString() || "",
            },
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        updatedPatient: {
          ...prevState.updatedPatient,
          address: {
            ...prevState.updatedPatient.address,
            [name]: value,
          },
        },
      }));
    }
  };
  



  // Handle input changes
  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  validateFields = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex = /^[0-9]+$/;

    const { updatedPatient } = this.state; // Corrected line

    // Patient Name Validation
    if (!updatedPatient.patientName.trim()) {
      errors.patientName = "Patient Name is required.";
    } else if (!nameRegex.test(updatedPatient.patientName)) {
      errors.patientName = "Patient Name must contain only letters.";
    }

    // Handle patientPhone validation properly
    if (!updatedPatient.patientPhone) {
      errors.patientPhone = "Phone Number is required.";
    } else if (!phoneRegex.test(updatedPatient.patientPhone)) {
      errors.patientPhone = "Enter a valid 10-digit phone number.";
    }

    if (!updatedPatient.patientEmail || !updatedPatient.patientEmail.trim()) {
      errors.patientEmail = "Email is required.";
    } else if (!emailRegex.test(updatedPatient.patientEmail.trim())) {
      errors.patientEmail = "Enter a valid email address.";
    }


    // Date of Birth Validation
    if (!updatedPatient.patientDob) {
      errors.patientDob = "Date of Birth is required.";
    } else if (new Date(updatedPatient.patientDob) >= new Date()) {
      errors.patientDob = "Date of Birth cannot be in the future.";
    }

    // Employment Status Validation
    if (!updatedPatient.employmentStatus.trim()) {
      errors.employmentStatus = "Employment Status is required.";
    }

    // Annual Income Validation
    if (!updatedPatient.annualIncome) {
      errors.annualIncome = "Annual Income is required.";
    } else if (!numberRegex.test(updatedPatient.annualIncome)) {
      errors.annualIncome = "Annual Income must be a valid number.";
    } else if (parseFloat(updatedPatient.annualIncome) <= 0) {
      errors.annualIncome = "Annual Income must be greater than 0.";
    }

    // Address Validation
    if (!updatedPatient.address.patientDoor.trim()) {
      errors.patientDoor = "Door Number is required.";
    }
    if (!updatedPatient.address.patientStreet.trim()) {
      errors.patientStreet = "Street Name is required.";
    }
    if (!updatedPatient.address.cityID) {
      errors.cityID = "City is required.";
    }
    if (!updatedPatient.address.stateID) {
      errors.stateID = "State is required.";
    }
    if (!updatedPatient.address.countryID) {
      errors.countryID = "Country is required.";
    }

    // Insurance Validation
    if (!updatedPatient.insurance.insuranceID.trim()) {
      errors.insuranceID = "Insurance ID is required.";
    }
    if (!updatedPatient.insurance.insuranceProvider.trim()) {
      errors.insuranceProvider = "Insurance Provider is required.";
    }
    if (!updatedPatient.insurance.policyNumber.trim()) {
      errors.policyNumber = "Policy Number is required.";
    }
    if (!updatedPatient.insurance.coverageDetails.trim()) {
      errors.coverageDetails = "Coverage Details are required.";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };


  // Map ID to Name
  getNameById = (id, options) => {
    const option = options.find((opt) => opt.id === parseInt(id, 10));
    return option ? option.name : "";
  };

  // Fetch patients by name
  fetchPatientsByName = async () => {
    const { name } = this.state;

    // Validation: Check if name is not empty
    if (!name.trim()) {
      this.setState({ error: "Patient name is required.", message: "" });
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      this.setState({ error: "Please enter only letters." });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/patient/fetchByName/${name}`
      );

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.Data && Array.isArray(responseData.Data) && responseData.Data.length > 0) {
          this.setState({
            patients: responseData.Data,
            message: "Patients fetched successfully.",
            error: "",
          });
        } else {
          this.setState({
            patients: [],
            message: "No data found.",
            error: "",
          });
        }
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.message || "Failed to fetch patients.",
          patients: [],
          message: "",
        });
      }
    } catch (error) {
      this.setState({
        error: "An error occurred while fetching patients.",
        patients: [],
        message: "",
      });
    }
  };

  // Handle selecting a patient
  selectPatient = (patient) => {
    console.log("Selected Patient ID:", patient.patientID); // Log the ID
    this.setState({
      selectedPatient: patient,
      updatedPatient: { ...patient }, // Populate the form with current data
      error: "",
      message: ""
    });
    this.scrollToUpdateForm();
  };

  // Handle update request
  updatePatient = async () => {
    const { selectedPatient, updatedPatient } = this.state;

    if (!this.validateFields()) return;

    if (!selectedPatient) {
      this.setState({
        error: "Please select a patient to update.",
        message: "",
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/patient/updatePatient/${selectedPatient.patientID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPatient),
        }
      );

      if (response.ok) {
        this.setState({
          message: `Patient  ${selectedPatient.patientName} updated successfully.`,
          error: "",
        });
      } else {
        const errorData = await response.json();
        this.setState({
          error: errorData.message || "Failed to update patient.",
          message: "",
        });
      }
    } catch (error) {
      this.setState({
        error: "An error occurred while updating the patient.",
        message: "",
      });
    }
    console.log("Valid data submitted");
  };

  // Handle field changes for updating patient
  handleFieldChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      updatedPatient: {
        ...prevState.updatedPatient,
        [name]: value,  // Ensure this is correctly updating the right field
      },
    }));
  };


  render() {
    const { name, patients, selectedPatient, updatedPatient, cityOptions, stateOptions, countryOptions, message, errors, error } = this.state;

    return (
      <div className="container mt-4">
        <h2>Update Patient by Name</h2>
        <div className="form-group">
          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={this.handleChange}
          />
          
        </div>
        <button
          className="button-26 mt-2"
          onClick={this.fetchPatientsByName}

        >
          Fetch Patients
        </button>


        {patients.length > 0 && (
          <div className="mt-4">
            <h4>Select a Patient to Update</h4>
            <div className="row">
              {patients.map((patient) => (
                <div className="col-md-4" key={patient.patientID}>
                  <div
                    className={`card ${selectedPatient && selectedPatient.patientID === patient.patientID ? "border-dark" : ""}`}
                    onClick={() => this.selectPatient(patient)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{patient.patientName}</h5>
                      <p className="card-text">Email: {patient.patientEmail}</p>
                      <p className="card-text">Phone: {patient.patientPhone}</p>
                      <p className="card-text">DOB: {patient.patientDob}</p>
                      <p className="card-text">
                        Address: {patient.address.patientStreet},{" "}
                        {patient.address.patientDoor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedPatient && (
          <div className="mt-4" ref={this.updateFormRef}>
            <h4>Update Patient Details</h4>
            <div className="form-group">
              <h4> Patient Details</h4>
              <label htmlFor="patientName">Name:</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-control"
                value={updatedPatient.patientName}
                onChange={this.handleFieldChange}
              />
              {errors.patientName && <p className="text-danger">{errors.patientName}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientEmail">Email:</label>
              <input
                type="email"
                id="patientEmail"
                name="patientEmail"
                className="form-control"
                value={updatedPatient.patientEmail}
                onChange={this.handleFieldChange}
              />
              {errors.patientEmail && <p className="text-danger">{errors.patientEmail}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientPhone">Phone:</label>
              <input
                type="text"
                id="patientPhone"
                name="patientPhone"
                className="form-control"
                value={updatedPatient.patientPhone}
                onChange={this.handleFieldChange}
              />
              {errors.patientPhone && <p className="text-danger">{errors.patientPhone}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">DOB:</label>
              <input
                type="date"
                id="patientDob"
                name="patientDob"
                className="form-control"
                value={updatedPatient.patientDob}
                onChange={this.handleFieldChange}
              />
              {errors.patientDob && <p className="text-danger">{errors.patientDob}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientEmploymentStatus">Employment Status:</label>
              <input
                type="text"
                id="employmentStatus"
                name="employmentStatus"
                className="form-control"
                value={updatedPatient.employmentStatus}
                onChange={this.handleFieldChange}
              />
              {errors.employmentStatus && <p className="text-danger">{errors.employmentStatus}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Annual Income:</label>
              <input
                type="number"
                id="annualIncome"
                name="annualIncome"
                className="form-control"
                value={updatedPatient.annualIncome}
                onChange={this.handleFieldChange}
              />
              {errors.annualIncome && <p className="text-danger">{errors.annualIncome}</p>}
            </div>
            <h4> Address Details</h4>
            <div className="form-group">
              <label htmlFor="patientDob">Door No:</label>
              <input
                type="text"
                id="patientDoor"
                name="address"
                className="form-control"
                value={updatedPatient.address.patientDoor}
                onChange={this.handleFieldChange}
              />
              {errors.patientDoor && <p className="text-danger">{errors.patientDoor}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Street :</label>
              <input
                type="text"
                id="patientStreet"
                name="address"
                className="form-control"
                value={updatedPatient.address.patientStreet}
                onChange={this.handleFieldChange}
              />
              {errors.patientStreet && <p className="text-danger">{errors.patientStreet}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">City:</label>
              <select
                id="cityID"
                name="cityID"
                className="form-control p-1"
                value={updatedPatient.address.cityID}
                onChange={this.handleDropdownChange}
              >
                <option value="">Select City</option>
                {cityOptions.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.cityID && <p className="text-danger">{errors.cityID}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">State:</label>
              <select
                id="stateID"
                name="stateID"
                className="form-control p-1"
                value={updatedPatient.address.stateID}
                onChange={this.handleDropdownChange}
              >
                <option value="">Select State</option>
                {stateOptions.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.stateID && <p className="text-danger">{errors.stateID}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Country:</label>
              <select
                id="countryID"
                name="countryID"
                className="form-control p-1"
                value={updatedPatient.address.countryID}
                onChange={this.handleDropdownChange}
              >
                <option value="">Select Country</option>
                {countryOptions.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.countryID && <p className="text-danger">{errors.countryID}</p>}
            </div>
            <h4> Insurance Details</h4>
            <div className="form-group">
              <label htmlFor="patientDob">Insurance ID:</label>
              <input
                type="text"
                id="insuranceID"
                name="insurance"
                className="form-control"
                value={updatedPatient.insurance.insuranceID}
                onChange={this.handleFieldChange}
              />
              {errors.insuranceID && <p className="text-danger">{errors.insuranceID}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Insurance Provider:</label>
              <input
                type="text"
                id="insuranceProvider"
                name="insurance"
                className="form-control"
                value={updatedPatient.insurance.insuranceProvider}
                onChange={this.handleFieldChange}
              />
              {errors.insuranceProvider && <p className="text-danger">{errors.insuranceProvider}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Policy Number:</label>
              <input
                type="text"
                id="policyNumber"
                name="insurance"
                className="form-control"
                value={updatedPatient.insurance.policyNumber}
                onChange={this.handleFieldChange}
              />
              {errors.policyNumber && <p className="text-danger">{errors.policyNumber}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="patientDob">Coverage Details:</label>
              <input
                type="text"
                id="coverageDetails"
                name="insurance"
                className="form-control"
                value={updatedPatient.insurance.coverageDetails}
                onChange={this.handleFieldChange}
              />
              {errors.coverageDetails && <p className="text-danger">{errors.coverageDetails}</p>}
            </div>
            <button className="btn  mt-2" onClick={this.updatePatient} style={{
              backgroundColor: "#1A1A1A",
              color: "#fff"
            }}>
              Update Patient
            </button>
          </div>
        )}

        {message && <p className="text-success mt-3">{message}</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
      </div>
    );
  }
}

export default UpdatePatientByName;