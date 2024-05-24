import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="flex justify-between px-10 h-[10vh] items-center text-primary-foreground pt-2">
      <div className="flex gap-5 items-center">
        <Link to="/">
          <img
            className="w-14"
            src="/alumni.png"
            alt="Assam University's Alumni association logo"
          />
        </Link>
        <Link to="/">
          <img
            className="w-48"
            src="/aus-text-logo.png"
            alt="Assam University's logo with text"
          />
        </Link>
      </div>
      <Link to="/">
        <img
          className="w-96"
          src="/header-text.png"
          alt="A Central University Established by an Act of Parliament Assam University, Silchar"
        />
      </Link>
    </nav>
  );
}
