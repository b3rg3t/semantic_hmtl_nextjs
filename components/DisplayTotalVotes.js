export default ({ questions }) => (
  <>
    <p>
      Total votes:{"  "}
      {questions.choices.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.votes;
      }, 0)}
    </p>
  </>
);
