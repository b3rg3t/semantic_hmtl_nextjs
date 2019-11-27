export default props => (
  <>
    <li>
      <label>
        <input
          // id={props.voteID}
          type="radio"
          name="choice"
          onChange={props.handleChange}
          value={150}
          checked={150 === props.vote}
          required
        />
        bad data
      </label>
    </li>
  </>
);
