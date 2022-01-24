import React, { useContext } from "react";
import BudgetContext from "../context/budget-context";
import BudgetCard from "./BudgetCard";

export default function TotalBudget(props) {
  const budgetCtx = useContext(BudgetContext);
  const amount = budgetCtx.expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const maxAmount = budgetCtx.budgets.reduce(
    (total, budget) => total + Number(budget.max),
    0
  );
  if (maxAmount === 0) return null;
  return (
    <BudgetCard
      amount={amount}
      maxAmount={maxAmount}
      gray
      name="Total"
      hideButtons
    />
  );
}
