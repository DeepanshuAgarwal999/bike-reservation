import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const user = useAuth()
  return (
    <nav className='fixed top-0 left-0 w-full shadow-lg h-16 items-center bg-white z-[3000] flex justify-between px-6'>
      <h1 className='text-xl font-semibold'>
        <Link to={'/'}>Bike reservation</Link>
      </h1>
      <ul className='flex gap-4 capitalize items-center'>
        <li><Link to={'/reservations'}>reservations</Link></li>
        <li><Link to={'/create-bike'}>Add bike</Link></li>
        {user?.isManager && <li><Link to={'/users'}>Users</Link></li>}
        {
          user?.isAuthenticated ? <Link to={'/'}><Button variant='contained' color='error' onClick={user.logout}>Logout</Button></Link> : <li><Link to={'/login'}><Button variant='contained' color='secondary'>Login</Button></Link></li>
        }
      </ul>
    </nav>
  )
}

export default Navbar