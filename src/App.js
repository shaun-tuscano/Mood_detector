// App.js

import React, { useState } from 'react';
import './App.css';
import Footer from './components/Footer';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [emoji, setEmoji] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmitButtonClicked = async () => {
    // Make the API request here
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You will be provided with a description of a mood, and your task is to provide me with a  simple Emoji based on my mood.',
          },
          {
            role: 'user',
            content: inputValue,
          },
        ],
        temperature: 0.7,
        max_tokens: 264,
        top_p: 1,
      }),
    });

    const data = await response.json();

    // Handle the response from the API
    if (data.choices && data.choices[0] && data.choices[0].message) {
      setEmoji(data.choices[0].message.content);
    }
  };

  const disableStyle = {
    opacity:0.5,
    pointer:'none',
    backgroundcolor: 'gray',
    cursor: 'not-allowed',

  }

  return (
    <div className="App">
      <div className='title'>Hi User 😊</div>
      <div className='sub-title'>
        Please describe your day here. I will help you identify how  your day was and determine your mood accordingly.
      </div>
      <textarea
        className='input-box'
        placeholder='Type here...'
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className='submit-button' onClick={onSubmitButtonClicked} style={inputValue?{}:disableStyle}  >Submit</button>
      <br/><br/><br/>
      {emoji && <div style={{fontSize:75}}>{emoji}</div>}
      <div style={{position:'absolute',bottom:0, width:'100%'}}><Footer></Footer></div>
    </div>
  );
}

export default App;
