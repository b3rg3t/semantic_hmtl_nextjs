import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import PrintArticle from "../components/articlesFolder/printArt";

const Articles = () => {
  return (
    <Layout title="Articles">
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
