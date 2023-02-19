import React from 'react';
import Avatar from '@mui/material/Avatar';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div className="">
        <div>
        <Avatar label="Farah" alt="me" src="/images/mypic.png" sx={{ width: 80, height: 80 }}/>
        <a href="https://github.com/farahmire" target="_blank" rel="noreferrer">
          <img width={40}  src="/images/github.png"/>
        </a>
        <a href="https://www.linkedin.com/in/farah-mire-634662181/" target="_blank" rel="noreferrer">
          <img width={40}  src="/images/linkedin.png"/>
        </a>
        <h4>Farah Mire - Full Stack Software Engineer</h4>
        </div>

        <p>Diamond Hands is the perfect solution <br />
          for people who want to stay on top of their investments. <br />
          With real-time market data, advanced analytics, and a user-friendly design, <br />
          our app makes it easy to track your watchlist, monitor performance of individual stocks <br />
          and make informed decisions. Our app is the best way to stay ahead of the curve <br />
          in the fast-paced world of finance.
        </p>
        <img style={{float: 'right', marginRight: 1000, marginLeft: 0}} width={500} src="/images/technologies-image.png" />
        <h4> Technologies Used:</h4>
        <p> React - Node JS </p>
        <p>Express - JavaScript</p>
        <p>PostgreSQL - Redux-Saga</p>
        <p>Postman - MUI CSS - HTML</p>
        <p>API - Finnhub </p>
        <p>Charts - Highcharts JS</p>
        </div>
        <div>
          <h4>Special Thanks</h4>
          <p>
            🏫 Prime Digital Academy <br />
            🧑‍🏫 Instructors: Matt, Kris, Key, & Vada <br />
            🧑‍🎓 Vonnegut Cohort! <br />
            👨‍👩‍👦 Family & Friends 
          </p>
        </div>
    </div>
  );
}

export default AboutPage;
