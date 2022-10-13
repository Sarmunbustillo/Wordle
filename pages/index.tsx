import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { WORDS } from '../public/words';
import Head from 'next/head';

const randomWord =
    WORDS[Math.floor(Math.random() * WORDS.length)].toLowerCase();

const Home: NextPage = () => {
    const [guess, setGuess] = useState(false);
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);
    const [board, setBoard] = useState(
        Array.from(new Array(6), () => new Array(5).fill(null))
    );

    useEffect(() => {
        if (guess) return;
        const isLetter = /^[A-Za-z]+$/;
        function handleKeyDown(e: KeyboardEvent) {
            // Copy the board
            const newBoard = [...board];

            // Ignore non-letter keys
            if (
                ((e.key == 'Tab' || e.key == 'CapsLock' || e.key == 'Shift',
                e.key.startsWith('Arrow')),
                e.key == 'Enter')
            ) {
                return;
            }

            // On backspace, clear the current cell
            if (e.key == 'Backspace' && col >= 0) {
                newBoard[row][col - 1] = null;
                setCol(() => col - 1);
                setBoard(newBoard);
                return;
            }
            // If letter is pressed
            if (e.key.match(isLetter)) {
                // If is the last cell, ignore
                if (row > 5) {
                    return;
                }
                // If is empty, add letter
                if (newBoard[row][col] === null) {
                    newBoard[row][col] = e.key;
                    setCol(() => col + 1);

                    // If we have a match, set guess to true
                    if (newBoard[row].join('') === randomWord) {
                        setGuess(true);
                        return;
                    }
                }

                // If is full, go to next row
                if (col === 4) {
                    setRow(() => row + 1);
                    setCol(() => 0);
                }
                // set
                setBoard(newBoard);
            } else {
                console.log('invalid key');
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [board, col, row, guess]);

    return (
        <>
            <Head>
                <title>Wordle By Sarmun</title>
            </Head>
            <div className="board">
                {board.map((word, i) => (
                    <article className="word" key={i}>
                        {word.map((letter: string, index: number) => (
                            <div
                                className={`letter ${
                                    letter === randomWord[index]
                                        ? 'correct'
                                        : randomWord.includes(letter)
                                        ? 'partial'
                                        : ''
                                }`}
                                key={index}
                            >
                                {letter}
                            </div>
                        ))}
                    </article>
                ))}
                {guess ? <h1>Victory!</h1> : null}
            </div>
        </>
    );
};
``;

export default Home;
