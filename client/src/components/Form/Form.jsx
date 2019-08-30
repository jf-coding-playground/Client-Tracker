import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Form.css';

export default function FormComponent({ fields, checkBoxes, onSubmit }) {
  return (
    <Form onSubmit={onSubmit}>
      {fields && fields.map((field, i) => (
        <Form.Group key={i} controlId={field.name}>
          <Form.Label>{field.name}</Form.Label>
          {field.required ?
            <Form.Control required name={field.name} type={field.type} />
            :
            <Form.Control name={field.name} type={field.type} />
          }
        </Form.Group>
      ))}

      <br />
      <hr />
      <br />

      {checkBoxes && checkBoxes.map((checkBox, i) => (
        <Form.Group key={i} controlId={checkBox}>
          <Form.Check name={checkBox} type="checkbox" label={checkBox} />
        </Form.Group>
      ))}

      <br />

      <Button className="form-btn" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}