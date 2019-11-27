export default ({ questions, handleChange, vote }) => (
  <>
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
  </>
);
