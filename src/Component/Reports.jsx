import React, { Component } from "react";

export default class Reports extends Component {
  state = {
    queryResults: null,
    currentQuery: "",
    error: null,
    loading: false,
  };

  fetchQueryResults = async (endpoint, queryName) => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:8080/api/patient/${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({
        queryResults: data,
        currentQuery: queryName,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  renderPatientDetails = (patient) => {
    return (
      <div key={patient.patientEmail} style={{
        marginBottom: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        transition: "transform 0.3s, box-shadow 0.3s",
        cursor: "pointer",
      }}
        onMouseEnter={(e) => e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"}
        onMouseLeave={(e) => e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"}
      >
        <h3 style={{ color: "#007BFF" }}>{patient.patientName}</h3>
        <p><strong>Email:</strong> {patient.patientEmail}</p>
        <p><strong>Phone:</strong> {patient.patientPhone}</p>
        <p><strong>DOB:</strong> {patient.patientDob}</p>
        <p><strong>Employment Status:</strong> {patient.employmentStatus}</p>
        <p><strong>Annual Income:</strong> ₹{patient.annualIncome}</p>

        <div style={{ marginTop: "15px" }}>
          <h4>Address</h4>
          <p><strong>Door:</strong> {patient.address.patientDoor}</p>
          <p><strong>Street:</strong> {patient.address.patientStreet}</p>
          <p><strong>City ID:</strong> {patient.address.cityID}</p>
          <p><strong>State ID:</strong> {patient.address.stateID}</p>
          <p><strong>Country ID:</strong> {patient.address.countryID}</p>
        </div>

        <div style={{ marginTop: "15px" }}>
          <h4>Insurance</h4>
          <p><strong>Insurance ID:</strong> {patient.insurance.insuranceID}</p>
          <p><strong>Provider:</strong> {patient.insurance.insuranceProvider}</p>
          <p><strong>Policy Number:</strong> {patient.insurance.policyNumber}</p>
          <p><strong>Coverage Details:</strong> {patient.insurance.coverageDetails}</p>
        </div>
      </div>
    );
  };


  renderOrderedPatients = (patient) => {
    return (

      <div
        key={patient.patientEmail}
        style={{
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >

        <h3
          style={{
            margin: "0 0 10px",
            fontSize: "22px",
            color: "#2c3e50",
            textAlign: "center"
          }}
        >
          {patient.patientName}
        </h3>

        <p
          style={{
            margin: "0",
            fontSize: "16px",
            color: "#34495e",
            textAlign: "center"
          }}
        >
          <strong style={{ color: "#007bff" }}>Email:</strong> {patient.patientEmail}
        </p>
      </div>

    );
  };

  renderEmployeeCount = (data) => {
    return (
      <div
        key={data.employmentStatus}
        style={{
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f4f8fb",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          margin: "20px auto"
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            color: "#2c3e50",
            marginBottom: "10px"
          }}
        >
          {data.employmentStatus}
        </h3>

        <p
          style={{
            fontSize: "18px",
            color: "#34495e",
            margin: "0"
          }}
        >
          <strong style={{ color: "#007bff" }}>Employee Count:</strong> {data.employeeCount}
        </p>
      </div>

    );
  };

  renderPatientCount = (count) => {
    return (
      <div style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h3 style={{
          margin: "0 0 10px",
          fontSize: "20px",
          color: "#333",
          textAlign: "center"
        }}>
          Total Number of Patients
        </h3>
        <p style={{
          margin: "0 0 10px",
          fontSize: "14px",
          color: "#666",
          textAlign: "center",
          fontStyle: "italic"
        }}>
          This section provides a quick overview of the total patients currently recorded in the system.
        </p>
        <p style={{
          margin: "0",
          fontSize: "16px",
          color: "#555",
          textAlign: "center"
        }}>
          <strong style={{ color: "#007bff" }}>Count:</strong> {count}
        </p>
      </div>

    );
  };

  render() {
    const { queryResults, currentQuery, error, loading } = this.state;

    const queryList = [
      { name: "Left Join Providers", endpoint: "LeftJoin" },
      { name: "Right Join Providers", endpoint: "RightJoin" },
      { name: "Inner Join Providers", endpoint: "InnerJoin" },
      { name: "Join Providers", endpoint: "Join" },
      { name: "Named Query 1", endpoint: "NameQuery01" },
      { name: "Named Query 2", endpoint: "NameQuery02" },
      { name: "Ordered Patients", endpoint: "PatientOrderBy" },
      { name: "Count Employees", endpoint: "CountEmployee" },
      { name: "Count", endpoint: "Count" },
    ];

    return (
      <div style={{ padding: "20px" }}>
        <h1>Custom Queries</h1>
        <div style={{ marginBottom: "20px" }}>
          {queryList.map((query, index) => (
            <button
              key={index}
              onClick={() => this.fetchQueryResults(query.endpoint, query.name)}
              style={{
                margin: "5px",
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {query.name}
            </button>
          ))}
        </div>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {queryResults && currentQuery === "Left Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p style={{ fontStyle: "italic", color: "#555" }}>
                The "Left Join Providers" query retrieves all patients and their associated providers,
                ensuring that even patients without an assigned provider are included in the results.
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}>
                {queryResults.Data && Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}

          {queryResults && currentQuery === "Right Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p style={{ fontStyle: "italic", color: "#555" }}>
                The "Right Join Providers" query retrieves all providers, including those without an associated patient.
                This ensures that you see every provider's details, whether or not they are linked to a patient.
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}>
                {queryResults.Data && Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}

          {queryResults && currentQuery === "Inner Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p style={{ fontStyle: "italic", color: "#555" }}>
                The "Inner Join Providers" query retrieves patients who have an associated provider. This query joins the patient and provider data to ensure only patients with matching provider information are shown.
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}>
                {queryResults.Data && Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}

          {queryResults && currentQuery === "Join Providers" && (
            <div>
              <h2>Results for: {currentQuery}</h2>
              <p style={{ fontStyle: "italic", color: "#555" }}>
                The "Join Providers" query retrieves patient data joined with provider information. This query helps to combine and display the relevant patient and provider details, giving a comprehensive view of the patient-provider relationships.
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}>
                {queryResults.Data && Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>
          )}

          {queryResults && currentQuery === "Named Query 1" && (
            <div
              style={{
                padding: "20px",
                border: "1px solid #dcdcdc",
                borderRadius: "10px",
                backgroundColor: "#fdfdfd",
                margin: "20px auto",
                maxWidth: "900px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: "bold",
                  color: "#34495e",
                  textAlign: "center",
                  marginBottom: "15px",
                  borderBottom: "2px solid #3498db",
                  paddingBottom: "10px",
                }}
              >
                Results for: {currentQuery}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#7f8c8d",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                This section displays the patients that match your search query. Below, you can find detailed information for each relevant entry.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  justifyContent: "center",
                }}
              >
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>

          )}
          {queryResults && currentQuery === "Named Query 2" && (
            <div
              style={{
                padding: "20px",
                border: "1px solid #dcdcdc",
                borderRadius: "10px",
                backgroundColor: "#f9f9f9",
                margin: "20px auto",
                maxWidth: "800px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  color: "#2c3e50",
                  textAlign: "center",
                  marginBottom: "20px",
                  borderBottom: "2px solid #007bff",
                  paddingBottom: "10px"
                }}
              >
                Results for: {currentQuery}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#7f8c8d",
                  textAlign: "center",
                  fontStyle: "italic",
                  marginBottom: "20px"
                }}
              >
                This section displays the search results based on your query, listing all relevant patient details.
              </p>
              <div>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderPatientDetails)}
              </div>
            </div>

          )}
          {/* Added handling for "Ordered Patients" query */}
          {queryResults && currentQuery === "Ordered Patients" && (
            <div>
              <h2>Ordered Patients</h2>
              <div>
                <p
                  style={{
                    margin: "0 0 5px",
                    fontSize: "14px",
                    color: "#7f8c8d",
                    textAlign: "center",
                    fontStyle: "italic"
                  }}
                >
                  This section displays detailed information about each patient, including their name and email address.
                </p>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderOrderedPatients)}
              </div>
            </div>
          )}
          {/* Added handling for "Count Employees" query */}
          {queryResults && currentQuery === "Count Employees" && (
            <div>
              <h2>Employee Count by Employment Status</h2>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#7f8c8d",
                    fontStyle: "italic",
                    marginBottom: "15px"
                  }}
                >
                  This section highlights the employment status category along with the total number of employees belonging to it.
                </p>
                {queryResults.Data &&
                  Array.isArray(queryResults.Data) &&
                  queryResults.Data.map(this.renderEmployeeCount)}
              </div>
            </div>
          )}
          {/* Added handling for "Count" query */}
          {queryResults && currentQuery === "Count" && (
            <div>
              <h2>Total Patient Count</h2>
              <div>
                {queryResults.Data && (
                  <div>{this.renderPatientCount(queryResults.Data)}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
