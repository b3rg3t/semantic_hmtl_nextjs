export default ({ questions }) => (
  <>
    <p className="total__votes">
      Votes:{"  "}
      {questions.choices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.votes;
      }, 0)}
    </p>
  </>
);
