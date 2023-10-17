import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./Stockwideget.css"; // Import your CSS file


const StockTimelineWidget = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch news sentiment data from the Alpha Vantage API
    fetch(
      "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=WTFWP6L2PZWV4RXX"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);

        if (data.feed && Array.isArray(data.feed)) {
          const newsItems = data.feed.map((item) => ({
            image: item.banner_image,
            title: item.title,
            summary: item.summary,
            time_published: item.time_published,
            url: item.url,
            sentimental_score: item.overall_sentiment_score,
            author:
              item.authors && item.authors.length > 0
                ? item.authors[0]
                : "Unknown Author",
          }));
          setNewsData(newsItems);
        } else {
          console.error("Invalid API response format.");
        }
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
  }, []);

  return (
    <Container className="stock-timeline-widget" fluid style={{ marginTop: "35px" }}>
      <h2 className="widget-title">Top Stock News</h2>
      <div className="scrollable-news">
        {newsData.length > 0 ? (
          <div className="news-items">
            {newsData.map((item, index) => (
              // Add a condition to render the card only if there's a valid image
              item.image && (
                <div key={index}>
                  <Card className="news-card">
                    <Row>
                      <Col className="Image-Col">
                        {item.image && (
                          <Card.Img
                            variant="top"
                            src={item.image}
                            alt="News"
                            className="news-img"
                            onError={(e) => {
                              e.target.style.display = "none"; // Hide the image on error
                            }}
                          />
                        )}
                      </Col>
                      <Col>
                        <Card.Body>
                          <Card.Title className="headline">
                            {item.title}
                          </Card.Title>
                          <Card.Text className="summary">
                            {item.summary}
                          </Card.Text>
                          <Button
                            variant="primary"
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="read-more"
                          >
                            Read More
                          </Button>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </div>
              )
            ))}
          </div>
        ) : (
          <p className="no-data">No news data available.</p>
        )}
      </div>
    </Container>
  );
};

export default StockTimelineWidget;
