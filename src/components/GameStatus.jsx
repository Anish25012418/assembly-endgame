import {clsx} from "clsx";
import {getFarewellText} from "../data/farewell.js";

export default function GameStatus(props) {
    const gameStatusClass = clsx("game-status", {
        won: props.isGameWon,
        lost: props.isGameLost,
        farewell: !props.isGameOver && props.isLastGuessIncorrect
    })
    return (
        <section aria-live={"polite"} role={"status"} className={gameStatusClass}>
            {props.isGameOver ? (
                props.isGameWon ? (
                    <>
                        <h2>You win!</h2>
                        <p>🎉 Congratulations! 🎉</p>
                    </>
                ) : (
                    <>
                        <h2>Game Over!</h2>
                        <p>You lose! Better start learning Assembly</p>
                    </>
                )
            ) : (
                props.isLastGuessIncorrect ? (
                    <>
                        <h2>Wrong Guess!</h2>
                        <p>{getFarewellText(props.lostLanguage)}</p>
                    </>
                ) : null
            )
            }
        </section>
    )
}