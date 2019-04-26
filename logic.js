var wtf = require('wtf_wikipedia');
var GoogleSearch = require('google-search');

var googleSearch = new GoogleSearch({
    // Enter your key here
    key: '',
    // Enter your cx here
    cx: ''
});

async function generateTweet(date, searchterm, res) {
    //Fixing date
    var yearRemoved = date.substring(5, 10).trim();
    var monthNumber = yearRemoved.substring(1, 2).trim();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthName = months[monthNumber - 1];
    dayNumber = yearRemoved.substring(3, 5).trim();
    var dateToday = monthName + " " + dayNumber;

    doc = await wtf.fetch(dateToday)
    // Fetches names from 'Births' section.
    var holidaysList = doc.sections('Births').text();
    // Splits the list at '*'
    var splitList = holidaysList.split('*')
    // Picks a random name from the list
    const randomItem = splitList[Math.floor(Math.random() * splitList.length)];
    // Cleaning up the text
    var ndashRemoved = randomItem.replace('&ndash; ', '');
    // Year of birth
    var yearBirthday = ndashRemoved.substring(0, 5).trim();
    // Name of the person
    var namewithnocomma = ndashRemoved.indexOf(',');
    var nameBirthday = ndashRemoved.substring(0, namewithnocomma != -1 ? namewithnocomma : ndashRemoved.length).slice(5).trim();

    var whoWasHe = ndashRemoved.split(', ')[1].trim();

    if (whoWasHe.includes('(')) {
        var n = whoWasHe.indexOf('(');
        whoWasHe = whoWasHe.substring(0, n != -1 ? n : whoWasHe.length).trim();
    }
    var hashtag1Long = whoWasHe.substr(whoWasHe.indexOf(' ') + 1);
    var hashtag1 = hashtag1Long.split(" ")[0]

    var response = await googleLogic(searchterm, hashtag1);
    var randomIndex = Math.floor(Math.random() * 10);
    var snippetText = JSON.stringify(response.items[randomIndex].title.trim());
    var URL = JSON.stringify(response.items[randomIndex].link);
    var message = "It is the " + whoWasHe + " " + nameBirthday + "'s birthday today! We have a cool link for you #OnThisDay: " + snippetText + " " + URL + " #" + hashtag1 + " #blockchain #blockchaintechnology";
    return message;
}

async function googleLogic (searchterm, hashtag1) {
    return new Promise((resolve, reject) => {
        googleSearch.build({
            q: searchterm + " " + hashtag1,
            start: 5,
            // Number of search results to return between 1 and 10, inclusive
            num: 10,
        }, function (error, response) {
            if(!error) {
                resolve(response);
            }
            else {
                reject(error);
            }
        });
    })
}
module.exports = { generateTweet }