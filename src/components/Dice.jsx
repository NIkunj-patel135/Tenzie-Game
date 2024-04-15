import React from "react"
import Confetti from 'react-confetti'



export default function Dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    const { innerWidth: width, innerHeight: height } = window;

    return (

        <div className="dice-box" style={styles} onClick={props.toggleHold}>
            <span>{props.value}</span>
            {props.tenzie && <Confetti
                width={width}
                height={height}
            />}
        </div>
    )
}
