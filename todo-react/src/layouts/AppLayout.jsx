import { Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container';

import { Appbar } from '../components/AppBar'
import { AuthContextProvider } from '../contexts/AuthContext';

const AppLayout = () => {
  return (
    <>
    <AuthContextProvider>
      <div className="mb-5">
        <Appbar />
      </div>
      <Container>
        <Outlet />
      </Container>
    </AuthContextProvider>
    </>
  )
}

export { AppLayout }