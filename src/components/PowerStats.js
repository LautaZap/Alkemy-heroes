import { Container } from "react-bootstrap";

const PowerStats = ({ team }) => {
  const teamStats = {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
  };

  let statsArray;
  const add = (data) => {
    const number = parseInt(data);
    if (isNaN(number)) {
      return 0;
    } else {
      return number;
    }
  };

  const calculate = () => {
    team.forEach((hero) => {
      teamStats.intelligence += add(hero.int);
      teamStats.strength += add(hero.str);
      teamStats.speed += add(hero.spd);
      teamStats.durability += add(hero.dur);
      teamStats.power += add(hero.pwr);
      teamStats.combat += add(hero.cbt);
    });
    statsArray = Object.entries(teamStats).sort((a, b) =>
      a[1] < b[1] ? 1 : -1
    );
  };
  calculate();

  return (
    <div className="powerstats">
      <h2>Your Team Stats</h2>
      {statsArray.map((stat, key) => {
        if (key === 0) {
          return (
            <Container key={key}>
              <h1>
                {stat[0]} -- {stat[1]}
              </h1>
            </Container>
          );
        } else {
          return (
            <Container key={key}>
              <h4>
                {stat[0]} -- {stat[1]}
              </h4>
            </Container>
          );
        }
      })}
    </div>
  );
};

export default PowerStats;
