import { cats } from "../dummyData";
import "../layoutFolder/layout.scss";
import Link from "next/link";

const PostLink = ({ id }) => (
    <Link href="/articles/[id]" as={`/articles/${id}`}>
      <a className="cat__link">Read {id}</a>
    </Link>
);

const PrintArt = () => (
  <section id="hej">
    <ul className="article">
      {cats.map((cat, index) => (
        <li className="article__cat" key={index}>
          <article className="article__cat__box">
            <h3>{cat.title}</h3>
            <figure>
              <img className="img" src={cat.pic} alt={cat.alt} />
              <figcaption>{cat.name}</figcaption>
            </figure>
            <div className="article__cat__box__div">
              <hr />
              <span>Estimated time to read: {cat.time}</span>
              <hr />
              <h4>Info</h4>
              <p>{cat.descripion}</p>
              <hr />
              <em>Written by: {cat.author}</em>
            </div>
            <div>
              <PostLink id={cat.title} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  </section>
);

export default PrintArt;
