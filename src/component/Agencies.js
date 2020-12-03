import React, { useState, useEffect } from 'react';

// Added mock list of case data with multiple hospitals contributing to same case, multiple cases 

const caseData = [
    {
      "caseNumber": 2,
      "agencyName": "John Doe Medical Office",
      "caseInfo": "case information abcd"
    },
    {
      "caseNumber": 2,
      "agencyName": "Linda Hospital",
      "caseInfo": "case information abcd"
    },
    {
      "caseNumber": 2,
      "agencyName": "General Hospital",
      "caseInfo": "case information abcd"
    },
    {
      "caseNumber": 1,
      "agencyName": "Linda Hospital",
      "caseInfo": "case information abcd"
    },
    {
      "caseNumber": 3,
      "agencyName": "General Hospital",
      "caseInfo": "case information abcd"
    },
    {
        "caseNumber": 3,
        "agencyName": "John Doe Medical Office",
        "caseInfo": "case information abcd"
    },
  
  ]

const Agencies = () => {

    // Case number 2 is hard coded here. This would be an inputbox or a select box so the user could selecct this. 
    let selectedCaseNumber = 2;

    // Case number 2 is being specified here, duplicate agency names are removed for a particular case number
    const uniqueAgencies = caseData.filter((v,i,caseData)=>caseData.findIndex(t=>(t.caseNumber === selectedCaseNumber && t.agencyName === v.agencyName))===i);

    return (
        <section id="agencies" className="section">
            <div className="container">
            <h2 className="headline">Case Overview: Case {selectedCaseNumber}</h2>
            <p>List of agencies for case:  {selectedCaseNumber}</p>
            <div className="agency-cards">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                {
                    uniqueAgencies?.map((agency) => 
                        <li>{agency.caseNumber} {agency.agencyName} </li>  
                    )
                }
                </ul>
            </div>
            </div>
        </section>
    );
}

export default Agencies;