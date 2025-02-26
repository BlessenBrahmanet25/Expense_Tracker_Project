import React, { useState } from "react";
import './expenseaddcomp.scss';

interface BalanceshowingdivProps {
    main_balance: any;
}
export const ExpenseAddComp = () => {

    const [balance, setBalance] = useState(0);
    const [radiobtnone, setRadiobtnone] = useState(false);
    const [radiobtntwo, setRadiobtntwo] = useState(false);
    const Handleradiobtnone = () => {
        setRadiobtnone(!radiobtnone)
        setRadiobtntwo(false)
    }

    const Handleradiobtntwo = () => {
        setRadiobtntwo(!radiobtntwo)
        setRadiobtnone(false)
    }
    return (
        <>
            <div className="expenseparentdiv">
                <div className="expensechilddiv">
                    <h1>Expense Tracker</h1>
                    <BalanceShowingdivcomp main_balance={balance} />
                    <div className="expenseshowingmaindiv">
                        <div className="inputtextdivcstm">
                            <input type="text" placeholder="Enter Label ( like Groceries, Freelancing etc ...) " />
                            <input type="number" placeholder="Enter Amount" />
                            <div className="radiobtnscstmdiv">
                                <div className="radiobtnone">
                                    <div className={`radioclickone ${radiobtnone ? ("radioactive") : ("")}`} onClick={Handleradiobtnone}></div>
                                    <p>Expense</p>
                                </div>
                                <div className="radiobtnone">
                                    <div className={`radioclickone ${radiobtntwo ? ("radioactive") : ("")}`} onClick={Handleradiobtntwo}></div>
                                    <p>Income</p>
                                </div>
                            </div>
                            <div className="buttoncstmaddtransaction">
                                <a href="#" className="btnaddtransactioncstm">Add Transaction</a>
                            </div>
                        </div>
                    </div>
                    <div className="expenseandincomediv">
                        <div className="expensecstmdiv">
                            <h1>Expense</h1>
                            <h2>Rs {balance}</h2>
                        </div>
                        <div className="expensecstmdiv">
                            <h1>Income</h1>
                            <h2>Rs {balance}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export const BalanceShowingdivcomp: React.FC<BalanceshowingdivProps> = (Props) => {

    return (
        <>
            <div className="expensebalancediv">
                <div className="balancediv">
                    <h1>Balance : {Props.main_balance}</h1>
                </div>
                <a href="#" className="cancelbuttoncstm">Cancel</a>
            </div>
        </>
    )

}