import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from "react-bootstrap";

const Profile = () => {

  const { user } = useContext(AuthContext)

  return (
    <>
    <Helmet><title>Login</title></Helmet>
      <Row>
        <Col md={{ span: 8, offset: 2}} className="mt-5">

          <Card>
            <Card.Body>
              <h2 className='mb-3'>Profile</h2>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export { Profile }