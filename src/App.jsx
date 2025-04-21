import Header from "./components/Header.jsx";
import GameStatus from "./components/GameStatus.jsx";
import { languages } from "./data/language.js";
import {useState} from "react";
import { clsx } from "clsx";
import {getRandomWord} from "./data/words.js";
import Confetti from "react-confetti"

export default function App() {
    const [currentLanguage, setCurrentLanguage] = useState(() => getRandomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);

    const wrongGuessCount = guessedLetters.filter(letter => !currentLanguage.includes(letter)).length;
    const isGameWon = currentLanguage.split("").every(letter => guessedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const isGameOver = isGameWon || isGameLost;
    const alphabets = "abcdefghijklmnopqrstuvwxyz"
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessIncorrect = lastGuessedLetter && !currentLanguage.includes(lastGuessedLetter);


    const languageElements = languages.map((language, index) => {
        const isLanguageLost = index < wrongGuessCount;
        const className = clsx("chip", isLanguageLost && "lost");
        const style = {
            backgroundColor: language.backgroundColor,
            color: language.color,
        }
        return <span className={className} key={language.name} style={style}>{language.name}</span>;
    })

    const updateGuessedLetters = (alphabet) => {
        if (!guessedLetters.includes(alphabet)) {
            setGuessedLetters(prevState => [...prevState, alphabet]);
        }
    }

    const letterElements = currentLanguage.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letters",
        )
        return <span key={index} className={letterClassName}>{shouldRevealLetter ? letter.toUpperCase() : ""}</span>
    });

    const keyboardElements = alphabets.split("").map((alphabet) => {
        let style
        if (guessedLetters.includes(alphabet)) {
            if (currentLanguage.includes(alphabet)) {
                style = {
                    backgroundColor: "#10A95B",
                }
            } else {
                style = {
                    backgroundColor: "#EC5D49",
                }
            }
        }
        return (
            <button disabled={isGameOver} aria-disabled={guessedLetters.includes(alphabet)} aria-label={`Label ${alphabet}`} style={style} onClick={() => updateGuessedLetters(alphabet)}
                    key={alphabet}>{alphabet.toUpperCase()}</button>
        )
    });

    const startNewGame = () => {
        setCurrentLanguage(getRandomWord)
        setGuessedLetters([])
    }

    return (
        <main style={{width: "100%"}}>
            {isGameWon && <Confetti recycle={false} numberOfPieces={1000}/>}
            <Header/>
            <GameStatus isGameWon={isGameWon} isGameLost={isGameLost} isGameOver={isGameOver} isLastGuessIncorrect={isLastGuessIncorrect} lostLanguage={wrongGuessCount > 0 ? languages[wrongGuessCount - 1].name : ""} />
            <section className="language-chips">
                {languageElements}
            </section>
            <section className="word">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver && <button onClick={startNewGame} className="new-game">New Game</button>}
        </main>
    )
}

