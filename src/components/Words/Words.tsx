import React, {useState, useEffect} from 'react'



export default function Words () {
    const [word, setWord] = useState([])
    const [answer, setAnswer] = useState('')
    const [displayed, isDisplayed] = useState(false)
    const [isCorrect, setisCorrect] = useState(Boolean)
    const [isChecked, setisChecked] = useState(false)

    useEffect(() => {
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
    }, [])

    const displayWord = () => {
        isDisplayed(true)
    }

    const replayWord = () => {
        var msg = new SpeechSynthesisUtterance(word[0]);
        window.speechSynthesis.speak(msg)
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

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(answer == word[0]) {
            alert("correct")
        } else {
            alert("nice try but you are rong stupid")
        }
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
        <p>{displayed && word ? word[0] : ''}</p>
        <button onClick={displayWord}>Display Word</button>
        <button onClick={replayWord}>Replay Word</button>
        <div>
            <form onSubmit={handleSubmit}>
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
            <button type='submit'>Submit</button>
            {isChecked ? displayCorrect() : ""}
            </form>
    
            </div>
        </section>
    )
}