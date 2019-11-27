import Link from "next/link";

export default props => {
  props.questions.sort((a, b) => b.id - a.id);
  return (
    <>
      {props.questions.map(poll => (
        <li key={poll.id} className="polls__li">
          <div>
            <Link href="/polls/[id]" as={`/polls/${poll.id}`}>
              <a className="polls__li__poll">
                {poll.question_text.toUpperCase()}
              </a>
            </Link>
            <hr />
          </div>
          <div>
            <p className="polls__li__choice">Choices: {poll.choices.length}</p>
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
