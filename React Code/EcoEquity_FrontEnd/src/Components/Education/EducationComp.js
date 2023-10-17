import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Stack from 'react-bootstrap/Stack';
import YouTube from "react-youtube";
import VideoComp1 from './VideoComp1';
import VideoComp2 from './VideoComp2';
import VideoComp3 from './VideoComp3';
import VideoComp4 from './VideoComp4';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Dashboard folder/Header'
const EducationComp = () => {
    
    // questions and info data for tooltip display
    const questions = [
        { ques: "What are the Pros of ESG Investing?", info: "Some have argued that, in addition to their social value, ESG criteria can help investors avoid the blowups that occur when companies operating in a risky or unethical manner are ultimately held accountable for its consequences. Examples include BP's (BP) 2010 Gulf of Mexico oil spill and Volkswagen's emissions scandal, which rocked the companies' stock prices and cost them billions of dollars."},
        { ques: "What are the Cons of ESG Investing?", info: "The downside of ESG investing is that you will not be able to hold the full universe of stocks available in the market. After all, tobacco and defense, two industries avoided by many ESG investors, have historically produced well-above-average market returns and can buck recessionary trends. In other words, U.S. investors may be sacrificing a small amount of returns in exchange for making investments that fit their values."},
        { ques: "What is ESG Criteria?", info: "Investment firms following ESG investing often set their own priorities. For example, Boston-based Trillium Asset Management, with $5.6 billion under management as of December 2021, uses a variety of ESG factors to help identify companies positioned for strong long-term performance."},
        { ques: "Why is ESG here to stay?", info: "Investors, regulators, as well as consumers and employees are now increasingly demanding that companies should not only be good stewards of capital but also of natural and social capital and have the necessary governance framework in place to support this. More and more investors are incorporating ESG elements into their investment decision making process, making ESG increasingly important from the perspective of securing capital, both debt and equity."},
        { ques: "What Does ESG Mean for a Business?", info: "Adopting ESG principles means that corporate strategy focuses on the three pillars of the environment, social, and governance. This means taking measures to lower pollution, CO2 output, and reduce waste. It also means having a diverse and inclusive workforce, at the entry-level and all the way up to the board of directors. ESG may be costly and time-consuming to undertake, but can also be rewarding into the future for those that carry it through." },
        { ques: "How Do I Know Which Investments Are ESG?", info: "Several financial firms have come out with ESG ratings and scoring systems in recent years. For instance, MSCI has come out with a ratings scheme covering more than 8,500 companies around the world, giving them scores and letter grades based on their compliance with ESG standards and initiatives. Several other companies like Morningstar have also released ESG scores for publicly-traded companies." },
        { ques: "How Is ESG Investing Different From Sustainable Investing?", info: "ESG and sustainability are closely related. ESG investing screens companies based on criteria related to being pro-social, environmentally friendly, and with good corporate governance. Together, these features can lead to sustainability. ESG, therefore, looks at how a company's management and stakeholders make decisions; sustainability considers the impact of those decisions on the world."},
       ];

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // display tooltip
    const popover=(data)=> (
        <Tooltip id={`tooltip-top`} style={{maxWidth:"100%"}}>
          {data.info}
        </Tooltip>
        );

    // display toast alert when question is posted by user
    const postQuestion=()=>{
        toast.success(`Question Posted!`);
        setEmail("")
        setMessage("")
    }

    return (
        <div style={{ paddingTop: "75px" }}>
            <div style={{ width:"100%", height: "auto", backgroundColor: "#9F79B9", paddingBottom: "20px"}}>
              <h4 style={{ color:"black", paddingTop: "25px", textAlign: "center", fontFamily: "Young Serif"}}>Curious about ESG? You've come to the right place!</h4>
              <div style={{ textAlign:"center", padding: "20px"}}>
                <Image src="https://www.venminder.com/hubfs/Blog_Images/2022_Blog_Posts/05.18.2022-esg-and-tprm-questions-to-ask-your-vendor-FEATURED.jpg" style={{ width:"50%", height: "auto", justifyItems: "right"}} rounded/>
              </div>
              <div className='text-on-image'>
                <h2 style={{ color:"black", textAlign: "center", fontFamily: "Young Serif"}}>ESG</h2>
                <p style={{ color:"black", textAlign: "center", fontFamily: "Young Serif"}}>ESG analysis has become an increasingly important part of the investment process. For investment professionals, a key motivation in the practice of considering environmental, social, and governance (ESG) issues as part of their financial analysis is to gain a fuller understanding of the companies in which they invest.</p>
              </div>
            </div><br/><br/>
            <div style={{ justifyContent: "left", paddingInline: "20px"}}>
              <h1 style={{ color:"black", fontFamily: "Roboto Condensed"}}>What Is ESG Investing?</h1>
              <p style={{ color:"black", fontFamily: "Roboto Condensed"}}>ESG stands for Environmental, Social, and Governance. Investors are increasingly applying these non-financial factors as part of their analysis process to identify material risks and growth opportunities. ESG metrics are not commonly part of mandatory financial reporting, though companies are increasingly making disclosures in their annual report or in a standalone sustainability report. Numerous institutions, such as the Sustainability Accounting Standards Board (SASB), the Global Reporting Initiative (GRI), and the Task Force on Climate-related Financial Disclosures (TCFD) are working to form standards and define materiality to facilitate incorporation of these factors into the investment process.</p>
            </div><br/>
            
            {/* display cards containing ESG inforamtion */}
            <div className="d-flex flex-row" style={{ justifyContent: "center"}}>
            <Card style={{ width: '25rem', marginInline: "25px", backgroundColor: "#E2DAE8" }}>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold'}}>Environmental</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Conservation of the natural world</Card.Subtitle>
                    <Card.Text>
                    <ListGroup>
                        <ListGroup.Item>Climate change and carbon emissions</ListGroup.Item>
                        <ListGroup.Item>Air and water pollution</ListGroup.Item>
                        <ListGroup.Item>Biodiversity</ListGroup.Item>
                        <ListGroup.Item>Deforestation</ListGroup.Item>
                        <ListGroup.Item>Energy efficiency</ListGroup.Item>
                        <ListGroup.Item>Waste management</ListGroup.Item>
                        <ListGroup.Item>Water scarcity</ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '25rem', marginInline: "25px", backgroundColor: "#E2DAE8" }}>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold'}}>Social</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Consideration of people & relationships</Card.Subtitle>
                    <Card.Text>
                    <ListGroup>
                        <ListGroup.Item>Customer satisfaction</ListGroup.Item>
                        <ListGroup.Item>Data protection and privacy</ListGroup.Item>
                        <ListGroup.Item>Gender and diversity</ListGroup.Item>
                        <ListGroup.Item>Employee engagement</ListGroup.Item>
                        <ListGroup.Item>Community relations</ListGroup.Item>
                        <ListGroup.Item>Human rights</ListGroup.Item>
                        <ListGroup.Item>Labor standards</ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '25rem', marginInline: "25px", backgroundColor: "#E2DAE8" }}>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold'}}>Governance</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Standards for running a company</Card.Subtitle>
                    <Card.Text>
                    <ListGroup>
                        <ListGroup.Item>Board composition</ListGroup.Item>
                        <ListGroup.Item>Audit committee structure</ListGroup.Item>
                        <ListGroup.Item>Bribery and corruption</ListGroup.Item>
                        <ListGroup.Item>Executive compensation</ListGroup.Item>
                        <ListGroup.Item>Lobbying</ListGroup.Item>
                        <ListGroup.Item>Political contributions</ListGroup.Item>
                        <ListGroup.Item>Whistleblower schemes</ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
            </Card>
            </div><br/><br/>

            <div style={{ justifyContent: "left", paddingInline: "20px"}}>
            <h1 style={{ color:"black", fontFamily: "Roboto Condensed"}}>Are You Committed to Sustainable Investing? </h1>
            <p style={{ color:"black", fontFamily: "Roboto Condensed"}}>Find below some questions to get you started on your journey to sustainable investing</p>
            </div><br/>

            {/* display button with info overlay for each question in the questions array */}
            <div style={{ textAlign: "center", paddingInline: "20px"}}>
            {questions.map((data) => (
            <div key={data.ques} style={{ padding: "5px"}}>
            <OverlayTrigger key="top" placement="top" overlay={popover(data)}>
            <Button variant="secondary">{data.ques}</Button>
            </OverlayTrigger><br/>
            </div>
            ))}
            </div><br/><br/>

            <div style={{ justifyContent: "left", paddingInline: "20px"}}>
            <h1 style={{ color:"black", fontFamily: "Roboto Condensed"}}>Discover more Resources!</h1>
            <h2 style={{ color:"black", fontFamily: "Roboto Condensed"}}>Top Articles</h2>
            
            {/* display stack containg three featured articles */}
            <Stack gap={3}>
              <div className="p-2">
              <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body style={{backgroundColor:"#E2DAE8"}}>
                  <Card.Title>Social-Impact Efforts That Create Real Value</Card.Title>
                  <Card.Text>By: George Serafeim, Harvard Business Review</Card.Text>
                  <Button variant="dark" href="https://hbr.org/2020/09/social-impact-efforts-that-create-real-value">Read Now</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="p-2">
              <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body style={{backgroundColor:"#E2DAE8"}}>
                  <Card.Title>The Remarkable Rise Of ESG</Card.Title>
                  <Card.Text>By: Georg Kell, Forbes Magazine</Card.Text>
                  <Button variant="dark" href="https://www.forbes.com/sites/georgkell/2018/07/11/the-remarkable-rise-of-esg/?sh=73399e811695">Read Now</Button>
                  </Card.Body>
                </Card>
              </div>
              <div className="p-2">
              <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body style={{backgroundColor:"#E2DAE8"}}>
                  <Card.Title>ESG Is Going to Have a Rocky 2023. Sustainability Will Be Just Fine.</Card.Title>
                  <Card.Text>By: Andrew Winston, MIT Sloan Management Review</Card.Text>
                  <Button variant="dark" href="https://sloanreview.mit.edu/article/esg-is-going-to-have-a-rocky-2023-sustainability-will-be-just-fine/">Read Now</Button>
                  </Card.Body>
                </Card>
              </div>
            </Stack><br/>

            {/* display embeded Youtube videos from VideoComponents*/}
            <h2 style={{ color:"black", fontFamily: "Roboto Condensed"}}>Discover Videos</h2>
            <Stack direction="horizontal" gap={3} style={{ justifyContent: "center"}}>
              <div className="p-2"><VideoComp1/></div>
              <div className="p-2"><VideoComp2/></div>
            </Stack>
            <Stack direction="horizontal" gap={3} style={{ justifyContent: "center"}}>
              <div className="p-2"><VideoComp3/></div>
              <div className="p-2"><VideoComp4/></div>
            </Stack>
            </div><br/><br/>

            {/* question posting form for user questions */}
            <div style={{ backgroundColor: "#9F79B9", padding: "15px" }}>
            <h4 style={{ textAlign: "center", color: "black"}}>Have Any Questions? Post Them Below!</h4>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{color: "black"}}>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{color: "black"}}>Your Question</Form.Label>
                    <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)}/>
                </Form.Group>
                <Button variant="outline-light" onClick={postQuestion}>Post Question</Button>
            </Form>
            </div>
            
            {/* include toast container for toast alerts */}
            <ToastContainer />
        </div>
    )
};

export default EducationComp;