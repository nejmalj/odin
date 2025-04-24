import { useState } from 'react';
import { Dice, getSolution } from './modules/game';
import './App.css';

function App() {
    const [dices, setDices] = useState<Dice[]>([]);
    const [solution, setSolution] = useState<[Dice[], Dice[]] | null>(null);
    const [count, setCount] = useState<number>(0);
    const [isCheating, setIsCheating] = useState<boolean>(false);
    const [userSelection, setUserSelection] = useState<[Dice[], Dice[]] | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const throwDices = () => {
        const diceCount = 7;
        const newDices = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6)) as Dice[];
        setDices(newDices);
        setCount(count + 1);
        setSolution(null);
        setIsCheating(false);
        setUserSelection(null);
        setIsCorrect(null);
    };

    const calculateSolution = () => {
        const result = getSolution(dices);
        setSolution(result);
        setIsCheating(true);
    };

    const hasSolution = solution && solution[0].length > 0 && solution[1].length > 0;

    const handleSelection = (dice: Dice, seriesIndex: 0 | 1) => {
        const updatedSelection = [...(userSelection || [[], []])];
        const targetSeries = updatedSelection[seriesIndex];
        const targetSeriesSet = new Set(targetSeries);

        if (targetSeriesSet.has(dice)) {
            targetSeriesSet.delete(dice);
        } else {
            targetSeriesSet.add(dice);
        }

        updatedSelection[seriesIndex] = Array.from(targetSeriesSet);
        // @ts-ignore
        setUserSelection(updatedSelection);
    };

    const checkAnswer = () => {
        if (!userSelection) return;
        const [userSeries1, userSeries2] = userSelection;
        const [correctSeries1, correctSeries2] = solution || [[], []];

        const isCorrectAnswer = (
            (userSeries1.length === correctSeries1.length && userSeries2.length === correctSeries2.length &&
                userSeries1.every(d => correctSeries1.includes(d)) && userSeries2.every(d => correctSeries2.includes(d))) ||
            (userSeries1.length === correctSeries2.length && userSeries2.length === correctSeries1.length &&
                userSeries1.every(d => correctSeries2.includes(d)) && userSeries2.every(d => correctSeries1.includes(d)))
        );

        setIsCorrect(isCorrectAnswer);
    };

    return (
        <>
            <h1>Par Odin</h1>
            <div className="interface">
                <div className="dices">
                    {dices.map((dice, index) => (
                        <div
                            key={index}
                            className={`dice dice-${dice}`}
                        >
                            <span>{Dice[dice]}</span>
                            <div>
                                <button
                                    onClick={() => handleSelection(dice, 0)}
                                    className={`select-btn ${userSelection && userSelection[0].includes(dice) ? 'selected' : ''}`}
                                >
                                    Ajouter à Série 1
                                </button>
                                <button
                                    onClick={() => handleSelection(dice, 1)}
                                    className={`select-btn ${userSelection && userSelection[1].includes(dice) ? 'selected' : ''}`}
                                >
                                    Ajouter à Série 2
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={throwDices}>Lancer les dés</button>
                <button onClick={calculateSolution} disabled={dices.length === 0}>
                    Tricher ?
                </button>

                {isCheating && (
                    <div className="solution">
                        {hasSolution ? (
                            <>
                                <h3>Solution pour les nuls :</h3>
                                <p>Série 1: {solution[0].map(d => Dice[d]).join(', ')}</p>
                                <p>Série 2: {solution[1].map(d => Dice[d]).join(', ')}</p>
                            </>
                        ) : (
                            <p>C'était un piège, il n'y a pas de solution !</p>
                        )}
                    </div>
                )}

                <div className="selection">
                    <h3>Votre sélection :</h3>
                    <div className="user-selection">
                        <div>
                            <h4>Série 1</h4>
                            {userSelection && userSelection[0].map((d, i) => (
                                <span key={i} className="selected-dice">{Dice[d]}</span>
                            ))}
                        </div>
                        <div>
                            <h4>Série 2</h4>
                            {userSelection && userSelection[1].map((d, i) => (
                                <span key={i} className="selected-dice">{Dice[d]}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {userSelection && (
                    <button onClick={checkAnswer} disabled={userSelection[0].length === 0 || userSelection[1].length === 0}>
                        Vérifier la réponse
                    </button>
                )}

                {isCorrect !== null && (
                    <div className="result">
                        {isCorrect ? <p>Bravo, vous avez trouvé la bonne combinaison !</p> : <p>Dommage, essayez encore !</p>}
                    </div>
                )}

                <p>Lancers : {count}</p>
            </div>
        </>
    );
}

export default App;
