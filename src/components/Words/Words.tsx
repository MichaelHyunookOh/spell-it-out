import React, {useState, useEffect} from 'react'



export default function Words () {
    const [word, setWord] = useState([])
    const [answer, setAnswer] = useState('')
    const [isCorrect, setisCorrect] = useState(Boolean)
    const [isChecked, setisChecked] = useState(false)

    const getNewWord = () => {
        fetch(`https://random-word-api.herokuapp.com/word?number=1`, {
            method: "GET",
        })
        .then((res) => 
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json())
        .then((responseData) => {
            setWord(responseData);
            setisChecked(false)
            var msg = new SpeechSynthesisUtterance(responseData);
            window.speechSynthesis.speak(msg);
        })
        .catch((error) => {});
    }

    const replayWord = () => {
        var msg = new SpeechSynthesisUtterance(word[0]);
        window.speechSynthesis.speak(msg)
    }

    const checkAnswer = () => {
        console.log(answer)
        console.log(word)
        console.log(word[0])
        // if (answer === word[0]) {
        //     setisCorrect(true)
        // } 
        // console.log(isCorrect)
        setisChecked(true)
        console.log(isCorrect)
        
    }

    const displayCorrect = () => {
        if(answer === word[0]){
            return(
                <div>
                    <p>correct</p>
                </div>
            )
        }
        return(
            <div>
                <p>incorrect</p>
            </div>
        )
    }

    // const displayInCorrect = () => {
    //     alert("nice try but youre wrong")
    // }

    //figure out checking if answer is correct
    // then based on boolean, conditional render something or maybe an alert
    // think about maybe adding score
    // REACH GOAL add some kind of animation or image that the user can see.


    return (
        <section>
        <p>{word[0]}</p>
        <button onClick={getNewWord}>Display Word</button>
        <button onClick={replayWord}>Replay Word</button>
        <div>
        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
            <button onClick={checkAnswer}>Submit</button>
            {isChecked ? displayCorrect() : ""}
            </div>
        </section>
    )
}