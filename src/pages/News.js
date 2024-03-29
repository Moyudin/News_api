import React, { useState, useEffect } from "react";
import axios from "axios";
import Cards from "../components/Card";
import { Container, Navbar, Row } from "react-bootstrap";
import Carsousel from "../components/carousel.js";

function News() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // const apiKey = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=cf5b836d870045d5bfa632bef1c4125e`
        );
        setData(response.data.articles);
      } catch (error) {
        console.error("Error fetching Products data: ", error);
      }
    };
    fetchData();
  }, []);

  const slicedData = data.slice(11, 250);

  const filteredData = slicedData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar className="bg-dark fixed-top">
        <Container>
          <Navbar.Brand className="text-info border-bottom border-info p-1 h1-head">
            ★ NEWS
          </Navbar.Brand>
          <Navbar.Text className="img-fluid">
            <input
              className="custom-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search"
            ></input>
          </Navbar.Text>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Carsousel />
        </Row>
        <Row>
          <div className="py-3">
            <h1 className="text-center text-white mt-lg-3 fs-2">
              <u>More Updates</u>
            </h1>
          </div>
          {filteredData.map((item) => (
            <Cards
              key={item.url}
              title={item.title}
              image={item.urlToImage}
              description={item.description}
              url={item.url}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}
export default News;
