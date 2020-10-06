import React, { useState } from "react";
import "./App.css";
import GoL from "@jcuello123/game_of_life";
import { Button } from "@material-ui/core";

const { Game, CellState, Cell } = GoL;
const { DEAD, ALIVE } = CellState;

const game_state = [
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(ALIVE),
    new Cell(ALIVE),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(ALIVE),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
  [
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
    new Cell(DEAD),
  ],
];

const game = new Game(game_state);

function App() {
  let [state, setState] = useState(game_state);

  function randomColor() {
    let colors = [
      "#5680E9", //darkest blue
      "#84CEEB", //lightest blue
      "#5AB9EA", //mid blue
      "#C1C8E4", //light purple
      "#8860D0", //purple
    ];

    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }

  function nextState() {
    const next_state = game.nextState();
    game.state = next_state;
    setState(next_state);
  }

  function toggleState(row, col) {
    let next_state = new Array(state.length);
    for (let i = 0; i < next_state.length; i++) {
      next_state[i] = new Array(state[0].length);
    }

    for (let i = 0; i < next_state.length; i++) {
      for (let j = 0; j < next_state[0].length; j++) {
        next_state[i][j] = new Cell(state[i][j].state);
      }
    }

    next_state[row][col].state =
      next_state[row][col].state === ALIVE ? DEAD : ALIVE;
    game.state = next_state;
    setState(next_state);
  }

  function clearState() {
    let next_state = new Array(state.length);
    for (let i = 0; i < next_state.length; i++) {
      next_state[i] = new Array(state[0].length);
    }

    for (let i = 0; i < next_state.length; i++) {
      for (let j = 0; j < next_state[0].length; j++) {
        next_state[i][j] = new Cell(DEAD);
      }
    }

    game.state = next_state;
    setState(next_state);
  }

  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>

      <h3>Rules:</h3>
      <ul>
        <li>Any live cell with two or three live neighbours survives.</li>
        <li>Any dead cell with three live neighbours becomes a live cell.</li>
        <li>
          All other live cells die in the next generation. Similarly, all other
          dead cells stay dead.
        </li>
      </ul>
      <h3>
        (Click on the grid to create cells, then repeatedly click on the next
        state button.)
      </h3>

      <div className="grid">
        {state.map((row, row_num) => (
          <div className="row" key={row_num}>
            {row.map((cell, col_num) => (
              <div
                className="cell"
                onClick={() => toggleState(row_num, col_num)}
                key={col_num}
                style={{
                  background: cell.state === ALIVE ? randomColor() : "white",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div className="btn">
        <Button onClick={nextState} variant="contained" color="primary">
          Next generation
        </Button>
      </div>

      <div className="btn">
        <Button onClick={clearState} variant="contained" color="primary">
          Clear
        </Button>
      </div>
    </div>
  );
}

export default App;
