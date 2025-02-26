const Sidebar = () => (
    <Nav className="flex-column bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h4 className="text-white">Dashboard</h4>
      <Nav.Link href="#" className="text-light">Profile</Nav.Link>
      <Nav.Link href="#" className="text-light">Prompts</Nav.Link>
      <Nav.Link href="#" className="text-light">Settings</Nav.Link>
      <Nav.Link href="#" className="text-light">Logout</Nav.Link>
    </Nav>
  );