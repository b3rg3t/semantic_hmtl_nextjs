import Layout from "../components/layoutFolder/Layout";
import Head from "next/head";
import { FaBeer } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useAmp } from "next/amp";
import { useState } from "react";

export const config = {
  amp: "hybrid"
};
// const isAmp = useAmp();
export function Image({ src, width, height, className, alt }) {
  const isAmp = useAmp();
  return isAmp ? (
    <amp-img
      className={className}
      src={src}
      width="400"
      height="270"
      alt={alt}
      layout="fixed"
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
          <main>
            <div className="index">
              <Image
                className="catimg"
                src="../images/cat1.jpg"
                width="100%"
                height="auto"
                alt="cat1 behind fence"
              />
              <h1>"THE MYSTIC CAT SITE"</h1>
            </div>
            <div className="index__content">
              <p>
                <FaBeer />
                {mySite}
                <button onClick={() => setMySite(mySite + 1)}>+</button>
                <FaTrashAlt color="red" />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
                quidem doloremque animi asperiores sit error vitae, similique
                quaerat nesciunt assumenda architecto dignissimos molestias
                praesentium magni delectus! Tempora unde qui nesciunt?
              </p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
              quidem doloremque animi asperiores sit error vitae, similique
              quaerat nesciunt assumenda architecto dignissimos molestias
              praesentium magni delectus! Tempora unde qui nesciunt? ;
            </div>
            <div className="social-share">
              <amp-social-share type="twitter" width="45" height="33" />
              <amp-social-share type="linkedin" width="45" height="33" />
              <amp-social-share type="pinterest" width="45" height="33" />
              <amp-social-share type="tumblr" width="45" height="33" />
              <amp-social-share type="email" width="45" height="33" />
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
              widht: 300px;
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
