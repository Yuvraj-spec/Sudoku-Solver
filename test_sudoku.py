# tests/test_sudoku.py
import pytest
from sudoku import solve_sudoku
from sample_puzzles import EASY_PUZZLE

def test_solver():
    board = [row[:] for row in EASY_PUZZLE]
    assert solve_sudoku(board) is True
    for row in board:
        assert set(row) == set(range(1, 10))
