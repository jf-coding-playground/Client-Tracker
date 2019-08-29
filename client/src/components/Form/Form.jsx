import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Form.css'
export default function FormComponent({ fields, checkBoxes, onSubmit }) {
  return (
    <Form>
      {fields && fields.map((field, i) => (
        <Form.Group key={i} controlId={field}>
          <Form.Label>{field}</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      ))}

      {checkBoxes && checkBoxes.map((checkBox, i) => (
        <Form.Group key={i} controlId={checkBox}>
          <Form.Check type="checkbox" label={checkBox} />
        </Form.Group>
      ))}

      <Button onSubmit={onSubmit} className="form-btn" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}