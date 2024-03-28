import { Link } from "react-router-dom";
import { Col, Card, CardImg, CardBody, Badge } from "reactstrap";

export const CardPokemon = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <Col className="mb-3">
        <Card className="border-2 card-animate">
          <CardImg
            src={
              pokemon.sprites.other.dream_world.front_default === null
                ? pokemon.sprites.other["official-artwork"].front_default
                : pokemon.sprites.other.dream_world.front_default
            }
            alt={`Pokemon ${pokemon.name}`}
            height={350}
          />
          <CardBody className="text-center">
            <h3 className="text-capitalize">{pokemon.name}</h3>
            <div className="card-types">
              {pokemon.types.map((type) => (
                <Badge
                  color={` ${type.type.name}`}
                  key={type.type.name}
                  className="ms-2 text-capitalize"
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
    </Link>
  );
};
