import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";

const Index = (props) => {
  return (
    <Layout title="Home Page" token={props.token}>
      <Head>
        <title>Cat</title>
      </Head>
      <main>
        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
            quidem doloremque animi asperiores sit error vitae, similique
            quaerat nesciunt assumenda architecto dignissimos molestias
            praesentium magni delectus! Tempora unde qui nesciunt?
          </p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint quidem
          doloremque animi asperiores sit error vitae, similique quaerat
          nesciunt assumenda architecto dignissimos molestias praesentium magni
          delectus! Tempora unde qui nesciunt?
          &#128077;
        </div>
      </main>
    </Layout>
  );
}



export default Index;