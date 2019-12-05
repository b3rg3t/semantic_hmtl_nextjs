import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import PrintArticle from "../components/articlesFolder/printArt";

const Articles = (props) => {

  return (
    <Layout title="Articles" token={props.token}>
      <Head>
        <title>Articles</title>
      </Head>
      <main>
        <div>
          <PrintArticle />
        </div>
      </main>
    </Layout>
  );
};


export default Articles;
