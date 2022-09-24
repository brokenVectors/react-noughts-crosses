import {useState} from 'react'
import './App.css'

function Cell(props) {
    return <button className="grid-cell" onClick={props.onClick}>{props.value}</button>
}
function Grid(props) {
    let cells = [];
    for (let i = 0; i < 9; i++) {
        let displayValue;
        if(props.board[i] == null) {
            displayValue = '';
        }
        else if(props.board[i] == false) {
            displayValue = 'O';
        }
        else {
            displayValue = 'X';
        }
        cells.push(<Cell key={i} value={displayValue} onClick={() => {props.onClick(i)}} />);
    }
    return <div className="grid center">
        { cells }
    </div>
}

function calculateWinner(board) {
    
    if( (board[0] === board[1]) && ( board[1] === board[2])) {
        return board[0];
    }
    if( (board[3] === board[4]) && ( board[4] === board[5])) {
        return board[3];
    }
    if( (board[6] === board[7]) && ( board[7] === board[8])) {
        return board[6];
    }

    if( (board[0] === board[3]) && ( board[3] === board[6])) {
        return board[0];
    }
    if( (board[1] === board[4]) && ( board[4] === board[7])) {
        return board[1];
    }
    if( (board[2] === board[5]) && ( board[5] === board[8])) {
        return board[2];
    }

    if( (board[0] === board[4]) && ( board[4] === board[8])) {
        return board[0];
    }
    if( (board[2] === board[4]) && ( board[4] === board[6])) {
        return board[2];
    }
}
function isDraw(board) {
    if(calculateWinner(board)) {
        return false;
    }
    let nulls = 0;
    for(let i = 0; i < board.length; i++) {
        if(board[i] == null) {
            nulls ++;
        }
    }
    return nulls == 0
}
function Game() {
    let [board, setBoard] = useState(Array(8));
    let [moveNumber, setMoveNumber] = useState(0);
    function handleClick(i) {
        if(board[i] == null) {
            let newBoard = board.slice();
            newBoard[i] = (moveNumber % 2 == 0);
            setMoveNumber(moveNumber + 1);
            setBoard(newBoard);
        }
    }
    let winner = calculateWinner(board);
    if(isDraw(board)) {
        return <p>Draw!</p>
    } 
    if(winner) {
        return <p>{winner ? 'X' : 'O'} wins!</p>
    }
    else {
        return <div>
            <Grid board={board} onClick={(i) => {handleClick(i)}} />
        </div>
    }
    
}
export default function App() {
    return <div>
        <h1 className="center mt">Noughts & Crosses</h1>
        < Game />
    </div>
}