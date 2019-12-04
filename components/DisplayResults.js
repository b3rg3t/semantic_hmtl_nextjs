import React from "react";
import Chart from "react-google-charts";

export default ({ questions }) => (
  <article>
    <div className="result">
      <div>
        <ResponseChart questions={questions} />
      </div>
      <div>
        <ul className="displayresult__">
          {questions &&
            questions.choices.sort((a, b) => b.votes - a.votes).map(res => (
              <li key={res.id}>
                <p>
                  <b>{res.choice_text}</b>: <i>{res.votes}</i> votes
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  </article>
);



const ResponseChart = ({ questions }) => {
  const data = questions.choices.map(choice => [
    choice.choice_text,
    choice.votes
  ]);

  // console.log(data);
  const pieOptions = {
    title: "",
    is3D: true,
    pieHole: 0.6,
    slices: [
      {
        color: "#2BB673"
      },
      {
        color: "#d91e48"
      },
      {
        color: "#007fad"
      },
      {
        color: "#e9a227"
      }
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 14
      }
    },
    tooltip: {
      showColorCode: true
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "100%"
    },
    fontName: "Roboto"
  };
  return (
    <div className="App">
      <Chart
        chartType="PieChart"
        data={[["Choice", "Vote"], ...data]}
        loader={<div>Loading Chart</div>}
        options={pieOptions}
        graph_id="PieChart"
        width={"100%"}
        height={"400px"}
        legend_toggle
      />
    </div>
  );
};
