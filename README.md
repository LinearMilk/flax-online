# [FLAX - abstract board game in JavaScript](http://flax.linearmilk.com/)

[FLAX](http://flax.linearmilk.com/) is an abstract board game based on [Glüx](http://www.queen-games.com/en/2016/10/gluex-light-your-way-2/) from [Queen Games](http://www.queen-games.com/en/) created as a fan tribute to the game and as an easy way to play with other board layouts than provided in the original game. It was written in [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript) to run on the client side and utilises [Bootstrap](https://getbootstrap.com/).

## Preview

[![ Screenshot - current version](http://linearmilk.com/previews/flax-preview.png)](http://flax.linearmilk.com)

**[Playtest current version](http://flax.linearmilk.com)**

## Status

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/LinearMilk/flax-online/master/LICENSE)
[![dependencies Status](https://david-dm.org/LinearMilk/flax-online/status.svg)](https://david-dm.org/LinearMilk/flax-online)
[![devDependencies Status](https://david-dm.org/LinearMilk/flax-online/dev-status.svg)](https://david-dm.org/LinearMilk/flax-online?type=dev)

## Download and Installation

To run the game locally:

* Clone the repo: `git clone https://github.com/LinearMilk/flax-online.git`
* [Fork, Clone, or Download on GitHub](https://github.com/LinearMilk/flax-online)

### Installation

After downloading, run `npm install`, to download dependencies. Then run `npm run start` to start the development server, the script will open the game in your default browser at [http://localhost:8080/](http://localhost:8080/).
In the current version only changes to HTML and JavaScript are live-reloaded.

### NPM Scripts

* `npm run start` opens the project in your default browser and live reloads when changes are made
* `npm run build` builds the minified version in production mode
* `npm run test` runs tests using [Jest](https://facebook.github.io/jest/)

## Rules

### Game board

The board is divided into square tiles, which form rooms (darker areas) and paths (lighter areas). Each player has a defined starting position (firs tile placement) on the board as well.

### Players

The game is played between 2 players. Each players has at his disposal a stack of 24 double-sided chips, 8 of each of 3 types:

* 1 or 6
* 2 or 5
* 3 or 4.

On their turn the player draws a random chip from their supply and places it on the board according to placement rules. If a player doesn't have a legal placement available their turn immediately ends.

### Placement Rules

* On their first turns the players have to put their chip on their respective starting tiles.
* On subsequent turns the player can place a chip in straight line from any of their chips, counting the exact number of pips on the starting chip. Players cannot place a chip if their way is blocked, either by their own chip or their opponent's.
* If the destination square already contains a chip (their own or their opponent's), player can put a chip on top of existing chip covering it. This can only be done once per square, that is a stack of chips never can be higher than two. The bottom chip is not counted for movement or scoring anymore.
* Players never can place a chip on their opponent's starting tile.
* Players cannot skip moves, if a valid move exist for current player, they must make it.
* Once per game a player may place another chip on top of their starting chip.

### Scoring

Players earn 4 points for every room in which they have the most pips (combined on all their chips). If the players are tied, both of them get the points. If at the end of the game players are tied for victory, the player with more pips in the central room is the winner. If the players are tied still, they share the victory.
