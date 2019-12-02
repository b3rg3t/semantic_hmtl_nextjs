import { useState, useEffect } from "react";
import Layout from "../../components/layoutFolder/Layout";
import Link from "next/link";
import { withRouter } from "next/router";
import Head from "next/head";
import BadData from "../../components/BadData";
import ChoiceForm from "../../components/forms/ChoiceForm";
import DisplayTotalVotes from "../../components/DisplayTotalVotes";
import DisplayResults from "../../components/DisplayResults";
import { AddChoices } from "../../components/forms/AddQuestion";

const axios = require("axios");

const Choice = ({ poll, id }) => {
  const [vote, setVote] = useState(0);
  const [showRes, setShowRes] = useState(false);
  const [status, setStatus] = useState("");
  const [questions, setQuestions] = useState("");
  const [runEffect, setRunEffect] = useState(false);
  const [voteVoted, setVoteVoted] = useState("");
  const [choiceList, setChoiceList] = useState([]);
  const [choice, setChoice] = useState("");

  useEffect(() => {
    console.log("first useeffect");
    setQuestions(poll);
  }, []);
  useEffect(() => {
    const fetch = async function fetchData() {
      let polls;
      console.log("second useEffect");
      try {
        const response = await axios.get(
          `http://yoshi.willandskill.eu:8666/polls/questions/${id}/`
        );
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

  const onSubmit = async event => {
    event.preventDefault();
    let resStatus;
    // let postRes;
    try {
      const postChoice = await axios.post(
        "http://yoshi.willandskill.eu:8666/polls/questions/" +
          poll.id +
          "/vote/",
        { choice: vote }
      );
      resStatus = await postChoice.status;
      // postRes = await postChoice.data.choices;
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
    console.log(filteredChoice.map(c => c.choice_text));
    setVoteVoted(filteredChoice.map(c => c.choice_text));
  };
  const submitChoice = async event => {
    event.preventDefault();
    let choices;
    try {
      const choiceResponse = await axios.post(
        `http://yoshi.willandskill.eu:8666/polls/questions/${id}/choices/`,
        { choice_text: choice }
      );
      choices = await choiceResponse.data;
      console.log(choices);
      setChoice("")
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
                <div>
                  <h2>{`There is no choises to "${questions.question_text}"`}</h2>
                  <AddChoices
                    setChoice={setChoice}
                    choice={choice}
                    handleChoiceSubmit={submitChoice}
                  />
                </div>
              ) : (
                <div>
                  {status > 200 ? (
                    <h3 className="error">{`Your vote didn't submit!! status: ${status}`}</h3>
                  ) : null}
                  {status === 200 ? (
                    <h3 className="ok">
                      Vote for <b className="voted">{voteVoted[0]}</b> was
                      submitted{` with status: ${status} = OK`}
                    </h3>
                  ) : (
                    <div className="response">
                      <h2>{questions.question_text}</h2>
                      <AddChoices
                        setChoice={setChoice}
                        choice={choice}
                        handleChoiceSubmit={submitChoice}
                      />
                      <form onSubmit={onSubmit} method="post">
                        <ul>
                          <ChoiceForm
                            questions={questions}
                            handleChange={handleChange}
                            vote={vote}
                          />
                          <BadData handleChange={handleChange} vote={vote} />
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
  console.log(id);
  let poll;
  try {
    const response = await axios.get(
      `http://yoshi.willandskill.eu:8666/polls/questions/${id}/`
    );
    poll = await response.data;
  } catch (error) {
    console.log(error);
  }
  return { poll: poll, id: id };
};

export default withRouter(Choice);
