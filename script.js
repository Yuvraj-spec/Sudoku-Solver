// Initialize the Sudoku grid inputs dynamically
function createGrid() {
  const grid = document.getElementById("sudoku-grid");
  grid.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.setAttribute("maxlength", "1");
    input.setAttribute("type", "text");
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("pattern", "[1-9]");
    input.setAttribute("aria-label", `Cell ${Math.floor(i / 9) + 1}, ${i % 9 + 1}`);

    // Restrict input to digits 1-9 only
    input.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^1-9]/g, "");
    });

    // Allow arrow key navigation between inputs
    input.addEventListener("keydown", (e) => {
      const index = [...grid.children].indexOf(e.target);
      let nextIndex;
      switch (e.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % 81;
          grid.children[nextIndex].focus();
          e.preventDefault();
          break;
        case "ArrowLeft":
          nextIndex = (index + 80) % 81;
          grid.children[nextIndex].focus();
          e.preventDefault();
          break;
        case "ArrowDown":
          nextIndex = (index + 9) % 81;
          grid.children[nextIndex].focus();
          e.preventDefault();
          break;
        case "ArrowUp":
          nextIndex = (index + 72) % 81;
          grid.children[nextIndex].focus();
          e.preventDefault();
          break;
      }
    });

    grid.appendChild(input);
  }
}

// Extract the board as a 2D array from input values
function getBoard() {
  const inputs = document.querySelectorAll("#sudoku-grid input");
  let board = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push(inputs[i * 9 + j].value || "");
    }
    board.push(row);
  }
  return board;
}

// Fill the grid inputs from a 2D board array
function setBoard(board) {
  const inputs = document.querySelectorAll("#sudoku-grid input");
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      inputs[i * 9 + j].value = board[i][j] || "";
    }
  }
}

// Clear all inputs
function clearGrid() {
  const inputs = document.querySelectorAll("#sudoku-grid input");
  inputs.forEach(input => input.value = "");
}

// Call backend API to solve the Sudoku puzzle
async function solveSudoku() {
  const board = getBoard();

  const response = await fetch("/solve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ board }),
  });

  const data = await response.json();

  if (data.solution) {
    setBoard(data.solution);
  } else {
    alert(data.error || "No solution found.");
  }
}

// Load a sample Sudoku puzzle
function loadSamplePuzzle() {
  const sample = [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9],
  ];
  setBoard(sample);
}

createGrid();
