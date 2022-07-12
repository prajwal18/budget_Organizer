import Modal from "react-bootstrap/Modal"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"

import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../contex/BudgetsContex";
import { CurrencyFormatter } from "../utils";


const ViewExpensesModal = ({ budgetId, handleClose }) => {
    const { getBudgetExpenses, budgets, deleteExpense, deleteBudget } = useBudgets();

    const budget = budgetId === UNCATEGORIZED_BUDGET_ID ?
    {name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID}:
    budgets.find(b => b.id === budgetId);

    const expenses = getBudgetExpenses(budgetId);



    return (
        <Modal show={budgetId !== null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expense - {budget?.name}</div>
                        {
                            budgetId !== UNCATEGORIZED_BUDGET_ID &&
                            <Button onClick={() => {
                                deleteBudget(budget.id)
                                handleClose();
                                }} variant="outline-danger">
                                Delete
                            </Button>
                        }
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {
                        expenses.map(expense => (
                            <Stack direction="horizontal" gap="2" key={expense.id}>
                                <div className="me-auto fs-4">{expense.description}</div>
                                <div className="fs-5">{CurrencyFormatter.format(expense.amount)}</div>
                                <Button 
                                    size="sm" 
                                    variant="outline-danger" 
                                    onClick={() => deleteExpense(expense.id)}
                                >&times;</Button>
                            </Stack>
                        ))
                    }
                </Stack>
            </Modal.Body>
        </Modal>
    )
}

export default ViewExpensesModal;