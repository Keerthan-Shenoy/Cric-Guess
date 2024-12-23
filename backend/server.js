const express = require('express');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

const mongoose = require("mongoose");
require('mongoose-int32').loadType(mongoose);
const { Int32, ObjectId } = mongoose.Schema.Types;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/CricGuess');

  const Schema = new mongoose.Schema({
    _id: { type: ObjectId, auto: true },
    id: Int32,
    name: String
  });
  const Model = mongoose.model('players', Schema);

  const country = {
    6: "India",
    2: "Australia",
    40: "Afghanistan",
    25: "Bangladesh",
    1: "England",
    5: "New Zealand",
    7: "Pakistan",
    3: "South Africa",
    8: "Sri Lanka",
    4: "West Indies"
  }

  app.get('/', async (request, response) => {
    if (!request.query.name) {
      const count = await Model.countDocuments();
      const random = Math.floor(Math.random() * count);
      const initData = await Model.findOne().skip(random);
      playerName = initData["name"];
    }
    else {
      playerName = request.query.name;
    }
    const findPlayerByName = async (playerName) => {
      try {
        const player = await Model.findOne({ name: playerName });
        if (player) {
          let link = 'http://core.espnuk.org/v2/sports/cricket/athletes/';
          link = link + player.id.toString();
          
          let original = 'https://www.espncricinfo.com/cricketers/'
          let l = playerName.split(' ');
          for(let i=0; i<l.length; i++) {
            original += l[i].toLowerCase();
            original += '-';
          }
          original += player.id.toString()
          
          let matches = 0
          fetch(original)
            .then(res => res.text())
            .then(html => {
              const $ = cheerio.load(html)
              const rows = $('table tr');
              for (let i = 1; i < rows.length; i++) {
                if($(rows[i]).find('td').eq(0).text() == 'Tests' || $(rows[i]).find('td').eq(0).text() == 'ODIs' || $(rows[i]).find('td').eq(0).text() == 'T20Is') {
                  matches += Number($(rows[i]).find('td').eq(1).text());
                }
              }
            })
            .catch(error => {
              console.error('Error fetching the web page:', error);
            });
          
          res = await fetch(link);
          if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();

          let dob = new Date(data["dateOfBirth"]);

          /*let ipl = ['335974']
          let teams = data["majorTeams"]
          for(let i=0; i<teams.length; i++) {
            let id = teams[i][ref].split('/')[-1]
            if(ipl.includes(id)){
              
            }
          }*/
          let info = {
            name: player.name,
            country: country[data["country"]],
            role: data["position"]["name"],
            retired: data["isActive"] == false ? "Yes" : "No",
            year: dob.getFullYear(),
            style: data["style"][0]["description"].split("-")[0],
            matches: matches / 2,
            ipl: "RCB"
          }
          response.json(info)
        } else {
          console.log('Player not found');
        }
      } catch (error) {
        console.error('Error finding player:', error);
      }
    };
    findPlayerByName(playerName);
  });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});