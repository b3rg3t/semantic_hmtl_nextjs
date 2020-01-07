import { useState, useEffect } from "react";
import Layout from "../../components/layoutFolder/Layout";
import Link from "next/link";
import { withRouter } from "next/router";
import Head from "next/head";
import Loading from "../../components/Loading.js"
import ChoiceForm from "../../components/forms/ChoiceForm";
import DisplayTotalVotes from "../../components/DisplayTotalVotes";
import DisplayResults from "../../components/DisplayResults";
import { AddChoices } from "../../components/forms/AddQuestion";
import { BASE_URL } from "../../paths/url";
import { withAuthSync } from "../../lib/auth";
import Router from "next/router";
import {
  FaArrowCircleLeft,
  FaPlus,
  FaTimes,
  FaCheckCircle
} from "react-icons/fa";

const axios = require("axios");

const Choice = ({ poll, id, token }) => {
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
    const fetch = async () => {
      let polls;
      try {
        const response = await axios.get(`${BASE_URL}polls/questions/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        polls = await response.data;
        return setQuestions(polls);
      } catch (error) {
        // console.log(error);
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
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`
    };
    const data = { choice: vote };
    try {
      const postChoice = await axios.post(
        `${BASE_URL}polls/questions/${poll.id}/vote/`,
        data,
        {
          headers: headers
        }
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
      // console.log(error);
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
        { choice_text: choice },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      choices = await choiceResponse.status;
      if (choices === 201) {
        setChoice("");
        setRunEffect(true);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <Layout token={token}>
      {questions ? (
        <>
          <Head>
            <title>Poll {questions.id}</title>
          </Head>
          <main>
            <section className="polls__id">
              <Link href="/polls">
                <a className="submit-button">
                  <FaArrowCircleLeft className="back__button__arrow" />
                  Back
                </a>
              </Link>
              {questions ? (
                <div className="response">
                  {questions.choices.length === 0 ? (
                    <>
                      <h2>{`There is no choises to "${questions.question_text}"`}</h2>
                      <div className="choice__div">
                        <AddChoices
                          setChoice={setChoice}
                          choice={choice}
                          handleChoiceSubmit={submitChoice}
                        />
                      </div>
                    </>
                  ) : (
                    <div>
                      {status > 200 ? (
                        <h3 className="error">{`Your vote didn't submit!! status: ${status}`}</h3>
                      ) : null}
                      {status === 200 ? (
                        <div className="statusOK">
                          <h4>
                            <FaCheckCircle />
                          </h4>
                          <p className="ok">
                            Voted for:
                            <br />
                            <b className="voted">{voteVoted[0]}</b>
                            <br />
                            Question: <br />
                            <b>{questions.question_text}</b>
                          </p>
                        </div>
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
                              <button className="delete" onClick={ShowForms}>
                                <FaTimes />
                              </button>
                            </div>
                          ) : (
                            <div className="choice__div no__border">
                              <button
                                className="add-button"
                                onClick={ShowForms}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          )}
                          <ChoiceForm
                            questions={questions}
                            handleChange={handleChange}
                            onSubmit={onSubmit}
                            vote={vote}
                          />
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
                <Loading loading={true}/>
              )}
            </section>
          </main>
        </>
      ) : (
        <div className="polls__id">
          <Loading loading={true}/>
        </div>
      )}
    </Layout>
  );
};

Choice.getInitialProps = async (context, token) => {
  const { id } = context.query;
  let poll;
  try {
    const response = await axios.get(`${BASE_URL}polls/questions/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    poll = await response.data;
  } catch (error) {
    // console.log(error);
    if (typeof window === "undefined") {
      context.res.writeHead(302, { Location: "/login" });
      context.res.end();
    } else {
      Router.push("/login");
    }
  }
  return { poll: poll, id: id };
};

export default withAuthSync(withRouter(Choice));
