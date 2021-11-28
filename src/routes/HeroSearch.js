import axios from "axios";
import { Formik } from "formik";
import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import HeroCard from "../components/HeroCard";
import Message from "../components/Message";
import heroList from "../storage/heroSelection";

const HeroSearch = () => {
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState(false);
  const [heroes, setHeroes] = useState([]);

  const add = (id, alignment) => {
    const res = heroList.addHero(id, alignment);
    if (res) {
      setMessage({ msg: res.msg, type: res.type });
    }
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

  let url = "https://superheroapi.com/api/10220343472318478/search/";

  return (
    <div className="container mt-2">
      <Formik
        initialValues={{
          hero: "",
        }}
        validate={(values) => {
          let errors = {};
          if (!values.hero) {
            errors.hero = "Name required.";
          }
          return errors;
        }}
        onSubmit={async (values, { resetForm }) => {
          resetForm();
          setSearch(false);
          setHeroes([]);
          setMessage(null);
          axios
            .get(`${url}${values.hero}`)
            .then(({ data }) => {
              if (data.response === "success") {
                setHeroes((prevHero) => {
                  return [...prevHero, data.results];
                });
                setSearch(true);
              } else if (data.response === "error") {
                setMessage({ msg: data.error, type: "danger" });
              }
            })
            .catch((error) => {
              setMessage({ msg: error.response.data.error, type: "danger" });
            });
        }}
      >
        {({
          handleSubmit,
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit} className="m-4 form-login rounded">
            <FloatingLabel
              controlId="floatingInput"
              label="Search your hero."
              className="mb-3"
            >
              <Form.Control
                name="hero"
                type="text"
                placeholder="Search your hero."
                value={values.hero}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.hero && errors.hero && (
                <div>
                  <span className="mt-1 error">{errors.hero}</span>
                </div>
              )}
            </FloatingLabel>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {message && <Message msg={message.msg} type={message.type} />}
          </Form>
        )}
      </Formik>

      <Container>
        <Row xs={1} sm={2} md={3} xl={4}>
          {search &&
            heroes[0].map((hero, key) => {
              return (
                <HeroCard
                  key={key}
                  name={hero.name}
                  image={hero.image.url}
                  alignment={hero.biography.alignment}
                  id={hero.id}
                  add={add}
                />
              );
            })}
        </Row>
      </Container>
    </div>
  );
};

export default HeroSearch;
