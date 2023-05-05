import React, { useState } from "react";

function QuestionForm({ onQuestionAdded }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const questionObj = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: parseInt(formData.correctIndex),
    };
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionObj),
    })
      .then((res) => res.json())
      .then((data) => {
        onQuestionAdded(data);
        setFormData({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: 0,
        });
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        {/* form fields */}
        <div>
          <label htmlFor="prompt">Prompt:</label>
          <input type="text" id="prompt" name="prompt" value={formData.prompt} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="answer1">Answer 1:</label>
          <input type="text" id="answer1" name="answer1" value={formData.answer1} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="answer2">Answer 2:</label>
          <input type="text" id="answer2" name="answer2" value={formData.answer2} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="answer3">Answer 3:</label>
          <input type="text" id="answer3" name="answer3" value={formData.answer3} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="answer4">Answer 4:</label>
          <input type="text" id="answer4" name="answer4" value={formData.answer4} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="correctIndex">Correct Answer:</label>
          <select id="correctIndex" name="correctIndex" value={formData.correctIndex} onChange={handleChange}>
            <option value={0}>Answer 1</option>
            <option value={1}>Answer 2</option>
            <option value={2}>Answer 3</option>
            <option value={3}>Answer 4</option>
          </select>
        </div>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
