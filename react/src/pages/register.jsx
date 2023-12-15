import { useEffect, useState } from 'react'
import ApplicationLogo from 'components/ApplicationLogo'
import AuthCard from 'components/AuthCard'
import AuthValidationErrors from 'components/AuthValidationErrors'
import Button from 'components/Button'
import GuestLayout from 'components/Layouts/GuestLayout'
import Input from 'components/Input'
import Label from 'components/Label'
import CustomList from 'components/List'
import { useAuth } from 'hooks/auth'
import {Link, NavLink} from 'react-router-dom';
import axios from 'lib/axios'

const Register = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('');
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    axios.get('/api/courses')
    .then(function (res) {
      setCourses(res.data)
      setCourse(res.data[1])
    })
    .catch(function (error) {
      console.log(error);
    })
  },[])

  const submitForm = event => {
    event.preventDefault()
    register({ name, email, course_id: course.id, password, password_confirmation, setErrors })
  }

  return (
    <GuestLayout>
      <AuthCard
        logo={
          <Link to="/">
            <ApplicationLogo className="w-40 h-40" />
          </Link>
        }>
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />
        <form onSubmit={submitForm}>
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full"
              onChange={event => setName(event.target.value)}
              required
              autoFocus
            />
          </div>
          {/* Email Address */}
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              className="block mt-1 w-full"
              onChange={event => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="course">Course</Label>
            <CustomList
              id="course_id"
              value={course}
              menu={courses}
              className="block mt-1 w-full"
              onChange={setCourse}
              required
            />
          </div>
          {/* Password */}
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              className="block mt-1 w-full"
              onChange={event => setPassword(event.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {/* Confirm Password */}
          <div className="mt-4">
            <Label htmlFor="password_confirmation">
                Confirm Password
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={password_confirmation}
              className="block mt-1 w-full"
              onChange={event =>
                setPasswordConfirmation(event.target.value)
              }
              required
            />
          </div>
          <div className="flex items-center justify-end mt-4">
            <NavLink
              to="/login"
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
                Already registered?
            </NavLink>
            <Button className="ml-4">Register</Button>
          </div>
        </form>
      </AuthCard>
    </GuestLayout>
  )
}

export default Register


// {
//   "id": 1,
//   "name": "Software Engineering, BSc (Hons)",
//   "level": "UG",
//   "course_director": "Dr. Mike Wood",
//   "created_at": "2023-12-12T13:34:47.000000Z",
//   "updated_at": "2023-12-12T13:34:47.000000Z"
// }