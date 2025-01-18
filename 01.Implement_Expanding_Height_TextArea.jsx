import { useRef, useState } from 'react';
import './App.css';

function App() {
  // State to track the current text in the textarea
  const [text, setText] = useState('');

  // Reference to the textarea DOM element
  const textAreaRef = useRef(null);

  // Handler to update the text and adjust the height of the textarea dynamically
  const handleTextChange = (e) => {
    // Update the state with the current value of the textarea
    setText(e.target.value);

    // Reset the height to 'inherit' to recalculate based on content
    textAreaRef.current.style.height = 'inherit';

    // Get the scroll height of the textarea to accommodate its content
    const scrollHeight = textAreaRef.current.scrollHeight;

    // Set the textarea's height to match its scroll height
    textAreaRef.current.style.height = `${scrollHeight}px`;
  };

  return (
    <div>
      <section className="container">
        <h1>Expanding TextArea</h1>
        <textarea
          id="textarea"
          placeholder="Enter some text here" // Placeholder text for the textarea
          value={text} // Bind the textarea value to the component's state
          onChange={handleTextChange} // Attach the change handler to update text and adjust height
          ref={textAreaRef} // Attach the ref to the textarea for DOM manipulation
        ></textarea>
      </section>
    </div>
  );
}

export default App;
