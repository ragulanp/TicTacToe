import React, { useState } from 'react';
import styled from 'styled-components';

import Cell from './Cell';


const Board = styled.div`
    border: 3px solid;
    width: 300px;
    height: 300px;
`

const TicTacToeBoard = () => {
    const [cells, setCells] = useState(new Array(3).fill(null).map(row => new Array(3).fill(null)));
    const [isXTurn, setIsXTurn] = useState(true);
    const [statusMsg, setStatusMsg] = useState("");
    const [piecesPlaced, setPiecesPlaced] = useState(0);

    const hasWon = (isXTurn:boolean) => {
        const symbol = isXTurn ? 'X' : 'O';
        for (let row=0;row<3;row++){
            for (let col=0;col<3;col++){
                if (row === 0){
                    if (recursiveCheckForWin(0, col, 1, 0, symbol)) return true; // vertically/nedover (|)
                    if(col === 0) {
                        if (recursiveCheckForWin(0, 0, 1, 1, symbol)) return true; //diagonally down right (\)
                    }
                    if(col === 2) {
                        if (recursiveCheckForWin(0, 2, 1, -1, symbol)) return true; // diagonally down left (/)
                    }
                }
                if (col === 0){
                    if (recursiveCheckForWin(row, 0, 0, 1, symbol)) return true; //horizontally/bortover (---)
                }
            }
        }
        return false;
    }

    const recursiveCheckForWin = (x:number, y:number, xVariation:number, yVariation:number, symbol:string, streak:number=0):boolean => {
        while (streak < 3){
            if (x>3 || y>3 || x<0 || y<0) return false;
            if (cells[x][y] === symbol) return recursiveCheckForWin(x+xVariation, y+yVariation, xVariation, yVariation, symbol, streak+1);
            else return false;
        }
        return true;
    }

    const updateCellValue = (isXTurn:boolean, rowPosition:number, colPosition:number) => {
        if(cells[rowPosition][colPosition] === null){
            let oldCells = cells;
            oldCells[rowPosition][colPosition] = isXTurn ? 'X' : 'O';
            setCells(oldCells);
            if (hasWon(isXTurn)) setStatusMsg("Player "+(isXTurn ? '1 (X)':'2 (O)') + " wins!");
            else if(piecesPlaced+1 === 9) setStatusMsg("Game over, it's a draw!");
            else {
                setIsXTurn(!isXTurn);
                setPiecesPlaced(piecesPlaced+1);
            }
        }
    }

    return (
        <>
        <header>{statusMsg ? statusMsg : `Next turn: Player${isXTurn ? '1 (X)' : '2 (O)'}`}</header>
        <Board>{cells.map((row,rowidx) => row.map((cellValue: string, colidx:number) => <Cell isXTurn={isXTurn} cellValue={cellValue} updateCellValue={updateCellValue} rowidx={rowidx} colidx={colidx} />))}</Board>
        </>
    );
}

export default TicTacToeBoard;