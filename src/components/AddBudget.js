import React, { useContext, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import BudgetContext from "../context/budget-context";

export default function AddBudget({ show, handleCloseModal }) {
  const budgetCtx = useContext(BudgetContext);
  const inputNameRef = useRef();
  const inputSpendingRef = useRef();
  const formSubmitHandler = (event) => {
    event.preventDefault();

    budgetCtx.addBudget({
      name: inputNameRef.current.value,
      max: parseFloat(inputSpendingRef.current.value),
    });

    handleCloseModal();
  };
  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Form onSubmit={formSubmitHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Add Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              ref={inputNameRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              step={0.01}
              ref={inputSpendingRef}
            ></Form.Control>
          </Form.Group>
          <div className="d-flex  justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
