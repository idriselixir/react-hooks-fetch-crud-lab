import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {

  const [originalContent, setOriginalContent] = useState([])

  useEffect(()=>{

      fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => {
        setOriginalContent(data)        
      })

  },[])

  const questions = originalContent.map(question => {
    return(
      <>
        <QuestionItem question={question} key={question.id} content={originalContent} reset={setOriginalContent}/>
      </>
    )
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}</ul>

       <ul>{questions}</ul>
    </section>
  );
}
export default QuestionList;