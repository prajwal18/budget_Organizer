import { createContext, useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useSemiPresistenceState from "./useSemiPresistenceState";


const BudgetContext = createContext({});

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const useBudgets = () => {
    return useContext(BudgetContext);
}

const BudgetsProvider = ({children}) => {
    const [budgets, setBudgets] = useSemiPresistenceState("budgets", [])
    const [expenses, setExpenses] = useSemiPresistenceState("expenses", []);

    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    function addExpense({budgetId, amount, description}){
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidV4(), budgetId, amount, description }]
        })
    }

    function addBudget({ name, max }){
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)){
                return prevBudgets;
            }
            return [...prevBudgets, {id: uuidV4(), name, max }]
        })
    }

    function deleteExpense(expenseId){
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== expenseId)
        } );
    }
    function deleteBudget(budgetId){
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.budgetId === budgetId){
                    return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
                }
                return expense;
            })
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== budgetId)
        } );
    }

    return(
        <BudgetContext.Provider value={{
            expenses, budgets, getBudgetExpenses,
            addExpense, addBudget, deleteExpense,
            deleteBudget
        }}>
            {children}
        </BudgetContext.Provider>
    );
}

export default BudgetsProvider;



// bugetTemplate: {
//     id:,
//     name:,
//     max:,
// }

// expensesTemplate: {
//     id:,
//     budgetId:,
//     amount:,
//     description:
// }