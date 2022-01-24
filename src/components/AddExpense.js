import React, { useContext, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import BudgetContext, {
  UNCATHEGORIZED_BUDGET_ID,
} from "../context/budget-context";

export default function AddExpense({
  show,
  handleCloseModal,
  defaultBudgetId,
}) {
  const budgetCtx = useContext(BudgetContext);
  const inputDescriptionRef = useRef();
  const inputAmountRef = useRef();
  const inputBudgetIdRef = useRef();
  const formSubmitHandler = (event) => {
    event.preventDefault();

    budgetCtx.addBudgetExpenses({
      description: inputDescriptionRef.current.value,
      amount: parseFloat(inputAmountRef.current.value),
      budgetId: inputBudgetIdRef.current.value,
    });

    handleCloseModal();
  };
  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Form onSubmit={formSubmitHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              ref={inputDescriptionRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              required
              min={0}
              ref={inputAmountRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select
              required
              min={0}
              ref={inputBudgetIdRef}
              defaultValue={defaultBudgetId}
            >
              <option id={UNCATHEGORIZED_BUDGET_ID}>Uncathegorized </option>
              {budgetCtx.budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
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
