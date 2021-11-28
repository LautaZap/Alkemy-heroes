import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import HeroCard from "../components/HeroCard";
import heroList from "../storage/heroSelection";
import { Hero } from "../storage/heroClass";
import PowerStats from "../components/PowerStats";
import Message from "../components/Message";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    let url = "https://superheroapi.com/api/10220343472318478/";
    const getAtributes = () => {
      heroList.localStorageHeroes();
      heroList.idHeroes.forEach(async (idHero) => {
        const { data } = await axios.get(`${url}/${idHero}`);
        const { name, image, powerstats, biography, appearance, work } = data;

        const newHero = new Hero(
          idHero,
          name,
          image.url,
          powerstats.intelligence,
          powerstats.strength,
          powerstats.speed,
          powerstats.durability,
          powerstats.power,
          powerstats.combat,
          biography,
          appearance,
          work
        );
        setTeam((prevValues) => {
          return [...prevValues, newHero];
        });
      });
    };
    getAtributes();
  }, []);

  const remove = (id, alignment) => {
    const res = heroList.removeHero(id, alignment);
    setTeam((prevValues) => {
      return prevValues.filter((idHero) => {
        return idHero.id !== id;
      });
    });
    setMessage({
      type: res.type,
      msg: res.msg,
    });
    scrollToTop();
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Container className="mb-5">
        <PowerStats team={team} />
        {message && <Message msg={message.msg} type={message.type} />}
        {team.map((hero, key) => {
          return (
            <HeroCard
              key={key}
              name={hero.name}
              image={hero.imgUrl}
              alignment={hero.alg}
              hero={hero}
              remove={remove}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default Team;
