import React, { useState } from 'react';
import styled from 'styled-components';

import Cell from './Cell';


const Board = styled.div`
    border: 3px solid;
    width: 300px;
    height: 300px;
`;

const Menu = styled.span`
    display: flex;
    justify-content: space-between;
    width: 300px;
`;

const TicTacToeBoard = () => {
    const [cells, setCells] = useState(new Array(3).fill(null).map(row => new Array(3).fill(null)));
    const [isXTurn, setIsXTurn] = useState(true);
    const [statusMsg, setStatusMsg] = useState("");
    const [piecesPlaced, setPiecesPlaced] = useState(0);
    const [winningLine, setWinningLine] = useState([""]);
    const [lastMove, setLastMove] = useState<number[]>([]);
    const [decidedLines, setDecidedLines] = useState(0);

    const hasWon = (isXTurn:boolean) => {
        const symbol = isXTurn ? 'X' : 'O';
        setDecidedLines(0);
        for (let row=0;row<3;row++){
            for (let col=0;col<3;col++){
                if (row === 0){
                    if (recursiveCheckForWin(0, col, 1, 0, symbol)){
                        // vertically/nedover (|)
                        setWinningLine([`(0,${col})`, `(1,${col})`, `(2,${col})`]);
                        return true; 
                    }
                    if(col === 0) {
                        if (recursiveCheckForWin(0, 0, 1, 1, symbol)) {
                            //diagonally down right (\)
                            setWinningLine([`(0,0)`, `(1,1)`, `(2,2)`]);
                            return true;
                        }
                    }
                    if(col === 2) {
                        if (recursiveCheckForWin(0, 2, 1, -1, symbol)) {
                            // diagonally down left (/)
                            setWinningLine([`(0,2)`, `(1,1)`, `(2,0)`]);
                            return true;
                        }
                    }
                }
                if (col === 0){
                    if (recursiveCheckForWin(row, 0, 0, 1, symbol)) {
                        //horizontally/bortover (---)
                        setWinningLine([`(${row},0)`, `(${row},1)`, `(${row},2)`]);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    const recursiveCheckForWin = (x:number, y:number, xVariation:number, yVariation:number, symbol:string, streak:number=0):boolean => {
        while (streak < 3){
            if (x>2 || y>2 || x<0 || y<0) {
                setDecidedLines(decidedLines+1);
                return false;
            }
            if (cells[x][y] === symbol) return recursiveCheckForWin(x+xVariation, y+yVariation, xVariation, yVariation, symbol, streak+1);
            else {
                if (cells[x][y] !== null) {
                    setDecidedLines(decidedLines+1);
                    return false;
                }
                return recursiveCheckForWin(x+xVariation, y+yVariation, xVariation, yVariation, symbol, streak);
            }
        }
        return true;
    }

    const updateCellValue = (isXTurn:boolean, rowPosition:number, colPosition:number, e:React.MouseEvent) => {
        e.preventDefault();
        if(cells[rowPosition][colPosition] === null && statusMsg === ""){
            let oldCells = cells;
            oldCells[rowPosition][colPosition] = isXTurn ? 'X' : 'O';
            setCells(oldCells);
            setLastMove([rowPosition, colPosition]);
            if (hasWon(isXTurn)) setStatusMsg("Player "+(isXTurn ? '1 (X)':'2 (O)') + " wins!");
            else if(piecesPlaced+1 === 9 || decidedLines+1 === 8 || (piecesPlaced+1 === 7 && decidedLines+1 === 7)) setStatusMsg("Game over, it's a draw!");
            else {
                setIsXTurn(!isXTurn);
                setPiecesPlaced(piecesPlaced+1);
            }
        }
    }

    const isPartOfWinningLineClass = (rowPosition:number, colPosition:number) => {
        if (winningLine.includes(`(${rowPosition},${colPosition})`)) return true;
        return false;
    }

    const undoLastMove = () => {
        let newCells = cells;
        newCells[lastMove[0]][lastMove[1]] = null;
        setCells(newCells);
        setIsXTurn(!isXTurn);
        setLastMove([]);
        setPiecesPlaced(piecesPlaced-1);
    }

    return (
        <>
        <Menu>
        <button onClick={()=> window.location.reload()}>Restart game</button>
        {lastMove.length > 0 && statusMsg === "" && <button onClick={()=> undoLastMove()}>Undo</button>}
        </Menu>
        <header>{statusMsg ? statusMsg : `Next turn: Player${isXTurn ? '1 (X)' : '2 (O)'}`}</header>
        <Board>{cells.map((row,rowidx) => row.map((cellValue: string, colidx:number) => <Cell cellValue={cellValue} updateCellValue={(e) => updateCellValue(isXTurn, rowidx, colidx, e)} partOfWInningLine={isPartOfWinningLineClass(rowidx,colidx)} />))}</Board>
        </>
    );
}

export default TicTacToeBoard;