import { ListGroup, ListGroupItem } from "react-bootstrap";

export const IndividualStats = ({ hero }) => {
  return (
    <ListGroup className={`list-group-flush mt-3 mb-1`}>
      <h5>Stats</h5>
      <ListGroupItem className="group-item">
        Intelligence : {hero.int === "null" ? "Unknown" : hero.int}
      </ListGroupItem>
      <ListGroupItem className="group-item">
        Strength : {hero.str === "null" ? "Unknown" : hero.str}
      </ListGroupItem>
      <ListGroupItem className="group-item">
        Durability : {hero.dur === "null" ? "Unknown" : hero.dur}
      </ListGroupItem>
      <ListGroupItem className="group-item">
        Power : {hero.pwr === "null" ? "Unknown" : hero.pwr}
      </ListGroupItem>
      <ListGroupItem className="group-item">
        Combat : {hero.cbt === "null" ? "Unknown" : hero.cbt}
      </ListGroupItem>
      <ListGroupItem className="group-item">
        Speed : {hero.spd === "null" ? "Unknown" : hero.spd}
      </ListGroupItem>
    </ListGroup>
  );
};
