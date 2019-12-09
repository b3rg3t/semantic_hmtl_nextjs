import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import AddQuestion from "../components/forms/AddQuestion";
import { useState, useEffect } from "react";
import PollsList from "../components/PollsList";
import { withRouter } from "next/router";
import DetailsPolls from "../components/DetailsPolls";
import { BASE_URL } from "../paths/url";// import cookies from 'next-cookies'
import { withAuthSync, LogOut } from "../lib/auth";

const axios = require("axios");

const Polls = props => {
  const [showForm, setShowForm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [choiceList, setChoiceList] = useState([]);
  const [choice, setChoice] = useState("");

  const ShowForms = form => {
    showForm ? setShowForm(false) : setShowForm(form);
  };
  //Callback functions
  const UpdateQuestions = question => {
    setQuestions([question, ...questions]);
    setShowForm(false);
  };
  const UpdateTheList = update => {
    setUpdateList(update);
  };
  //UseEffect functions
  useEffect(() => {
    setQuestions(props.polls);
  }, []);

  //Updates PollsList with updated polls after submitting new poll
  useEffect(() => {
    const updateView = async () => {
      let updatedData;
      try {
        const res = await axios.get(`${BASE_URL}polls/questions/`, {
          headers: { Authorization: `Bearer ${props.token}` }
        });
        updatedData = await res.data;
        if (updateList) {
          setQuestions(updatedData);
          setUpdateList(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateView();
  }, [updateList]);
  const handleChoiceSubmit = event => {
    event.preventDefault();
    choiceList.push({ choice_text: choice });
    setChoiceList(choiceList);
    setChoice("");
  };
  const updateChoiceList = index => {
    let choiceID = index;
    parseInt(choiceID);
    const newChoiceList = choiceList.slice();
    newChoiceList.splice(choiceID, 1);
    setChoiceList(newChoiceList);
  };
  return (
    <Layout title="Polls" token={props.token}>
      <Head>
        <title>Polls</title>
      </Head>
      <main>
        <section className="polls">
          {questions ? (
            <section className="question__list">
              {showForm ? (
                <article className="form">
                  <AddQuestion
                    onSubmitCallback={UpdateQuestions}
                    onButtonCloseCallback={ShowForms}
                    choiceList={choiceList}
                    handleChoiceSubmit={handleChoiceSubmit}
                    setChoice={setChoice}
                    choice={choice}
                    emptyChoiceList={setChoiceList}
                    choiceList={choiceList}
                    updateChoiceList={updateChoiceList}
                    token={props.token}
                  />
                </article>
              ) : (
                <article className="question__list__div">
                  <span>Add question:</span>
                  <button onClick={ShowForms} title="Add question">
                    +
                  </button>
                </article>
              )}
              <section className="question__list__list">
                <ul>
                  <PollsList
                    questions={questions}
                    updateListCallback={UpdateTheList}
                    token={props.token}
                  />
                </ul>
                <DetailsPolls questions={questions} />
              </section>
            </section>
          ) : (
            <h2>Something went wrong, try again later!</h2>
          )}
        </section>
      </main>
    </Layout>
  );
};

Polls.getInitialProps = async (context, token) => {
  let polls;
  try {
    const res = await axios.get(`${BASE_URL}polls/questions/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    polls = await res.data;
  } catch (error) {
    console.log(error);
    LogOut(); 
  }
  return { polls: polls };
};
export default withAuthSync(withRouter(Polls));
