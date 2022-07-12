import BudgetCard from "./BudgetCard";
import { useBudgets } from "../contex/BudgetsContex";

const TotalBudgetCard = () => {
    const { budgets, expenses } = useBudgets();
    const amount = expenses.reduce((total, expense) => total += expense.amount, 0);
    const max = budgets.reduce((total, budget) => total += budget.max, 0);
    if(max === 0) return null;

    return (
        <BudgetCard gray name="Total" max={max} amount={amount} hideButtons/>
    )
}

export default TotalBudgetCard;