# Birthday Tweet Generator

[Link to the app hosted on heroku](https://historytweet.herokuapp.com/)

*Important: You need to generate [Google API key](https://code.google.com/apis/console/) and Google CX before using this application ([by creating a new custom search engine](https://cse.google.com/all)), and paste them in logic.js (indicated).*

My organization's social media manager has this 'content calendar' thing - where sometimes the company's SM accounts drop tweets/posts based on particular days (mostly birthdays of celebrities and historical figures).

It definitely takes a little time each day - so I quickly wrote a simple app using node.js and Express that generates a social media post on the birthday of a celeb, with a link (article or otherwise) based on the person's profession and your industry (default: blockchain).

## Working

The app scrapes [Wikipedia](https://en.wikipedia.org/wiki/Category:Days)'s date pages based on the day selected, picks up a birthday randomly, patches the content up a bit, looks up the keyword (celebrity's profession+the industry you chose) on Google, selects a random article, and returns a tweet.

For instance, if you select 24th May and 'blockchain', one of the possible tweets could be:

```sh
It is the Argentinian footballer Lionel Messi's birthday today! We have a cool link for you #OnThisDay: "Hal Robson-Kanu interview: West Brom striker by day, blockchain ...https://www.independent.co.uk/sport/football/football-league/hal-robsonkanu-west-bromwich-albion-championship-interview-blockchain-bitcoin-cambridge-analytica-a8476756.html #footballer #blockchain #blockchaintechnology
```

This program is made using [wtf-wikipedia](https://www.npmjs.com/package/wtf_wikipedia) and [Google Custom Search API](https://developers.google.com/custom-search/v1/overview). I picked up its UI from [Colorlib](https://colorlib.com).

## Usage
* Generate Google API key and Google CX
* Clone the repo
* Edit *logic.js* by adding the API key and CX
* Use the following commands to run this locally:

```sh
> npm install
> node app.js
```
Your app will be live at http://localhost:4000


*Shoutout to [Nidish](https://github.com/nidishkr21) and [Shanu](https://github.com/sgoyanka) for patching the callback issue.*
