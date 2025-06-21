import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  filterByRegion,
  loadMore,
} from "../redux/countriesSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import Slider from "../components/Slider";

export default function HomePage() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.filtered);
  const displayCount = useSelector((state) => state.countries.displayCount);
  const [activeRegion, setActiveRegion] = useState("All");

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleRegionClick = (regionLabel, regionValue) => {
    dispatch(filterByRegion(regionValue));
    setActiveRegion(regionLabel);
  };

  return (
    <Container className="home-container">
      <div className="nav-top d-flex justify-content-between align-items-center py-3">
        <h5 className="m-0">Countries</h5>
        <div className="region-nav d-flex">
          {["All", "Asia", "Europe"].map((region) => (
            <span
              key={region}
              className={activeRegion === region ? "active" : ""}
              onClick={() =>
                handleRegionClick(region, region === "All" ? "" : region)
              }
            >
              {region}
            </span>
          ))}
        </div>
      </div>

      <div className="divider-heading text-center my-4 d-flex align-items-center">
        <hr className="flex-grow-1" style={{ marginTop: 0 }} />
        <h2 className="mx-3 m-0">WELCOME</h2>
        <hr className="flex-grow-1" style={{ marginBottom: 0 }} />
      </div>

      <div className="slider-section mb-5 d-flex">
        <Slider />
      </div>

      <Row className="country-list mb-4">
        {countries.slice(0, displayCount).map((c, i) => (
          <Col xs={12} md={6} key={i} className="mb-4">
            <div className="country-card d-flex align-items-center">
              <img src={c.flag} alt={c.name} width="60" className="me-3" />
              <div>
                <h5>{c.name}</h5>
                <p className="mb-0">{c.region}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {displayCount < countries.length && (
        <div className="text-center my-3">
          <Button
            onClick={() => dispatch(loadMore())}
            className="load-more-btn"
          >
            Load more
          </Button>
        </div>
      )}

      <footer className="text-center mt-5 py-4">
        <div className="social-icons mb-2">
          <i className="bi bi-google mx-2"></i>
          <i className="bi bi-github mx-2"></i>
          <i className="bi bi-facebook mx-2"></i>
          <i className="bi bi-linkedin mx-2"></i>
        </div>
        <p className="mb-0">example@gmail.com</p>
        <small>Copyright © 2025 Name. All rights reserved.</small>
      </footer>
    </Container>
  );
}
