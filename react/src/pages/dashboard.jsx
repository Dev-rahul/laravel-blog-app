import AppLayout from 'components/Layouts/AppLayout'
import { NavLink} from 'react-router-dom';

const Dashboard = () => (
  <AppLayout
    header={
      <div className='flex justify-between' >
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
      <NavLink
            to="/create"
            className="ml-4 text-sm text-gray-700 underline"
          >
           Create Post
          </NavLink>
      </div>
    }>
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            You're logged in!
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
)

export default Dashboard
