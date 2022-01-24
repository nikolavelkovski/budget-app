import React, { useContext } from "react";
import { Modal, Button, Stack } from "react-bootstrap";
import BudgetContext, {
  UNCATHEGORIZED_BUDGET_ID,
} from "../context/budget-context";
import { currencyFormatter } from "../utils.js/utils";

export default function ViewExpenses({ budgetId, handleCloseModal }) {
  const budgetCtx = useContext(BudgetContext);
  const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } = budgetCtx;

  const expenses = getBudgetExpenses(budgetId);

  const budget =
    UNCATHEGORIZED_BUDGET_ID === budgetId
      ? {
          name: "Uncathegorized",
          id: UNCATHEGORIZED_BUDGET_ID,
        }
      : budgets.find((budget) => budget.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expense - {budget?.name}</div>
            {budgetId !== UNCATHEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  deleteBudget(budgetId);
                  handleCloseModal();
                }}
                variant="outline-danger"
              >
                {" "}
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense.id)}
                variant="outline-danger"
                size="sm"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
