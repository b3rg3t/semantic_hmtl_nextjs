import Link from "next/link";
import DisplayTotalVotes from "./DisplayTotalVotes";
const axios = require("axios");

export default props => {
  const deleteQuestion = async event => {
    let id = parseInt(event.target.parentNode.parentNode.id);
    let message;
    const res = await axios.delete(
      `http://yoshi.willandskill.eu:8666/polls/questions/${id}/`
    );
    message = await res;
    // console.log(message);
    if (message.status === 204) {
      props.updateListCallback(true);
    }
  };
  ///
  return (
    <>
      {props.questions.map(poll => (
        <li id={poll.id} key={poll.id} className="polls__li">
          <div className="polls__li__div">
            <Link href="/polls/[id]" as={`/polls/${poll.id}`}>
              <a className="polls__li__poll">
                {poll.question_text.toUpperCase()}
              </a>
            </Link>
            <button className="delete" onClick={deleteQuestion}>
              X
            </button>
          </div>
          <div>
            <p className="polls__li__choice">Choices: {poll.choices.length}</p>
            <DisplayTotalVotes questions={poll}/>
          </div>
          <div>
            <p className="polls__li__date">
              Published: {poll.pub_date.substring(0, 10)}
            </p>
          </div>
        </li>
      ))}
    </>
  );
};
