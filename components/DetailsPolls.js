export default props => (
  <>
    <aside className="details__">
      <div className="details__div">
        <h3>Details</h3>
        {props.questions && <p>Total questions: {props.questions.length}</p>}
        {props.questions && (
          <p>
            Total votes:{" "}
            {props.questions.reduce((acc,question) => {
            return acc + question.choices.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.votes;
              }, 0
            )}, 0)}
          </p>
        )}
      </div>
    </aside>
  </>
);
