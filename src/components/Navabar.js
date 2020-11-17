import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { filterHandler } from "../redux/actions/Filter";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };
  }
  handleFilterTextChange = (e) => {
    this.setState({
      filterText: e.target.value,
    });
  };

  handleFilterSubmit = () => {
    const { filterHandler } = this.props;
    const { filterText } = this.state;
    filterHandler(filterText);
    filterHandler(filterText);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Router>
              <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="/">Giphy</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link href="/">Trending</Nav.Link>
                </Nav>
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Filter"
                    className="mr-sm-2"
                    onChange={this.handleFilterTextChange}
                  />
                  <Button variant="outline-light" onClick={this.handleFilterSubmit}>Filter</Button>
                </Form>
              </Navbar>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const Header = connect(mapStateToProps, {
  filterHandler,
})(NavBar);
export { Header };
