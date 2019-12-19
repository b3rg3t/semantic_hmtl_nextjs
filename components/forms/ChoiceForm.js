export default ({ questions, handleChange, vote, onSubmit }) => (
  <>
    <form onSubmit={onSubmit} method="post" className="choice__form">
      <ul>
        {questions
          ? questions.choices.map(choice => (
              <li key={choice.id}>
                <label>
                  <input
                    id={choice.id}
                    type="radio"
                    name="choice"
                    onChange={handleChange}
                    value={choice.id}
                    checked={choice.id === vote}
                    required
                  />
                  {choice.choice_text}
                </label>
              </li>
            ))
          : null}
      </ul>
      <div className="response__div">
        <input className="submit-button" type="submit" value="Submit" />
      </div>
    </form>
  </>
);
