import { useState } from "react";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./contex/BudgetsContex";



const App = () => {
  const [ showAddBudgetModal, setShowAddBudgetModal ] = useState(false);
  const [ showAddExpenseModal, setShowAddExpenseModal ] = useState(false);
  const [ viewExpensesModalBudgetId, setViewExpensesModalBudgetId ] = useState(null);
  const [ expenseModalBudgetId, setExpenseModalBudgetId ] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4" >
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
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            alignItems: "flex-start"
          }}>
            {
              budgets.map(budget => {
                const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total += expense.amount, 0);
                return(
                  <BudgetCard 
                    key={budget.id} 
                    name={budget.name} 
                    max={budget.max} 
                    amount={amount} 
                    onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                    onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                  />
                )
              })
            }
            <UncategorizedBudgetCard 
              onAddExpenseClick={openAddExpenseModal}
              onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
            />
            <TotalBudgetCard />
          </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal 
        show={showAddExpenseModal} 
        handleClose={() => setShowAddExpenseModal(false)} 
        defaultBudgetId={expenseModalBudgetId} 
      />
      <ViewExpensesModal 
        budgetId={viewExpensesModalBudgetId} 
        handleClose={() => setViewExpensesModalBudgetId(null) } 
      />
    </>
  )
}

export default App;