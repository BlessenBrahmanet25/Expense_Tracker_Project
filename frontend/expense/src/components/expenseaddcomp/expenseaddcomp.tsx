import React, { useEffect, useState } from "react";
import './expenseaddcomp.scss';

interface BalanceshowingdivProps {
    main_balance: any;
}

interface TransactionProps {

    id: number;
    type: "Expense" | "Income" | " ";
    amount: number;
    label: string;
}


export const ExpenseAddComp = () => {

    const [balance, setBalance] = useState(0);
    const [radiobtnone, setRadiobtnone] = useState(false);
    const [radiobtntwo, setRadiobtntwo] = useState(false);
    const [checked, setChecked] = useState<string | null>(null);
    const [amount, setAmount] = useState<number | null>(null);
    const [label, setLabel] = useState("")
    const [errorTrue, setErrorTrue] = useState(false);
    const [error, setError] = useState('');
    const [transactions, setTransactions] = useState<TransactionProps[]>([])
    const [type, setType] = useState<"Expense" | "Income" | " ">(" ");
    const [expense, setExpense] = useState(0);
    const [income, setIncome] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [amountError, setAmountError] = useState("");
    const [labelError, setLabelError] = useState("");

    const filteredTransactions = transactions.filter((transaction) =>
        transaction.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const HandleAddtransaction = () => {
        setErrorTrue(true)
        setError("Please select either Expense or Income")
        if (radiobtnone === true || radiobtntwo === true) {
            if (!amount || !label) return;

            const newTransaction: TransactionProps = {
                id: Date.now(),
                type,
                amount: Number(amount),
                label,
            };

            setTransactions([...transactions, newTransaction]);

            if (type === "Expense") {

                setBalance((prev) => prev - Number(amount));
                setExpense((prev) => prev + Number(amount))
            } else {
                setBalance((prev) => prev + Number(amount));
                setIncome((prev) => prev + Number(amount))
            }

            // setAmount(0);
            setLabel("");
        }
    }

    const HandleRemoveTransaction = (id: number, transactionAmount: number, transactionType: "Expense" | "Income" | " ") => {
        setTransactions(transactions.filter((t) => t.id !== id))

        if (transactionType === "Expense") {
            setBalance((prev) => prev + transactionAmount);
        } else {
            setBalance((prev) => prev - transactionAmount);
        }
    };

    const Handleradiobtnone = () => {
        setRadiobtnone(!radiobtnone)
        setRadiobtntwo(false)
        setChecked('Expense')
        setErrorTrue(false)
        setType("Expense")
    }

    const Handleradiobtntwo = () => {
        setRadiobtntwo(!radiobtntwo)
        setRadiobtnone(false)
        setChecked('Income')
        setErrorTrue(false)
        setType("Income")
    }

    const HandleAmountrange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!value) {
            return null
        }
        if (value.length < 7) {
            setAmount(e.target.value ? parseFloat(e.target.value) : null)
            setAmountError("")
        } else {
            setAmountError("Max Digits Reached")
        }
    }

    const HandleCharacterrange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (!value) {
            return null
        }
        if (value.length < 15) {
            setLabel(e.target.value)
            setLabelError("")
        } else {
            setLabelError("Max Characters Reached")
        }
    }

    return (
        <>
            <div className="expenseparentdiv">
                <div className="expensechilddiv">
                    <h1>Expense Tracker</h1>
                    <BalanceShowingdivcomp main_balance={balance} />
                    <div className="expenseshowingmaindiv">
                        <div className="inputtextdivcstm">
                            <input type="text" placeholder="Enter Label ( like Groceries, Freelancing etc ...) " value={label} onChange={HandleCharacterrange} />
                            {labelError && (
                                <p style={{ color: 'red', margin: '0px', width: '100%' }} className="fontsizeerror">{labelError}</p>
                            )}
                            <input type="number" placeholder="Enter Amount" value={amount ?? ""} onChange={HandleAmountrange} />
                            {amountError && (
                                <p style={{ color: 'red', margin: '0px', width: '100%' }} className="fontsizeerror">{amountError}</p>
                            )}
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
                            {errorTrue && (
                                radiobtnone === false && radiobtntwo === false ? (<>
                                    <div className="buttonnotclickedcstmdiv">
                                        <p style={{ color: 'red', margin: '0px' }}>{error}</p>
                                    </div>
                                </>) : (<>

                                </>)
                            )}
                            <div className="buttoncstmaddtransaction">
                                <a href="#" className="btnaddtransactioncstm" onClick={HandleAddtransaction}>Add Transaction</a>
                            </div>
                        </div>
                    </div>
                    <div className="expenseandincomediv">
                        <div className="expensecstmdiv">
                            <h1>Expense</h1>
                            <h2>Rs {expense}</h2>
                        </div>
                        <div className="expensecstmdiv">
                            <h1>Income</h1>
                            <h2>Rs {income}</h2>
                        </div>
                    </div>
                    <div className="Transactionhistory">
                        <h1>Transactions</h1>
                        <div className="searchtransactiondiv">
                            <input type="Search" className="searchtransactioncstm" placeholder="Search for transactions ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        {
                            radiobtnone === true || radiobtntwo === true ? (
                                <>
                                    {filteredTransactions.length > 0 ?
                                        (filteredTransactions.map((items) => (
                                            <div className={`transactionallhistory ${items.type === 'Expense' ? ("borderrightcstm_red") : ("borderrightcstm_green")}`} key={items.id}>
                                                <p>{items.label}</p>
                                                <p>{items.amount}</p>
                                                <a href="#" className="removecstmbtn" onClick={() => HandleRemoveTransaction(items.id, items.amount, items.type)}>Remove</a>
                                            </div>
                                        ))) : (
                                            <p className="notransactionfoundcstm">No Transactions Found</p>
                                        )}
                                </>
                            ) : (<>
                                <p className="notransactionfoundcstm">No Transactions Found</p>
                            </>
                            )
                        }
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
                    <h1>Balance : Rs {Props.main_balance}</h1>
                </div>
                <a href="/" className="cancelbuttoncstm">Cancel</a>
            </div>
        </>
    )

}