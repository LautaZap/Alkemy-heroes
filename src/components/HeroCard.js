import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Badge, Container, Row } from "react-bootstrap";
import {
  faInfo,
  faUserPlus,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useModals } from "../hooks/useModals";
import HeroDetails from "./HeroDetails";
import { IndividualStats } from "./IndividualStats";

const HeroCard = ({ name, alignment, image, id, add, hero, remove }) => {
  const [isOpenModal, openModal, closeModal] = useModals(false);

  const handleClick = () => {
    if (add) {
      add(id, alignment);
    } else {
      remove(hero.id, alignment);
    }
  };

  return (
    <>
      <Container className="py-3">
        <Card
          className={`shadow ${hero && "individual-card "}`}
          border={
            alignment === "good"
              ? "primary"
              : alignment === "bad"
              ? "danger"
              : "dark"
          }
        >
          <Row className="g-0">
            <Col md={hero ? 4 : 12}>
              <Card.Img
                className={`rounded ${hero && "img-card"}`}
                variant="top"
                src={image}
                onClick={openModal}
              />
            </Col>
            <Col md={hero ? 8 : 12}>
              <Card.Body>
                <Card.Title>{name}</Card.Title>

                <span>
                  <Badge
                    pill
                    bg={
                      alignment === "good"
                        ? "primary"
                        : alignment === "bad"
                        ? "danger"
                        : "dark"
                    }
                  >
                    {alignment}
                  </Badge>
                </span>

                {hero && (
                  <div>
                    <IndividualStats hero={hero} />
                  </div>
                )}
              </Card.Body>
            </Col>
          </Row>

          <button
            type="button"
            onClick={handleClick}
            className={`button-card ${!hero ? "add-button" : "remove-button"}`}
          >
            <FontAwesomeIcon icon={hero ? faUserSlash : faUserPlus} />
          </button>

          {hero && (
            <>
              <button onClick={openModal} className="info-button button-card">
                <FontAwesomeIcon icon={faInfo} />
              </button>
              <Modal isOpen={isOpenModal} closeModal={closeModal}>
                <HeroDetails
                  appearance={hero.appearance}
                  name={hero.name}
                  work={hero.work}
                  bio={hero.bio}
                />
              </Modal>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default HeroCard;
