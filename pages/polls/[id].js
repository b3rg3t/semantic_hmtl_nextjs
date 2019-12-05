import { useState, useEffect } from "react";
import Layout from "../../components/layoutFolder/Layout";
import Link from "next/link";
import { withRouter } from "next/router";
import Head from "next/head";
// import BadData from "../../components/BadData";
import ChoiceForm from "../../components/forms/ChoiceForm";
import DisplayTotalVotes from "../../components/DisplayTotalVotes";
import DisplayResults from "../../components/DisplayResults";
import { AddChoices } from "../../components/forms/AddQuestion";
import { BASE_URL } from "../../paths/url";

const axios = require("axios");

const Choice = ({ poll, id }) => {
  const [vote, setVote] = useState(0);
  const [showRes, setShowRes] = useState(false);
  const [status, setStatus] = useState("");
  const [questions, setQuestions] = useState("");
  const [runEffect, setRunEffect] = useState(false);
  const [voteVoted, setVoteVoted] = useState("");
  const [choice, setChoice] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setQuestions(poll);
  }, []);

  useEffect(() => {
    const fetch = async function fetchData() {
      let polls;
      try {
        const response = await axios.get(`${BASE_URL}polls/questions/${id}/`);
        polls = await response.data;
        return setQuestions(polls);
      } catch (error) {
        console.log(error);
      }
    };

    if (runEffect) {
      fetch();
      setRunEffect(false);
    }
  }, [runEffect]);

  const ShowForms = form => {
    showForm ? setShowForm(false) : setShowForm(form);
  };
  const onSubmit = async event => {
    event.preventDefault();
    let resStatus;
    try {
      const postChoice = await axios.post(
        `${BASE_URL}polls/questions/${poll.id}/vote/`,
        { choice: vote }
      );
      resStatus = await postChoice.status;
      if (resStatus === 200) {
        setShowRes(true);
        setStatus(resStatus);
        setRunEffect(true);
        FilterChoice();
      } else {
        console.log("Error");
        setStatus(resStatus);
      }
    } catch (error) {
      console.log(error);
      setStatus(error.response.status);
    }
  };

  const handleChange = event => {
    setVote(parseInt(event.target.value));
  };

  const FilterChoice = () => {
    let filteredChoice = poll.choices.filter(a => vote == a.id);
    setVoteVoted(filteredChoice.map(c => c.choice_text));
  };

  const submitChoice = async event => {
    event.preventDefault();
    let choices;
    try {
      const choiceResponse = await axios.post(
        `${BASE_URL}polls/questions/${id}/choices/`,
        { choice_text: choice }
      );
      choices = await choiceResponse.status;
      if (choices === 201) {
        setChoice("");
        setRunEffect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Head>
        <title>Poll {questions.id}</title>
      </Head>
      <main>
        <section className="polls__id">
          <Link href="/polls">
            <a className="back__button">{`< Back`}</a>
          </Link>
          {questions ? (
            <div>
              {questions.choices.length === 0 ? (
                <div className="no__choice">
                  <h2>{`There is no choises to "${questions.question_text}"`}</h2>
                  <div className="choice__div no__choice__div">
                    <AddChoices
                      setChoice={setChoice}
                      choice={choice}
                      handleChoiceSubmit={submitChoice}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {status > 200 ? (
                    <h3 className="error">{`Your vote didn't submit!! status: ${status}`}</h3>
                  ) : null}
                  {status === 200 ? (
                    <h3 className="ok">
                      Vote for <b className="voted">{voteVoted[0]}</b> was
                      submitted to question {questions.question_text}
                      {` with status: ${status} = OK`}
                    </h3>
                  ) : (
                    <div className="response">
                      <h2>{questions.question_text}</h2>
                      {showForm ? (
                        <div className="choice__div">
                          <AddChoices
                            setChoice={setChoice}
                            choice={choice}
                            handleChoiceSubmit={submitChoice}
                          />
                          <button
                            className="choice__div__button"
                            onClick={ShowForms}
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <div className="choice__div">
                          <button onClick={ShowForms}>+</button>
                        </div>
                      )}
                      <form onSubmit={onSubmit} method="post">
                        <ul>
                          <ChoiceForm
                            questions={questions}
                            handleChange={handleChange}
                            vote={vote}
                          />
                        </ul>
                        <div className="response__div">
                          <input
                            className="choice__button"
                            type="submit"
                            value="Submit"
                          />
                        </div>
                      </form>
                    </div>
                  )}
                  {showRes ? (
                    <div>
                      <DisplayResults questions={questions} />
                      <DisplayTotalVotes questions={questions} />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ) : (
            "Loading..."
          )}
        </section>
      </main>
    </Layout>
  );
};

Choice.getInitialProps = async context => {
  const { id } = context.query;
  let poll;
  try {
    const response = await axios.get(`${BASE_URL}polls/questions/${id}/`);
    poll = await response.data;
  } catch (error) {
    console.log(error);
  }
  return { poll: poll, id: id };
};

export default withRouter(Choice);
