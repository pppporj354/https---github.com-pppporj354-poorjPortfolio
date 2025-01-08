import { Link } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme"

export default function Navbar() {
  const { toggleTheme } = useTheme()

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Portfolio
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/profile" className="btn btn-ghost">
          Profile
        </Link>
        <Link to="/projects" className="btn btn-ghost">
          Projects
        </Link>
        <Link to="/contact" className="btn btn-ghost">
          Contact
        </Link>
      </div>
      <div className="navbar-end">
        <button onClick={toggleTheme} className="btn btn-circle btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
