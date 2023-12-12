import { NavLink } from 'react-router-dom';
import { useAuth } from 'hooks/auth'
import reactLogo from 'images/logo512.png';
import ApplicationLogo from 'components/ApplicationLogo';

function Home() {
  const { user } = useAuth({ middleware: 'guest' })

  return (
    <div className="relative flex items-top justify-center
    min-h-screen bg-gray-900 sm:items-center sm:pt-0">
      <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
        {user ?
          <NavLink
            to="/dashboard"
            className="ml-4 text-sm text-gray-700 underline"
          >
            Dashboard
          </NavLink>
          :
          <>
            <NavLink
              to="/login"
              className="ml-4 text-sm text-white underline"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="ml-4 text-sm text-white underline"
            >
              Register
            </NavLink>
          </>
        }
      </div>
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
          <ApplicationLogo dark={true} className="h-16 sm:h-20 ml-10"/>
        </div>   
      </div>
    </div>
  );
}

export default Home;
