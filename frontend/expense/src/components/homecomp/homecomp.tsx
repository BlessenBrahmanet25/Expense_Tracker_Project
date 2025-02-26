import React from "react";
import "./homecomp.scss";

const HomeComp = () => {

    return (
        <>
            <div className="homeparentdiv">
                <div className="homechilddiv">
                    <div className="homechilddivone">
                        <h1>Expense Tracker</h1>
                        <h2>Keep Track of Your Expenses</h2>
                    </div>
                    <div className="homechilddivtwo">
                        <a href="#" className="buttoncstm">Get Started</a>
                    </div>
                </div>
            </div>
        </>
    )
}


export { HomeComp }