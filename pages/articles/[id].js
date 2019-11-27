import { useRouter } from "next/router";
import Layout from "../../components/layoutFolder/Layout";
import { cats } from "../../components/dummyData";
import Link from 'next/link';
const Post = () => {
  const router = useRouter();

  const FilterCats = () => {
    let cat = cats.filter(c => c.title === router.query.id);
    console.log(cat);
    return (
      <ul>
        {cat.map((k, index) => (
          <li key={index}>
            <p>{k.name}</p>
            <img src={k.pic} alt={k.alt} />
            <p>{k.fulltext}</p>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <Layout>
      <Link href="/articles">
        <a>{`<< Back`}</a>
      </Link>
      <h1>{router.query.id}</h1>
      <FilterCats />
    </Layout>
  );
}

export default Post;
