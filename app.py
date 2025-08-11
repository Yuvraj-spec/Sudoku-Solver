# app.py
from flask import Flask, render_template, request, jsonify
from sudoku import solve_sudoku

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/solve", methods=["POST"])
def solve():
    data = request.get_json()
    board = data.get("board")

    if not board or len(board) != 9 or any(len(row) != 9 for row in board):
        return jsonify({"error": "Invalid board format"}), 400

    try:
        for r in range(9):
            for c in range(9):
                if board[r][c] == "":
                    board[r][c] = 0
                else:
                    board[r][c] = int(board[r][c])
    except ValueError:
        return jsonify({"error": "Board contains invalid values"}), 400

    if solve_sudoku(board):
        return jsonify({"solution": board})
    else:
        return jsonify({"error": "No solution found"}), 400

if __name__ == "__main__":
    app.run(debug=True)
