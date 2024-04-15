import React from "react"
import Dice from "./components/Dice"
import { nanoid } from "nanoid";
import "./App.css"



export default function App() {

    const [allDice, setDice] = React.useState(allNewDice());
    const [tenzie, setTenzie] = React.useState(false);

    function checkWon() {

        const winNum = allDice[0].value;
        for (let i = 0; i < allDice.length; i++) {
            if (allDice[i].isHeld === false || winNum !== allDice[i].value) {
                return false;
            }
        }
        return true;
    }


    React.useEffect(() => {
        setTenzie(checkWon())


    }, [allDice])

    function allNewDice() {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push({
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false
            })
        }
        return arr;
    }

    function rollDice() {
        if (tenzie) {
            setDice(allNewDice())
        } else {
            setDice(allDice.map((die) => {
                return die.isHeld ? die : {
                    id: nanoid(),
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false
                }
            }))
        }
    }


    function toggleHold(id) {

        setDice(allDice.map((die) => {
            return (die.id === id ? { ...die, isHeld: !die.isHeld } : die)
        }))
    }



    const diceElements = allDice.map((die) => {

        return <Dice
            id={die.id}
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            toggleHold={() => toggleHold(die.id)}
            tenzie={tenzie}
        />
    })


    return (
        <div className="container">
            <main className="main-section">
                <h1 className="game-title">Tenzies</h1>
                <p className="game-desc">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="dice-container">
                    {diceElements}
                </div>
                <button
                    className="button-roll"
                    onClick={rollDice}

                >
                    {tenzie ? "Reset" : "Roll"}
                </button>
            </main>
        </div>
    )
}