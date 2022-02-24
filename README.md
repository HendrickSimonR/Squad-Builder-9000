![alt text](https://github.com/HendrickSimonR/Squad-Builder-9000/blob/main/dist/squadTest.png?raw=true)
<h1 align="center">
    https://hendricksimonr.github.io/Squad-Builder-9000/
</h1>

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
