import Link from "next/link";
import "../headerFolder/header.scss";

const Header = () => (
  <header>
    <h1>The Best Cat Site, Ever</h1>
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
      </ul>
    </nav>
  </header>
);

export default Header;
