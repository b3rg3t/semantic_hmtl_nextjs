import { useState } from "react";
import {BASE_URL} from "../../paths/url"

const axios = require("axios");

const FormQuestion = props => {
  const [question, setQuestion] = useState("");

  // const handleChange = event => {
  //   setQuestion(event.target.value);
  // };
  const onSubmit = async event => {
    event.preventDefault();
    // console.log("runrunrun");
    let date = new Date();
    let resStatus;
    let resData;
    try {
      const postChoice = await axios.post(
        `${BASE_URL}polls/questions/`,
        { question_text: question, pub_date: date, choices: props.choiceList }
      );
      resStatus = await postChoice.status;
      resData = await postChoice.data;
      if (resStatus === 201) {
        props.onSubmitCallback(resData);
        props.emptyChoiceList([]);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const CloseForm = () => {
    props.onButtonCloseCallback(true);
  };
  return (
    <div className="form__">
      <button onClick={CloseForm} className="form__button" title="Close form">
        X
      </button>
      <div className="form__div">
        <form onSubmit={onSubmit} className="form__question">
          <h4>Submit a new question</h4>
          <label>
            Question:
            <br />
            <input
              type="text"
              name="question"
              onChange={event => setQuestion(event.target.value)}
              value={question}
              placeholder="Best animal.."
              required
            />
          </label>
          <input type="submit" value="Submit" className="form__submit" />
        </form>
      </div>
      <div className="form__div form__div__choice">
        <AddChoices
          handleChoiceSubmit={props.handleChoiceSubmit}
          setChoice={props.setChoice}
          choice={props.choice}
        />
      </div>
      <div className="form__div">
        {props.choiceList.length > 0 && <h6>Choices:</h6>}
        <ul >
          {props.choiceList &&
            props.choiceList.map((choice, index) => (
              <li id={index} key={index}>
                <div className="choiceList__div">
                  <span>{choice.choice_text}</span>
                  <button onClick={() => props.updateChoiceList(index)}>X</button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export const AddChoices = props => {
  return (
    <form onSubmit={props.handleChoiceSubmit} className="formChoises">
      <label>
        Choices:
        <input
          type="text"
          value={props.choice}
          onChange={event => props.setChoice(event.target.value)}
          placeholder="Cat.."
        />
      </label>
      <input type="submit" value="+" disabled={props.choice.length === 0} />
    </form>
  );
};
export default FormQuestion;
