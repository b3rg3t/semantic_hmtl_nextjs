import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import { FaBeer } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useAmp } from "next/amp";
import { useState } from "react";

export const config = {
  amp: "hybrid"
};

export function Image({ src, width, height, className, alt }) {
  const isAmp = useAmp();
  return isAmp ? (
    <amp-img
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
      layout="responsive"
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
}
const Index = props => {
  const [mySite, setMySite] = useState(1);
  return (
    <>
      <Layout title="Home Page" token={props.token}>
        <Head>
          <title>Cat</title>
        </Head>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
        <main>
          <div className="index">
            <Image
              className="catimg"
              src="../images/cat1.jpg"
              width="600px"
              height="300px"
              alt="cat1 behind fence"
            />
            <h1>"THE MYSTIC CAT SITE"</h1>
          </div>
          <div className="index__content">
          <h3>What a year</h3>
            <hr></hr>
            {/* <p [text]="'Hello ' + foo">Hello World</p> */}
            <span>
              <FaBeer />
              {mySite}
              
              <button onClick={() => setMySite(mySite + 1)} on="tap:AMP.setState({foo: 'amp-bind'})">+</button>
              <FaTrashAlt color="red" />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
              quidem doloremque animi asperiores sit error vitae, similique
              quaerat nesciunt assumenda architecto dignissimos molestias
              praesentium magni delectus! Tempora unde qui nesciunt?
            </span>
            <hr></hr>
            <div className="social-share">
            <amp-social-share type="twitter" width="45" height="33" />
            <amp-social-share type="linkedin" width="45" height="33" />
            <amp-social-share type="pinterest" width="45" height="33" />
            <amp-social-share type="tumblr" width="45" height="33" />
            <amp-social-share type="email" width="45" height="33" />
          </div>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
              quidem doloremque animi asperiores sit error vitae, similique
              quaerat nesciunt assumenda architecto dignissimos molestias
              praesentium magni delectus! Tempora unde qui nesciunt?
            </span>
          </div>

        </main>
        <style jsx>{`
          h1 {
            margin-bottom: 5px;
            color: white;
            position: absolute;
            font-family: "Lilita One", cursive;
          }
          p {
            font-size: 18px;
            line-height: 30px;
            margin-top: 30px;
          }
          .catimg {
            widht: 100wv;
            height: 100vh;
            display: none;
            color: green;
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
          }
        `}</style>
      </Layout>
    </>
  );
};

export default Index;
