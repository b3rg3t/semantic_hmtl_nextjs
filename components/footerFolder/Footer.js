const Footer = () => {
  // let Year = new Date
  return (
    <>
      <footer>
        <p>© {new Date().getFullYear()}</p>
      </footer>
      <style jsx>{`
        footer {
          z-index: 50;
          position: relative;
          margin-top: auto;
          // bottom: 0;
          -webkit-box-shadow: 0px -12px 10px -14px rgba(101, 101, 101, 0.44);
          box-shadow: 0px -12px 10px -14px rgba(101, 101, 101, 0.44);
          bottom: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          background: white;
        }
        p {
            color: #2859a3;
          }
      `}</style>
    </>
  );
};

export default Footer;
