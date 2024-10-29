import { ToastContainer } from 'react-toastify'
import Routes from './Routes'
import { AuthProvider } from './context/AuthContext'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App