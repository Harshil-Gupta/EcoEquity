import React from "react";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Stack,
  Toolbar,
  Typography,
  Container,
  Link,
  Paper,
} from "@mui/material";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import Box from "@mui/system/Box";
import cards from "./cardsData.js";
import esgStyles from "./esgStyles";
import ESGVideo from "./ESGVideo.js";
import Header from '../Dashboard folder/Header.js';
function Copyright() {
 
  return (
    
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        EcoEquity: Where Ethics Meet Investment Strategies
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ESG() {
  const paperStyle = {
    padding: "20px",
    margin: "20px",
    textAlign: "center",
    color: "white",
    backgroundColor: "#5A287D",
  };
  return (

    <div style={{ paddingTop: "75px" }}>
    <CssBaseline>
      {/* <AppBar position="relative">
        <Toolbar>
          <AssuredWorkloadIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Environmental, Social and Governance Section
          </Typography>
        </Toolbar>
      </AppBar> */}
      <main>
        <Paper elevation={15} style={paperStyle}>
          <Typography variant="h5" gutterBottom>
            <AssuredWorkloadIcon sx={{ mr: 2 }} />
            Environmental, Social, & Governance Section
          </Typography>
        </Paper>
        <Box sx={esgStyles.mainContainer}>
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              What is ESG?
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              paragraph
            >
              ESG is a framework that helps stakeholders understand how an
              organization is managing risks and opportunities related to
              environmental, social, and governance criteria (also called ESG
              factors).
            </Typography>
          </Container>
        </Box>

        <Container sx={esgStyles.mainContent} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={card.imageUrl}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.stockName}
                    </Typography>
                    <Typography>
                      Ticker: {card.stockTicker} <br />
                      {card.randomInfo}
                    </Typography>
                  </CardContent>
                  <Paper elevation={15} style={paperStyle}>
                    <Typography variant="h6" gutterBottom>
                      ESG Rating: {card.esgRating}
                    </Typography>
                  </Paper>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box sx={esgStyles.footer} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Learn More about ESG
          </Typography>
          <ESGVideo align="center"/>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Hope you make a wise investing decision to achieve your financial
          goals!
        </Typography>
        <Copyright />
      </Box>
    </CssBaseline>
    </div>
  );
}
