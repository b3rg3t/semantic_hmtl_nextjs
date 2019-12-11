import Link from "next/link";
import "../headerFolder/header.scss";
import { LogOut } from "../../lib/auth";
// import Router from "next/router";
import { useRouter } from "next/router";

const Header = props => {
  const router = useRouter();
  return (
    <header>
      <div className="header__div">
        <Link href="/"><a className="header__link"><h1>Cats <span className="header__cat">&#128008;</span></h1></a></Link>
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
      </div>
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
    </header>
  );
};

export default Header;
