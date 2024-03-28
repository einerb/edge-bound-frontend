import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Col,
  Card,
  CardImg,
  CardBody,
  CardText,
  Row,
  Badge,
  Progress,
} from "reactstrap";

import { PokemonContext } from "../context/PokemonContext";
import { Loader } from "../components/Loader";

export const DetailPage = () => {
  const { getPokemonByID, getPokemonSpecie } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const [specie, setSpecie] = useState({});

  const { id } = useParams();

  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    const specie = await getPokemonSpecie(id);

    setPokemon(data);
    setSpecie(specie);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {pokemon ? (
            <Container className="text-start">
              <Row>
                <Col>
                  <Card className="shadow my-3">
                    <CardBody>
                      <Row>
                        <Col md="6">
                          <CardText className="h1 text-capitalize animate__animated animate__fadeInDown">
                            {pokemon.name}
                          </CardText>
                          <CardText className="fs-4 text-wrap animate__animated animate__fadeInUp">
                            {specie &&
                            specie?.flavor_text_entries.find(
                              (entry) => entry.language.name === "es"
                            ) ? (
                              <span>
                                {specie.flavor_text_entries.find(
                                  (entry) => entry.language.name === "es"
                                ).flavor_text ?? "Desconocido"}
                              </span>
                            ) : (
                              <span>Desconocido</span>
                            )}
                          </CardText>
                          <Row>
                            <Col
                              md="6"
                              className="animate__animated animate__fadeInLeft"
                            >
                              <CardText className="fs-5">
                                <b>Altura:</b> {pokemon.height / 10} m
                              </CardText>
                              <CardText className="fs-5">
                                <b>Peso:</b> {pokemon.weight / 10} kg
                              </CardText>
                              <CardText className="fs-5 text-capitalize">
                                <b>Habitat:</b>{" "}
                                {specie && specie?.habitat?.name
                                  ? specie?.habitat.name
                                  : "Desconocido"}
                              </CardText>
                            </Col>
                            <Col
                              md="6"
                              className="animate__animated animate__fadeInRight"
                            >
                              <CardText className="card-types fs-5 mt-3">
                                <b>Tipo(s):</b>
                                {pokemon.types.map((type) => (
                                  <Badge
                                    color={` ${type.type.name}`}
                                    key={type.type.name}
                                    className="ms-2 text-capitalize"
                                  >
                                    {type.type.name}
                                  </Badge>
                                ))}
                              </CardText>
                              <CardText className="card-types fs-5">
                                <b>Habilidad(es):</b>
                                {pokemon.abilities.map((ab) => (
                                  <Badge
                                    color="secondary"
                                    key={ab.ability.name}
                                    className="ms-2 text-capitalize"
                                  >
                                    {ab.ability.name}
                                  </Badge>
                                ))}
                              </CardText>
                            </Col>
                          </Row>
                        </Col>
                        <Col md="6" className="mt-sm-3 mt-5">
                          <CardImg
                            className="card-img-detail animate__animated animate__bounceInRight"
                            src={
                              pokemon.sprites.other.dream_world
                                .front_default === null
                                ? pokemon.sprites.other["official-artwork"]
                                    .front_default
                                : pokemon.sprites.other.dream_world
                                    .front_default
                            }
                            alt={`Pokemon ${pokemon.name}`}
                            height="350"
                          />
                        </Col>
                        <Col
                          md="12"
                          className="animate__animated animate__fadeInUpBig"
                        >
                          <Row className="mt-sm-3 mt-5">
                            <Col className="mb-3">
                              <CardText className="h2">Estadísticas</CardText>
                            </Col>

                            {pokemon.stats.map((st, i) => (
                              <Row key={i}>
                                <Col xs="12" md="4">
                                  <b className="text-capitalize">
                                    {st.stat.name}
                                  </b>
                                </Col>
                                <Col xs="12" md="8">
                                  <Progress
                                    color="danger"
                                    className="my-2"
                                    value={st.base_stat}
                                  >
                                    {st.base_stat}%
                                  </Progress>
                                </Col>
                              </Row>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          ) : (
            <h1>No se encontró información del Pokémon.</h1>
          )}
        </>
      )}
    </div>
  );
};
