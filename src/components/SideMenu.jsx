import { useState } from 'react'
import Link from 'next/link'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''} bg-blue-50`}>
      <button onClick={toggleSidebar} className="toggle-btn">
        <AdminPanelSettingsIcon fontSize="large" />
      </button>
      <nav>
        <h1>Admin Panel</h1>
        <ul>
          <li>
            <Link
              href="/Admin/AdminCalender"
              className="block px-4 py-2 text-sm text-gray-700"
            >
              Account Panel
            </Link>
          </li>
          <li>
            <Link
              href="/Admin/AdminReview"
              className="block px-4 py-2 text-sm text-gray-700"
            >
              Review Panel
            </Link>
          </li>
          <li>
            <Link
              href="/Admin/Calender"
              className="block px-4 py-2 text-sm text-gray-700"
            >
              Calender
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: ${isOpen ? '0' : '-250px'};
          width: 200px;
          height: 100%;
          padding-top: 50px;
          transition: left 0.3s ease;
        }

        .toggle-btn {
          position: absolute;
          top: 10px;
          left: ${isOpen ? '20px' : '320px'};
          background: none;
          border: none;
          color: black;
          font-size: 24px;
          cursor: pointer;
          z-index: 2;
          transition: left 0.3s ease;
        }

        nav {
          padding: 20px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin-bottom: 10px;
        }

        a {
          color: white;
          text-decoration: none;
          font-size: 18px;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
export default Sidebar
