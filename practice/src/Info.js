import React, {useState} from 'react'

const Info = () => {
  let [name, changeName] = useState('John');
  let age = 25;
  const changeNameHandler = (newName) => {
    changeName(newName);
  }
  return (

    <div className="info">
      <h1></h1>
        <h1>friend name: {name}</h1>
        <h1>friend age : {age}</h1>
        <button onClick={() => (
        changeNameHandler('Jane')
  )}>改名字</button>
    </div>
  )
}

export default Info