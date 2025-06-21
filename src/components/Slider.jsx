import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { fetchCountries } from "../redux/countriesSlice";

export default function Slider() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.all);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
  }, [dispatch, countries.length]);

  const next = () => setIndex((index + 1) % countries.length);
  const prev = () =>
    setIndex((index - 1 + countries.length) % countries.length);

  const getVisibleDots = (total, current) => {
    const maxDots = 6;
    if (total <= maxDots) return [...Array(total).keys()];

    let start = Math.max(current - 2, 0);
    let end = start + maxDots;

    if (end > total) {
      end = total;
      start = total - maxDots;
    }

    return Array.from({ length: end - start }, (_, i) => i + start);
  };

  if (countries.length === 0) return <div>Loading...</div>;

  const country = countries[index];

  return (
    <div className="slider-responsive d-flex flex-column flex-md-row gap-3">
      <div
        className="slider-main flex-fill position-relative"
        style={{
          backgroundImage: `url(${country.flag})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="overlay position-absolute bottom-0 w-100 py-3 d-flex justify-content-center align-items-center">
          <Button onClick={prev} className="arrow-button me-3">
            <i className="bi bi-arrow-left"></i>
          </Button>
          <div className="dots d-flex align-items-center">
            {getVisibleDots(countries.length, index).map((dotIndex) => (
              <span
                key={dotIndex}
                className={`dot ${dotIndex === index ? "active" : ""}`}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
          <Button onClick={next} className="arrow-button ms-3">
            <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
      </div>

      <div className="slider-secondary px-3 py-3 d-flex flex-column justify-content-center">
        <Row className="mb-3 align-items-center">
          <Col xs={3}>
            <h5 className="mb-0 fw-bold text-muted">Country</h5>
          </Col>
          <Col xs={1}>
            <h5 className="mb-0 fw-bold text-muted">:</h5>
          </Col>
          <Col xs={7}>
            <p className="mb-0 h5 text-primary text-capitalize">
              {country.name}
            </p>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={3}>
            <h5 className="mb-0 fw-bold text-muted">Region</h5>
          </Col>
          <Col xs={1}>
            <h5 className="mb-0 fw-bold text-muted">:</h5>
          </Col>
          <Col xs={7}>
            <p className="mb-0 h5 text-dark text-capitalize">
              {country.region}
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}
