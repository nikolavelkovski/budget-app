import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import BudgetContext, { UNCATHEGORIZED_BUDGET_ID } from "./budget-context";

const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };
  const addBudgetExpenses = ({ budgetId, amount, description }) => {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { budgetId: budgetId, amount: amount, description: description },
      ];
    });
  };
  const addBudget = ({ name, max }) =>
    setBudgets((prevBudgets) => {
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });

  const deleteBudget = (budgetId) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== budgetId) return expense;
        return { ...expense, budgetId: UNCATHEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) =>
      prevBudgets.filter((budget) => budget.id !== budgetId)
    );
  };

  const deleteExpense = (expenseId) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseId)
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        addBudgetExpenses,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export default BudgetProvider;
