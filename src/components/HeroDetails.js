import { Container } from "react-bootstrap";

const HeroDetails = ({ bio, appearance, name, work }) => {
  return (
    <Container>
      <div className="info-hero-container">
        <h1 className="mt-2">{name}</h1>
        <h2>{bio["full-name"]}</h2>

        <hr />

        <h4>Aliases</h4>
        {bio.aliases.map((alias, key) => {
          return (
            <Container key={key}>
              <p>{alias}</p>
            </Container>
          );
        })}

        <hr />

        <h4>Appearance</h4>
        <Container>
          <p>Eye color: {appearance["eye-color"]}</p>
          <p>Hair color: {appearance["hair-color"]}</p>
          <p>Weight: {appearance.weight[1]}</p>
          <p>Height: {appearance.height[1]}</p>
        </Container>

        <hr />

        <h4>Work</h4>
        <Container>
          <p>Base : {work.base}</p>
          <p>Occupation : {work.occupation}</p>
        </Container>
      </div>
    </Container>
  );
};

export default HeroDetails;
