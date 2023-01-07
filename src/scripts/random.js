  while (count < amount * 5) {
    for (let i = 0; i < teams.length; i++) {
      team = teams[i];

      if (i === userPlacement) { // if user
        if (favoriteFound === false) { // favoriteFound is false, attempt to draftfavorite
          let favePlayer = draftFavorite(team, favorite, allPlayers, playerInfo);
          favoriteFound = true;

          if (!favePlayer) { // if favorite unavailable, draft next best player
            playerID = draftPlayer(team, allPlayers, playerInfo, sortedScores);
            
            if (playerID) {
              let [ id, idx ] = playerID;
              let player = allPlayers[idx];
              // console.log('id, idx', id, idx)
              // console.log('allPlayersIdx', allPlayers[idx], fullDetails[playerID[0]]["pos"]);
              pos = player["pos"];
              team[pos].push(player);
              allPlayers = allPlayers.slice(0, idx).concat(allPlayers.slice(idx + 1));
              details = extractInfo(i, player, pos);
              drafted.push(`${details}, user`);           
            }
          } else { // if favorite found, add favorite to team
            pos = fullDetails[favePlayer[0]]["pos"];
            team[pos].push(fullDetails[favePlayer[0]]);
          // fullDetails[favePlayer]['drafted'] = true;
            allPlayers = allPlayers.slice(0, favePlayer[1]).concat(allPlayers.slice(favePlayer[1] + 1));
            details = extractInfo(i, fullDetails[favePlayer[0]], pos);
            drafted.push(`${details}, user`);               
          }
        } else { // if favorite Found is true, draft best player possible
          playerID = draftPlayer(team, allPlayers, playerInfo, sortedScores);
          // console.log('playerID', playerID)
          // if (playerID === false) console.log('false result', i, team)
          
          if (playerID === false) {
            let playerNeeded = fillRole(team);
            playerID = draftRoleplayer(playerInfo, playerNeeded);    
          }

          if (playerID) {           
            pos = fullDetails[playerID[0]]["pos"];
            team[pos].push(fullDetails[playerID[0]]);
          // fullDetails[playerID]['drafted'] = true;
            allPlayers = allPlayers.slice(0, playerID[1]).concat(allPlayers.slice(playerID[1] + 1));
            details = extractInfo(i, fullDetails[playerID[0]], pos);
            drafted.push(`${details}, user`);                             
          }
        }
      } else { // NOT USER, draft best player 
        playerID = draftPlayer(team, allPlayers, playerInfo, sortedScores);
        //   console.log('playerID', playerID)
        // if (playerID === false) console.log('false result', i, team)

        if (playerID === false) {
          let playerNeeded = fillRole(team);
          playerID = draftRoleplayer(playerInfo, playerNeeded);    
        }

        if (playerID) {
          pos = fullDetails[playerID[0]]["pos"];
          team[pos].push(fullDetails[playerID[0]]);
          // fullDetails[playerID]['drafted'] = true;
          details = extractInfo(i, fullDetails[playerID[0]], pos);
          drafted.push(`${details}`);       
          allPlayers = allPlayers.slice(0, playerID[1]).concat(allPlayers.slice(playerID[1] + 1));
        } else {
          console.log('pooplah')
        }
      }
    }
  }