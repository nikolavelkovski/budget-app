import React, { useContext } from "react";
import BudgetContext, {
  UNCATHEGORIZED_BUDGET_ID,
} from "../context/budget-context";
import BudgetCard from "./BudgetCard";

export default function Uncathegorized(props) {
  const budgetCtx = useContext(BudgetContext);
  const amount = budgetCtx
    .getBudgetExpenses(UNCATHEGORIZED_BUDGET_ID)
    .reduce((total, expense) => total + expense.amount, 0);
  if (amount === 0) return null;
  return <BudgetCard amount={amount} gray name="Uncathegorized" {...props} />;
}
