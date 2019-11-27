import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import AddQuestion from "../components/forms/AddQuestion";
import { useState, useEffect } from "react";
import PollsList from "../components/PollsList";
import DetailQuestions from "../components/DetailQuestions";
// import Error from 'next/error'

const axios = require("axios");

const Polls = props => {
  const [showForm, setShowForm] = useState(false);
  const [questions, setQuestions] = useState([]);
  const ShowForms = form => {
    showForm ? setShowForm(false) : setShowForm(form);
  };
  const UpdateQuestions = question => {
    setQuestions([...questions, question]);
    setShowForm(false);
  };
  useEffect(() => {
    // console.log(props.polls)
    setQuestions(props.polls);
  }, []);
  return (
    <Layout title="Polls">
      <Head>
        <title>Polls</title>
      </Head>
      <main>
        <section className="polls">
          {questions ? (
            <article className="question__list">
              {showForm ? (
                <div className="form">
                  <AddQuestion
                    onSubmitCallback={UpdateQuestions}
                    onButtonCloseCallback={ShowForms}
                  />
                </div>
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
                  <PollsList questions={questions} />
                </ul>
              </section>
            </article>
          ) : (
            <h2>Something went wrong, try again later!</h2>
          )}
        </section>
      </main>
    </Layout>
  );
};

Polls.getInitialProps = async () => {
  let polls;
  try {
    const res = await axios.get(
      "http://yoshi.willandskill.eu:8666/polls/questions/"
    );
    polls = await res.data;
  } catch (error) {
    console.log("this is the error: " + error);
  }
  return { polls: polls };
};
export default Polls;
