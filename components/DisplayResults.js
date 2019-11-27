export default ({ questions }) => (
    <article>
      <h3>Votes:</h3>
      <ul>
        {questions
          ? questions.choices.map(res => (
              <li key={res.id}>
                <p>
                  <b>{res.choice_text}</b>: <i>{res.votes}</i> votes
                </p>
              </li>
            ))
          : null}
      </ul>
    </article>
  );
