/* eslint-disable no-unused-vars */

import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

export default function EditButton() {
  const userName = localStorage.getItem("user");
  const backgroundImageUrl = "https://www.bonsdag.com/wp-content/uploads/2015/05/head-title-bg.png";
    
  return (
    <div className="gradient-custom-2" >
      <MDBContainer className="py-3 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" xl="12">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row"  style={{ backgroundImage: 'url(' + backgroundImageUrl + ')',
              backgroundColor: 'white', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://cdn2.iconfinder.com/data/icons/investing-soft-fill/60/Investor-Male-investor-male-avatar-512.png"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  
                </div>
                <div className="ms-3" style={{ marginTop: '130px'}}>
                  <MDBTypography tag="h5">{userName} </MDBTypography>
                  <MDBCardText>INVESTOR</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#5A287D' }}>
                <div className="d-flex justify-content-end text-center py-1" style={{ color: 'white' }}>
                Quote of the day<br/>
                "The individual investor should act consistently as an investor and not as a speculator." — Ben Graham
                </div>
              </div>
              
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}