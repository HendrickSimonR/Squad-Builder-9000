![alt text](https://github.com/HendrickSimonR/Squad-Builder-9000/blob/main/dist/squadTest.png?raw=true)
<h1 align="center">
    https://hendricksimonr.github.io/Squad-Builder-9000/
</h1>

![alt text](https://github.com/HendrickSimonR/Squad-Builder-9000/blob/main/dist/screenshot.png?raw=true)

# Background 

The Squad Builder 9000 is an app that implements an algorithm that creates the optimal starting lineup for a user's NBA Fantasy Draft. The application will realistically choose the best possible NBA players for their lineup, based on specific parameters:

1) How many will be participating in this draft? 

2) Which order are you in the draft? (if you're not sure what the order will be, you can test out different scenarios). 

3) Who are the current NBA players, and what are their current stats for the season? 

With these parameters established, the algorithm will draft who the best player is during a team's turn (the best being the player with the highest average stats converted to fantasy points).  


# Functionality & MVPs

User's will be able to: 

- Input a favorite player that the algorithm will draft immediately, if the player is available on their turn.

- Choose how many participants are part of the draft, which will simulate the optimal Basketball players the user and the other participants will choose on their turn. 

- Receive an optimal lineup of players for them to draft in the future, based on the NBA player's current stats at the time the draft is generated.

- Receive the lineups chosen by the application for the other participants, which can provide them with ideas on how to approach their future draft if these other players become available. 

- Receive an average amount of fantasy points they can expect from their chosen team per game, based on their current stats at the time of generation. 

In addition, this project will include:

- A help modal describing the parameters of the application, and an explanation for how the draft concept is implemented.

- A production README


# Wireframes 

![BUILD A SQUAD 9000](https://user-images.githubusercontent.com/81173099/139365871-ea6715fa-e359-4b98-bf63-f407bddca8b4.png)

- Nav links include links to the project's Github repo, LinkedIn, Angel List, personal website, and email.

- The Parameters toolbar will take user input, which will determine how the hypothetical draft is executed. 

- The center of the page will display the chosen players for the user's team, along with their name and average fantasy score.

- The left will display a list of how the players were chosen (which team and at what point in the draft).

- The right will display the average stats of the user's chosen players, as well as the total average fantasy points the team expects to receive per week. 


# Technologies, Libraries, APIs

This project will be implemented with the following technologies: 
- BallDontLie.io - API for current NBA players' stats

# Code
## draftTeams
This function is responsible for drafting players to the teams, with players of the best average fantasy score being drafted first. The function takes in a user's input, making sure to prioritize and draft a preferred first pick if that player has not already been drafted. If the player has been drafted, the algorithm will choose the next best player available.  

Teams are objects, and the players are key-value pairs within each team object. Each player object consists of a key of their Basketball position, and the value is the player's information (name, team, points, assists, etc). When drafting is complete, the function will return the team object that corresponds with the User's specified position in the draft.

```javascript
function draftTeams(fullDetails, userInput, sortedScores, playerInfo) {
  let pos;
  let team;
  let playerID;
  let count = 0;
  let teams = [];
  let favoriteFound = false;
  let amount = userInput.amount;
  let favorite = userInput.favorite;
  let userPlacement = userInput.placement - 1;

  while (teams.length < amount) teams.push({});  

  while (count < amount * 5) {
    for (let i = 0; i < teams.length; i++) {
      team = teams[i];

      if (i === userPlacement) {
        if (favoriteFound === false) {
          favoriteFound = true;

          let favePlayer = draftFavorite(team, favorite, fullDetails, playerInfo);

          if (!favePlayer) {
            playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
            
            if (playerID) {
              pos = fullDetails[playerID]["pos"];
              team[pos] = fullDetails[playerID];
            }

          } else {
            pos = fullDetails[favePlayer]["pos"];
            team[pos] = fullDetails[favePlayer];         
          }

        } else {
          playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
          
          if (playerID) {           
            pos = fullDetails[playerID]["pos"];
            team[pos] = fullDetails[playerID];                        
          }
        }

      } else {
        playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);
        
        if (playerID) {
          pos = fullDetails[playerID]["pos"];
          team[pos] = fullDetails[playerID];               
        }
      }
    }

    count++;

    for (let i = teams.length - 1; i >= 0; i--) {
      team = teams[i];
      playerID = draftPlayer(team, fullDetails, playerInfo, sortedScores);

      if (!playerID) {
        null
      } else {
        pos = fullDetails[playerID]["pos"];
        team[pos] = fullDetails[playerID];
        details = extractInfo(i, team[pos], pos);
      }
    }

    count++;
  }

  resetPlayers(playerInfo, fullDetails);
  return teams[userPlacement];
}
```
## API Fetch, Match, and Sort

This function is responsible for retrieving all of the player data from the BallDontLie API. Within the database, player information (name, team, vitals, etc) and player statistics (points, assists, rebounds, etc) have different URLs. Because of this, I used callback functions to retrieve the information separately, and attached the information within the function below. 

The fetching of data is done before a user can interact for several reasons:
- The API limits 60 fetches per minute, so the app will utilize the same data for however many times a user decides to generate a draft, without having to subsequently fetch afterwards. With this in mind, the app will only utilize the top 60 objectively best NBA players.
- Only when the data is properly fetched and sorted will the user be able to draft. This prevents any fetching errors from happening. 

Before a player object is created, the average fantasy score based on the player's current season statistics are calculated. Once all player objects are completed, another callback is used to sort the player objects in descending order, with the highest average first on the list.

Once all actions are completed, the user can draft as often as desired. 

* callback functions are imported from other JS files, which are not listed here.

```javascript
document.addEventListener("DOMContentLoaded", async () => {
  let fullDetails = {};
  let scores = [];
  let nameAndID = [];

  for (let i = 0; i < playerIDs.length; i++) {      
    let playerID = playerIDs[i];
    let playerObj = await fetchPlayerStats(playerID);
    
    if (!playerObj) continue;  

    let stats = playerObj.data[0];
    let playerName;
    let playerPos;
    let playerTeam;
    let playerImg;
    
    if (players[playerID]) {
      playerName = players[playerID].name;
      playerPos = players[playerID].pos;
      playerTeam = players[playerID].team;
      playerImg = players[playerID].image;
      nameAndID.push([playerName, playerID]);
    }

    let offPoints = stats.pts + (stats.ast * 1.5);
    let defPoints = (stats.reb * 1.2) + (stats.stl * 3) + (stats.blk * 3);
    let to = stats.turnover;
    let fantasyAvg = (offPoints + defPoints - to);

    let playerInfo = {
      image: playerImg,
      name: playerName,
      pos: playerPos,
      team: playerTeam,
      stats: { 
        pts: stats.pts, 
        ast: stats.ast, 
        ftm: stats.ftm, 
        reb: stats.reb, 
        stl: stats.stl, 
        blk: stats.blk, 
        to: stats.turnover, 
        min: stats.min,
        games: stats.games_played
      },

      avg: fantasyAvg,
      drafted: false
    };
    
    fullDetails[playerID] = playerInfo;
    scores.push(fantasyAvg);
  }

  let sortedScores = scores.sort().reverse();
  let sortedIDs = sortIDs(sortedScores, playerIDs, fullDetails);
  let playerInfo = playerVitals(sortedIDs, fullDetails);

  let userInput = returnInput(fullDetails, sortedScores, playerInfo);
  userInput;
});

```

# Implementation Timeline

Friday afternoon & weekend
- Research how to utilize the chosen API, how to extract the data, and how to manipulate the values to generate the average fantasy score for each player. 
- Setup project. 

Monday
- Setup webpacks. Retrieve data and develop functions to find average values for each player. 

Tuesday 
- Create classes and functions for other possible participants.

Wednesday
- Develop styling.

Thursday
- Finalize pushes to Github.
