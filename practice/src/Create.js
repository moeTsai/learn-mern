import React, {useState} from 'react'

const Create = () => {
    let [input, setInput] = useState('');
    let [messages, setMessages] = useState([]);
    const submitButtonHandler = (e) => {
        e.preventDefault();
        setMessages([...messages, input]);
        setInput('');
    }

    const changeHandler = (e) => {
        setInput(e.target.value);
    }

  return (
    <form>
        <input onChange={changeHandler} type="text" />
        <button onClick={submitButtonHandler}>submit</button>
    </form>
  )
}

export default Create