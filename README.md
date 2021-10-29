# Squad-Builder-9000

# Background 

Build A Squad is an algorithm that creates the starting lineup for a user's NBA fantasy draft. The application will realistically choose the best possible NBA players for their lineup, based on specific parameters:

1) How many will be participating in this draft? 

2) Which order are you in the draft? (if you're not sure what the order will be, you can test out different scenarios). 

3) Who are the current NBA players, and what are their current stats? 

With these parameters established, the application will choose who the best player is on their turn, based on the their average stats converted to fantasy points.  


# Functionality & MVPs

User's will be able to: 

- Input a favorite player that the application will attempt to retrieve, if the player is available on their turn.

- Choose how many participants are part of the draft, which will simulate the optimal Basketball players the user and the other participants will choose on their turn. These players are ranked by the average Fantasy points the player can expect to accumulate per game.

- Receive an optimal lineup of players for them to draft in the future, based on the NBA player's current stats at the time the draft is generated.

- Receive the lineups chosen by the application for the other participants, which can provide them with ideas on how to approach their future draft if these other players become available. 

- Receive an average amount of fantasy points they can expect from their chosen team per game, based on their current stats at the time of generation. 

In addition, this project will include:

- An About modal describing the background and parameters of the application

- A production README



# Wireframes 

![BUILD A SQUAD 9000](https://user-images.githubusercontent.com/81173099/139365782-ea344e98-5505-4fd3-8a10-c63df825e452.png)

- Nav links include links to the project's Github repo, LinkedIn, and the About modal

- Parameters will take user input, which will determine how many participants will be generated. 

- The center of the page will display the chosen players for the user's team, along with their name and average fantasy score.

- The left will display a list of how the players were chosen (when and by which participant).

- The right will display the average stats of the user's chosen players, as well as the total average fantasy points the team expects to receive per week. 


# Technologies, Libraries, APIs

This project will be implemented with the following technologies: 
- DataFire for the stats of NBA players 
- Canvas API to display the players and their respective information 

# Implementation Timeline

Friday afternoon & weekend
- Research how to utilize the DataFire API, how to extract the data, how to manipulate the values to generate the average fantasy score for each player. Setup project. 

Monday
- Setup webpacks. Retrieve data and develop functions to find average values for each player. 

Tuesday 
- Create classes and functions for other possible participants.

Wednesday
- Develop appearance.

Thursday
- Finalize pushes to Github.
