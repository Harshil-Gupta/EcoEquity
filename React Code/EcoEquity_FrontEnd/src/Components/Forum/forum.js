import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import {TickerTape} from "react-ts-tradingview-widgets";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Dashboard folder/Header';

const Forum = () => {

    //stock list array
    const stockOptions = [
        { name: "NatWest Group", ticker: "NWG" },
        { name: "Apple", ticker: "AAPL" },
        { name: "Google", ticker: "GOOGL" },
        { name: "Visa", ticker: "V" },
        { name: "Tesla", ticker: "TSLA" },
        { name: "Microsoft", ticker: "MSFT" },
        { name: "Amazon", ticker: "AMZN" },
        { name: "Facebook", ticker: "META" },
        { name: "Walmart", ticker: "WMT" },
        { name: "Berkshire Hathaway Inc", ticker: "BRK.A" },
      ];

    const [selectedStock, setSelectedStock] = useState("NWG"); // currently selected stock
    const [stockComments, setstockComments] = useState([""]); 
    const [rating, setRating] = useState("Hold"); // initial rating given as Hold
    const [comment, setComment] = useState(""); // user comment for posting
    const [userName, setuserName] = useState(localStorage.getItem("user")); // get username stored in local storage during login
    const [id, setId] = useState(Math.floor(Math.random() * 100000000)); // set initial state to random int
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // get stock comments on change of selected stock value and id vlaue
    useEffect(() => {
        const getStockComments = async() => {
        //url with currently selected stock
        const url = `http://localhost:8087/forum/getStockComments/${selectedStock}`
        await axios.get(url).then((response) => {
            console.log(response.data);
            setstockComments(response.data); // update stockComments array with retrieved data
            })
        };
        getStockComments();
        }, [selectedStock, id]);

    // post user comment 
    const postComment = async() => {
        const response = await axios.post('http://localhost:8087/forum/addComment', {
            "_id": id,
            "userName": userName,
            "stockId": selectedStock,
            "userRating": rating,
            "comment": comment
        });
        //update id 
        updateId();
        // alert for sucessful post
        toast.success(`Comment Posted!`);
        // rest comment
        setComment("");
    };

    // udapte id with random number
    const updateId=()=>{
        const uniqueNumber = Math.floor(Math.random() * 100000000);
        setId(uniqueNumber);
    }

    const setRatingValue=(rating)=>{
        setRating(rating);
        toast.success(`${rating} recommendation selected!`);
    }

    // delete a comment with given id
    const deleteComment=(id)=>{
        axios.delete(`http://localhost:8087/forum/deleteComment/${id}`)  
        .then(res => {   
        console.log(res.data);
      })
      // update id to re render comments 
      updateId();
      toast.error(`Comment deleted!`);
    }

    // post feedback for user 
    const postFeedback=()=>{
        toast.success(`Feedback shared! Thanks!`);
        setEmail("")
        setMessage("")
    }

    return (
       
        <div style={{ paddingTop: "80px" }}>
        <TickerTape  colorTheme="light" /><br/>
        <div class="d-flex justify-content-center" style={{ backgroundColor: "#eee" }}>
            <div class="w-75 p-3" style={{ backgroundColor: "#eee" }}>
            <h2 style={{ textAlign: "center", paddingTop: "15px", color: "black" }}>Welcome to Community Forum!</h2>
            <h6 class="text-muted" style={{ textAlign: "center" }}>Connect with other users and share your recommendations</h6><br/>

            {/* Stock list dropdown */}
            <Form className="mt-3">
                <Form.Label style={{color: "black"}}>Select Stock To View Rating</Form.Label>
                <Form.Select onChange={(e) =>
                   setSelectedStock(e.target.value)}>
                    {stockOptions.map((stock, index) => (
                    <option key={index} value={stock.ticker}>
                    {stock.name} ({stock.ticker})
                    </option>))}
                </Form.Select>
            </Form><br/><br/>

            {/* display technical analysis for currently selected stock */}
            <TechnicalAnalysis colorTheme="light" width="100%" symbol={selectedStock}></TechnicalAnalysis><br/><br/>
            
            {/* select recommendation for currently selected stock */}
            <h4 style={{ textAlign: "center", color: "black" }}>Share Your Recommendation</h4>
            <div class="d-flex justify-content-center">
            <ToggleButtonGroup type="radio" name="options" style={{margin: "10px"}}>
                <ToggleButton id="tbg-radio-1" value={1} onClick={()=>setRatingValue("Buy")} variant="success">BUY</ToggleButton>
                <ToggleButton id="tbg-radio-3" value={2} onClick={()=>setRatingValue("Hold")} variant="info">HOLD</ToggleButton>
                <ToggleButton id="tbg-radio-2" value={3} onClick={()=>setRatingValue("Sell")} variant="danger">SELL</ToggleButton>
            </ToggleButtonGroup>
            </div><br/><br/>

            {/* Comment section */}
            <div style={{ backgroundColor: "#5A287D", padding: "15px", color: "white" }}>
              <h4 style={{ textAlign: "center" }}>Comment Section</h4>
              <h6 style={{ textAlign: "center" }}>Stock : {selectedStock}</h6>
              <Form.Label>Add a Comment</Form.Label>
                <Stack direction="horizontal" gap={3}>
                  <Form.Control className="me-auto" placeholder="Type here" value={comment}
                   onChange={(e) => setComment(e.target.value)}/>
                  <Button variant="secondary" onClick={postComment}>Post</Button>
                </Stack>
              <h6 style={{ marginTop: "10px" }}>Currently selected rating : {rating}</h6>
              <br/>
            
            {/* display comments for currently selected stock  */}
            {stockComments.map((forum) => (<>
              <Card >
                <Card.Body>
                    <Card.Title>User : {forum.userName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Rating : {forum.userRating}</Card.Subtitle>
                    <Card.Text>{forum.comment}</Card.Text>
                    {forum.userName===userName && <Button variant="outline-danger" onClick={()=>deleteComment(forum._id)}>Delete Comment</Button>}
                    </Card.Body>
                </Card><br></br></>))}
            </div><br/><br/>
            <hr /><br />

          {/* feedback form for user */}
          <div style={{ backgroundColor: "#D4D4D4", padding: "15px" }}>
            <h4 style={{ textAlign: "center", color: "black"}}>Share Your Feedback With Us!</h4>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{color: "black"}}>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label style={{color: "black"}}>Your Message</Form.Label>
                        <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)}/>
                    </Form.Group>
                    <Button variant="outline-success" onClick={postFeedback}>Share Feedback</Button>
            </Form>
          </div>

            {/* include toast container for toast alerts */}
            <ToastContainer />
            </div>
        </div>
        </div>
    )
};

export default Forum;
