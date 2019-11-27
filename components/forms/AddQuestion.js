import { useState } from "react";

const axios = require("axios");

const FormQuestion = props => {
  const [question, setQuestion] = useState("");

  const handleChange = event => {
    setQuestion(event.target.value);
  };
  const onSubmit = async event => {
    event.preventDefault();
    console.log("runrunrun");
    let date = new Date();
    let resStatus;
    let resData;
    try {
      const postChoice = await axios.post(
        "http://yoshi.willandskill.eu:8666/polls/questions/",
        { question_text: question, pub_date: date }
      );
      resStatus = await postChoice.status;
      resData = await postChoice.data;
      console.log(resData);
      console.log(postChoice);
      if (resStatus === 201) {
        console.log(resStatus);
        props.onSubmitCallback(resData);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const CloseForm = () => {
    props.onButtonCloseCallback(true)
  }
  return (
    <div className="form__">
      <button onClick={CloseForm} title="Close form">
        X
      </button>
      <form onSubmit={onSubmit} className="form__question">
        <h4>Submit a new question</h4>
        <label>
          Question:
          <br />
          <input
            type="text"
            name="question"
            onChange={handleChange}
            value={question}
            placeholder="Text"
            required
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default FormQuestion;
