import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class FetchAllPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      loading: false,
      error: null,
    };
  }

  fetchAllPatients = () => {
    this.setState({ loading: true, error: null });

    const fetchPatientsPromise = new Promise((resolve, reject) => {
      fetch("http://localhost:8080/api/patient/patientList")
        .then((response) => {
          if (!response.ok) {
            reject("Failed to fetch patients or API error");
          }
          return response.json();
        })
        .then((data) => {
          if (data?.Data) {
            resolve(data.Data);
          } else {
            reject("Invalid API response structure");
          }
        })
        .catch((error) => reject(error.message));
    });

    fetchPatientsPromise
      .then((patients) => {
        this.setState({
          patients,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error,
        });
      });
  };

  componentDidMount() {
    this.fetchAllPatients();
  }

  render() {
    const { patients, loading, error } = this.state;

    if (loading) {
      return <div className="text-center mt-5">Loading patients...</div>;
    }

    if (error) {
      return <div className="text-danger text-center mt-5">Error: {error}</div>;
    }

    return (
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Patients</h2>
        <div className="row">
          {patients.map((patient, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card shadow-sm">
                <div className="card-header">
                  <h5
                    className="mb-0 text-primary"
                    data-bs-toggle="collapse"
                    data-bs-target={`#patientDetails${index}`}
                    aria-expanded="false"
                    aria-controls={`patientDetails${index}`}
                    style={{ cursor: "pointer" }}
                  >
                    {patient.patientName}
                  </h5>
                </div>
                <div
                  id={`patientDetails${index}`}
                  className="collapse"
                  data-bs-parent="#accordion"
                >
                  <div className="card-body">
                    <p>
                      <strong>Email:</strong> {patient.patientEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {patient.patientPhone}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {patient.patientDob}
                    </p>
                    <p>
                      <strong>Employment Status:</strong>{" "}
                      {patient.employmentStatus}
                    </p>
                    <p>
                      <strong>Annual Income:</strong> {patient.annualIncome}
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      {`${patient.address.patientDoor}, ${patient.address.patientStreet}, ${patient.address.cityID}, ${patient.address.stateID}, ${patient.address.countryID}`}
                    </p>
                    <p>
                      <strong>Insurance:</strong>
                      <ul>
                        <li>ID: {patient.insurance.insuranceID}</li>
                        <li>Provider: {patient.insurance.insuranceProvider}</li>
                        <li>Policy: {patient.insurance.policyNumber}</li>
                        <li>Coverage: {patient.insurance.coverageDetails}</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
