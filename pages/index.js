import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import { FaBeer } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useAmp } from "next/amp";
import { useState } from "react";

export const config = {
  amp: "hybrid"
};

const Image = ({ src, width, height, className, alt }) => {
  const isAmp = useAmp();
  return isAmp ? (
    <amp-img
      className={className}
      class={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
      layout="intrinsic"
    ></amp-img>
  ) : (
    <img
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
  );
};
const Number = ({ mySite }) => {
  const isAmp = useAmp();
  return isAmp ? <div data-amp-bind-text="foo">0</div> : <div>{mySite}</div>;
};
const Index = props => {
  const [mySite, setMySite] = useState(0);
  return (
    <>
      <Layout title="Home Page" token={props.token}>
        <Head>
          <title>Cat</title>
        </Head>
        <main>
          <div className="index">
            <Image
              className="catimg"
              src="../images/cat1.jpg"
              width="600"
              height="400"
              alt="cat1 behind fence"
            />
            <h1 className="title">"THE MYSTIC CAT SITE"</h1>
          </div>
          <div className="index__content">
            <h3>What a year</h3>
            <hr></hr>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: `<div [text]="0 + foo">0</div>`
              }}
            /> */}
            <amp-sidebar id="sidebar1" style={{display: "none"}} layout="nodisplay" side="left">
              <ul>
                <li>Nav item 1</li>
                <li>
                  <a href="#idTwo" on="tap:idTwo.scrollTo">
                    Nav item 2
                  </a>
                </li>
                <li>Nav item 3</li>
                <li>
                  <a href="#idFour" on="tap:idFour.scrollTo">
                    Nav item 4
                  </a>
                </li>
                <li>Nav item 5</li>
                <li>Nav item 6</li>
              </ul>
            </amp-sidebar>
            <span>
              <FaBeer />
              <div className="buttons">
                <button
                  onClick={() => setMySite(mySite + 1)}
                  on="tap:AMP.setState({foo: foo + 1  })"
                >
                  +
                </button>
                <Number mySite={mySite} />
                <button
                  onClick={() => setMySite(mySite - 1)}
                  on="tap:AMP.setState({foo: foo - 1  })"
                >
                  -
                </button>
              </div>
              <FaTrashAlt color="red" />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
              quidem doloremque animi asperiores sit error vitae, similique
              quaerat nesciunt assumenda architecto dignissimos molestias
              praesentium magni delectus! Tempora unde qui nesciunt?
            </span>
            <hr></hr>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
              quidem doloremque animi asperiores sit error vitae, similique
              quaerat nesciunt assumenda architecto dignissimos molestias
              praesentium magni delectus! Tempora unde qui nesciunt?
            </span>
            <div className="social-share">
              <amp-social-share type="twitter" width="45" height="33" />
              <amp-social-share type="linkedin" width="45" height="33" />
              <amp-social-share type="pinterest" width="45" height="33" />
              <amp-social-share type="tumblr" width="45" height="33" />
              <amp-social-share type="email" width="45" height="33" />
            </div>
          </div>
        </main>
        <style jsx>{`
          h1 {
            margin-bottom: 5px;
            color: green;
            position: absolute;
            font-family: "Lilita One", cursive;
          }
          main {
            max-width: 960px;
          }
          p {
            font-size: 18px;
            line-height: 30px;
            margin-top: 30px;
          }
          .title {
          }
          .catimg {
            height: 100vh;
            display: none;
            color: green;
            layout: responsive;
          }
          .buttons {
            display: flex;
          }
          .social-share {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .caption {
            color: #ccc;
            margin-top: 0;
            font-size: 14px;
            text-align: center;
          }
          .index {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .index__content {
            max-width: 960px;
            margin: auto;
            padding: 0 10% 10% 10%;
          }
        `}</style>
      </Layout>
    </>
  );
};

export default Index;
