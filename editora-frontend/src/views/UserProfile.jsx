
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/Geovane.jpg";

class UserProfile extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>

            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                href="https://www.linkedin.com/in/geovane-l-17012b53/"
                avatar={avatar}
                name="Geovane Lemos"
                userName="Geovane"
                description={
                  <span>
                    "Consultor de Sistemas
                    <br />
                    Líder de projetos
                    <br />
                    Desenvolvedor Full-Stack
                    <br />
                    Experiência em grandes projetos"
                  </span>
                }
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
