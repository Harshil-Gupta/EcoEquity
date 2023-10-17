import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './ContactUs.css';

const ContactUs = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
  };

  return (
    <Container>
      <h1>Feel Free to Contact Us</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="purple" className='button-purple'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ContactUs;
