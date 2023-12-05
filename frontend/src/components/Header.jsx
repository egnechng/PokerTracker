import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='p-4 flex justify-between'>
      <nav className="text-xl flex">
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/report">Report (coming soon)</Link>
          </li>
          <li>
            <Link to="/calculator">Calculator (coming soon)</Link>
          </li>
        </ul>
      </nav>
      <nav className="">
        <ul className="text-sm">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header