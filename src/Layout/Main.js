import React, { useContext, useState } from "react";
import { Container, Stack, Button } from "react-bootstrap";
import AddBudget from "../components/AddBudget";
import AddExpense from "../components/AddExpense";
import BudgetCard from "../components/BudgetCard";
import TotalBudget from "../components/TotalBudget";
import Uncathegorized from "../components/Uncathegorized";
import ViewExpenses from "../components/ViewExpenses";
import BudgetContext, {
  UNCATHEGORIZED_BUDGET_ID,
} from "../context/budget-context";
export default function Main() {
  const budgetCtx = useContext(BudgetContext);
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModalId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };
  return (
    <Container>
      <Stack direction="horizontal" gap="3" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
          Add Budget
        </Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>
          Add Expense
        </Button>
      </Stack>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {budgetCtx.budgets.map((budget) => {
          const amount = budgetCtx
            .getBudgetExpenses(budget.id)
            .reduce((total, expense) => total + expense.amount, 0);
          return (
            <BudgetCard
              key={budget.id}
              amount={amount}
              maxAmount={budget.max}
              name={budget.name}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpenseClick={() => setShowViewExpenseModalId(budget.id)}
            />
          );
        })}
      </div>
      <AddBudget
        show={showAddBudgetModal}
        handleCloseModal={() => setShowAddBudgetModal(false)}
      />
      <AddExpense
        show={showAddExpenseModal}
        handleCloseModal={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <Uncathegorized
        onAddExpenseClick={openAddExpenseModal}
        onViewExpenseClick={() =>
          setShowViewExpenseModalId(UNCATHEGORIZED_BUDGET_ID)
        }
      />
      <ViewExpenses
        budgetId={showViewExpenseModal}
        handleCloseModal={() => setShowViewExpenseModalId()}
      />
      <TotalBudget />
    </Container>
  );
}
