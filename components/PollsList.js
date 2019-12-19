import Link from "next/link";
import DisplayTotalVotes from "./DisplayTotalVotes";
import { BASE_URL } from "../paths/url";
import Loading from "./Loading";
import { useState, useEffect } from "react";
const axios = require("axios");
import { FaTrashAlt } from 'react-icons/fa';


export default props => {
  const [loading, setLoading] = useState(true)
  const deleteQuestion = async (poll) => {
    let id = parseInt(poll.id);
    let name = poll.question_text;
    let message;
    let ok = confirm(`Are you sure you want to delete question ${name}`);
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${props.token}`
    };
    if (ok) {
      const res = await axios.delete(`${BASE_URL}polls/questions/${id}/`, {
        headers: headers
      });
      message = await res;
      if (message.status === 204) {
        props.updateListCallback(true);
      }
    }
  };
  useEffect(() => {
    console.log("this tan")
    setTimeout(setLoadingTimer, 3000)
  }, []);

  const setLoadingTimer = () => {
    setLoading(false);
  }
  return (
    <>
      {props.questions.length > 0 ? (
        <ul>
          {props.questions.map(poll => (
            <li id={poll.id} key={poll.id} className="polls__li">
              <div className="polls__li__div">
                <Link href="/polls/[id]" as={`/polls/${poll.id}`}>
                  <a className="polls__li__poll">
                    {poll.question_text.toUpperCase()}
                  </a>
                </Link>
                <button className="delete" title="Delete" onClick={() => deleteQuestion(poll)}>
                  <FaTrashAlt />
                </button>
              </div>
              <div>
                <p className="polls__li__choice">
                  Choices: {poll.choices.length}
                </p>
                <DisplayTotalVotes questions={poll} />
              </div>
              <div>
                <p className="polls__li__date">
                  Published: {poll.pub_date.substring(0, 10)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="polls__li polls__loading">{loading ? <Loading loading={loading}/> : "There is no questions"}</ul>
      )}
    </>
  );
};
