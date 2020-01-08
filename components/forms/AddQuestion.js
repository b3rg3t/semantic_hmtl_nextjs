import { useState } from "react";
import { BASE_URL } from "../../paths/url";
import { FaTimes, FaQuestionCircle, FaPlus } from "react-icons/fa";
const axios = require("axios");

const FormQuestion = props => {
  const [question, setQuestion] = useState("");

  const onSubmit = async event => {
    event.preventDefault();
    let date = new Date();
    let resStatus;
    let resData;
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${props.token}`
    };
    const data = {
      question_text: question,
      pub_date: date,
      choices: props.choiceList
    };
    console.log(props.token)
    try {
      const postChoice = await axios.post(`${BASE_URL}polls/questions/`, data, {
        headers: headers
      });
      resStatus = await postChoice.status;
      resData = await postChoice.data;
      if (resStatus === 201) {
        props.onSubmitCallback(resData);
        props.emptyChoiceList([]);
      } else {
        console.log("Error");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const CloseForm = () => {
    props.onButtonCloseCallback(true);
  };
  return (
    <div className="form__container">
      <button
        onClick={CloseForm}
        className="form__button x-button"
        title="Close form"
      >
        <FaTimes />
      </button>
      <div className="form__container__wrapper">
        <div className="form__container__div">
          <form onSubmit={onSubmit} className="form__question">
            <h4>
              Submit a new question
              {" "}<FaQuestionCircle />
            </h4>
            <label>
              Question:
              <br />
              <input
                type="text"
                name="question"
                onChange={event => setQuestion(event.target.value)}
                value={question}
                placeholder="Best animal.."
                maxLength="200"
                required
              />
            </label>
            <div className="form__question__button">
              <button type="submit" className="form__submit submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="form__container__div form__div__choice">
          <AddChoices
            handleChoiceSubmit={props.handleChoiceSubmit}
            setChoice={props.setChoice}
            choice={props.choice}
          />
        </div>
      </div>
      <div className="form__container__list">
        {props.choiceList.length > 0 && <h6>Choices:</h6>}
        <ul>
          {props.choiceList &&
            props.choiceList.map((choice, index) => (
              <li id={index} key={index}>
                <div className="choiceList__div">
                  <span>{choice.choice_text}</span>
                  <button
                    className="delete"
                    onClick={() => props.updateChoiceList(index)}
                  >
                    <FaTimes />
                  </button>
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
    <form onSubmit={props.handleChoiceSubmit} className="form__choices">
      <label>
        Choice:
        <input
          type="text"
          value={props.choice}
          onChange={event => props.setChoice(event.target.value)}
          placeholder="Cat.."
        />
      </label>
      <div>
        <button
          className="add-button"
          title="Add choice"
          type="submit"
          disabled={props.choice.length === 0}
        >
          <FaPlus />
        </button>
      </div>
    </form>
  );
};
export default FormQuestion;
