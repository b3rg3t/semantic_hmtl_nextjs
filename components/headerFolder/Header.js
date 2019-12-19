import Link from "next/link";
import { LogOut } from "../../lib/auth";
import { useRouter } from "next/router";
import { slide as Menu } from "react-burger-menu";

var styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    right: "12px",
    top: "13px"
  },
  bmBurgerBars: {
    background: "#2859a3",
    border: "1px solid white",
    borderRadius: "5px"
  },
  bmBurgerBarsHover: {
    background: "#a90000"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
    color: "#373a47"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%"
  },
  bmMenu: {
    background: "#f8f8f8",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em"
  },
  bmItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
    // display: "inline-block"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

const Header = props => {
  const router = useRouter();
  return (
      <header>
        <div className="mobile__nav">
          <Menu styles={styles} width={"50%"} right>
            {props.token && (
              <nav>
                <ul>
                  <li>
                    <Link href="/">
                      <a className="nav__a">Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles">
                      <a className="nav__a">Articles</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/polls">
                      <a className="nav__a">Polls</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile">
                      <a className="nav__a">Profile</a>
                    </Link>
                  </li>
                </ul>
                {router.pathname !== "/login" &&
                  (props.token ? (
                    <button className="login-logout" onClick={LogOut}>
                      Log Out
                    </button>
                  ) : (
                    <Link href="/login">
                      <a className="login-logout">Log in</a>
                    </Link>
                  ))}
              </nav>
            )}
            {!props.token && (
              <nav>
                <Link href="/">
                  <a className="nav__a">Home</a>
                </Link>
                <Link href="/login">
                  <a className="login-logout">Log in</a>
                </Link>
              </nav>
            )}
          </Menu>
        </div>

        <div className="header__div">
          <Link href="/">
            <a className="header__link">
              <h1>
                Cats <span className="header__cat">&#128008;</span>
              </h1>
            </a>
          </Link>

          {router.pathname !== "/login" &&
            (props.token ? (
              <button className="login-logout desktop__nav" onClick={LogOut}>
                Log Out
              </button>
            ) : (
              <Link href="/login">
                <a className="login-logout desktop__nav">Log in</a>
              </Link>
            ))}
        </div>

        <div className="desktop__nav">
          {props.token && (
            <nav>
              <ul className="header__ul">
                <li className="header__li">
                  <Link href="/">
                    <a className="nav__a">Home</a>
                  </Link>
                </li>
                <li className="header__li">
                  <Link href="/articles">
                    <a className="nav__a">Articles</a>
                  </Link>
                </li>
                <li className="header__li">
                  <Link href="/polls">
                    <a className="nav__a">Polls</a>
                  </Link>
                </li>
                <li className="header__li">
                  <Link href="/profile">
                    <a className="nav__a">Profile</a>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>

        <style jsx>{`
          header {
            z-index: 999;
            -webkit-box-shadow: 0px 12px 10px -14px rgba(101, 101, 101, 0.44);
            box-shadow: 0px 12px 10px -14px rgba(101, 101, 101, 0.44);
            width: 100%;
          }
          .header__div {
            margin-left: 10%;
            margin-right: 10%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .header__link {
            text-decoration: none;
          }
          h1 {
            margin: auto 0;
            padding: 0.5rem;
            font-weight: bold;
            color: #2859a3;
            font-family: "Lilita One", cursive;
          }
          .sep {
            color: #2859a3;
            font-weight: bold;
            font-size: 1.2rem;
          }
          .header__ul {
            display: flex;
            justify-content: flex-end;
            margin-left: 10%;
            margin-right: 10%;
          }
          .header__li {
            list-style: none;
            border: none;
            background: none;
            padding: 0;
          }
          .nav__a {
            font-size: 1.2rem;
            font-weight: bold;
            color: #2859a3;
            text-decoration: none;
          }
          .login-logout {
            text-decoration: none;
            display: flex;
            justify-content: flex-end;
            margin: 10px;
            background-color: #0f83f7;
            border: none;
            padding: 4px 8px;
            border-radius: 0.5rem;
            font-size: 1rem;
            color: white;
            font-weight: bold;
            cursor: pointer;
          }

          @media screen and (max-width: 600px) {
            .header__link {
              height: 100%;
              display: flex;
            }
            h1 {
              margin: auto;
            }
            .header__ul {
              justify-content: center;
              margin: 0;
            }
            .header__li {
              list-style: none;
              border: none;
              background: none;
              padding: 0;
            }
          }
        `}</style>
      </header>
  );
};

// Header.getInitialProps = async (context, token) =>{
//   console.log(token)
// }
export default Header;
