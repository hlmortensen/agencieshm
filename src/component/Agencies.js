import React, { useState, useEffect } from "react";
import { Table, Segment, Button, Select, Icon, Form, Divider } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

// mock list of case data with multiple hospitals contributing to same case, multiple cases 
const caseDataMock = [
    {
      "id": "c544a6122-a777-4a44-99f2-dfc11aa9f017",
      "caseNumber": 2,
      "agencyName": "John Doe Medical Office",
      "caseDescription": "case information abcd"
    },
    {
      "id": "c544a633-a777-4a44-99f2-dfc11aa9f017",
      "caseNumber": 2,
      "agencyName": "Linda Hospital",
      "caseDescription": "case information xyz"
    },
    {
      "id": "c544a614-a777-4a44-99f2-dfc11aa9f017",
      "caseNumber": 2,
      "agencyName": "General Hospital",
      "caseDescription": "case information wxy"
    },
    {
      "id": "c544a655-a777-4a44-99f2-dfc11aa9f017",
      "caseNumber": 1,
      "agencyName": "Linda Hospital",
      "caseDescription": "case information cdf"
    },
    {
      "id": "c544a699-a777-4a44-99f2-dfc11aa9f017",
      "caseNumber": 3,
      "agencyName": "General Hospital",
      "caseDescription": "case information ghi"
    },
    {
      "id": "1234c544a677-a777-4a44-99f2-dfc11aa9f0175006",
      "caseNumber": 3,
      "agencyName": "John Doe Medical Office",
      "caseDescription": "case information jkl"
    },
  
  ]

  

const Agencies = () => {

    const [ caseData, setCaseData ] = useState(caseDataMock);
    const [ filteredCaseData, setFilteredCaseData ] = useState(null);
    const [ selectedCaseNumber, setSelectedCaseNumber ] = useState(0);

    const [ caseNumber, setCaseNumber ] = useState(null);
    const [ agencyName, setAgencyName ] = useState("");
    const [ caseDescription, setCaseDescription ] = useState("");

    const resetFilter = () => {
      setFilteredCaseData(null);
      setSelectedCaseNumber(0);
    }

    const deleteCase = (caseId) => {
      if (!caseData) return;
      resetFilter();
      let newCaseData = caseData?.filter((caseItem) => caseItem.id !== caseId);
      setCaseData(newCaseData);
    };

    const addNewCase = () => {
      if (!caseData) return;
      resetFilter();
      let newId = uuidv4();
      const newCase = {
        "id": newId,
        "caseNumber": caseNumber,
        "agencyName": agencyName,
        "caseDescription": caseDescription
      }
      let newCaseData = [...caseData, newCase];
      setCaseData(newCaseData);
    }
    
    let caseNumberOptions = [
      { key: 'cs0', value: 0, text: "All Cases" },
      { key: 'cs1', value: 1, text: "1" },
      { key: 'cs2', value: 2, text: "2" },
      { key: 'cs3', value: 3, text: "3" },
      { key: 'cs4', value: 4, text: "4" },
      { key: 'cs5', value: 5, text: "5" },
      { key: 'cs6', value: 6, text: "6" },
      { key: 'cs7', value: 7, text: "7" }
    ]

    let displayCaseData = filteredCaseData ? filteredCaseData : caseData;


    return (
        <Segment basic padded="very" id="agencies" className="section">
            <div className="container">
              <h2 className="headline">Case Overview List</h2>

              <Segment>
                <Form onSubmit={() => addNewCase()}>
                  <h4>Add a case</h4>
                  <Form.Group widths="equal">
                    <Form.Input fluid 
                      label="Agency Name" 
                      placeholder="Agency Name" 
                      onChange={(e, t) => setAgencyName(t.value)} 
                      name="agencyName"
                      value={agencyName}
                    />
                    <Form.Input fluid 
                      label="Case Description" 
                      placeholder="Case Description" 
                      onChange={(e, t) => setCaseDescription(t.value)}  
                      name="caseDescription"
                      value={caseDescription}
                    />
                  </Form.Group>
                  <Form.Select 
                    label="Case Number" 
                    options={caseNumberOptions} 
                    placeholder="Case Number" 
                    onChange={(e, t) => setCaseNumber(t.value)}
                    name="caseNumber"
                    value={caseNumber}
                  />
                  <Button primary><Icon name="add" />Add Case</Button>
                </Form>
              </Segment>
              
              <Divider hidden />

              <h3>Case Summary</h3>

              <p>Filter by Case Number: &nbsp;
                <Select 
                  placeholder="Select a case number" 
                  options={caseNumberOptions}
                  value={selectedCaseNumber}
                  onChange={(e, target) => {
                    if (!caseData) return;
                    setSelectedCaseNumber(target.value);
                    if (target.value !== 0){
                      let newCaseData = caseData?.filter((caseItem) => caseItem.caseNumber === target.value);
                      setFilteredCaseData(newCaseData);
                      return;
                    } 
                    setFilteredCaseData(caseData);
                  }}
                />
              </p>
              <p>Selected case number: {selectedCaseNumber ? selectedCaseNumber : "All Cases"}</p>


              <div className="agency-cards">
                <Table celled selectable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Case Number</Table.HeaderCell>
                      <Table.HeaderCell>Agency Name</Table.HeaderCell>
                      <Table.HeaderCell>Case Desc</Table.HeaderCell>
                      <Table.HeaderCell>&nbsp;</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {
                      displayCaseData?.map((caseItem, i) => 
                          <Table.Row key={i + caseItem.id}>
                            <Table.Cell>{caseItem.caseNumber}</Table.Cell>
                            <Table.Cell>{caseItem.agencyName}</Table.Cell>
                            <Table.Cell>{caseItem.caseDescription}</Table.Cell>
                            <Table.Cell textAlign="center">
                              <Button icon color="red" size="mini" onClick={() => deleteCase(caseItem.id)}><Icon name="delete" title="delete" /></Button>
                            </Table.Cell>
                          </Table.Row> 
                      )
                    }
                  </Table.Body>
                </Table>
               
            </div>
          </div>
        </Segment>
    );
}

export default Agencies;