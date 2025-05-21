import CalculateIcon from '@mui/icons-material/Calculate';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Menu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">HEC Electricity</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
  <Link to="/simulator">
  <IconButton aria-label="simulator">
    <StyledBadge color="primary">
      <CalculateIcon />
    </StyledBadge>
  </IconButton>
</Link>

            

            <NavDropdown title="Admin" id="navbarScrollingDropdownadmin">
             <NavDropdown.Item as={Link} to="/login">
                Dashboard admin
              </NavDropdown.Item>
              
            </NavDropdown>


            <NavDropdown title="Client" id="navbarScrollingDropdownclient">
             <NavDropdown.Item as={Link} to="/client">
                Liste des projects
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/messages/add">
                Saisir un feedback
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/simulator">
                Simulateur de couts
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;