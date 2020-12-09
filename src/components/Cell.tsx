import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.span`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 98px;
    min-height: 98px;
    border: 1px solid white;
    font-size: 70px;
    color: ${(props:{cellValue:string}) => props.cellValue ? "" : "#282c34"};

    :hover {
        cursor: pointer;
    }
`;

interface CellPropTypes{
    isXTurn: boolean,
    cellValue: string,
    updateCellValue: (isXTurn:boolean, rowPosition:number, colPosition:number) => void,
    rowidx: number,
    colidx: number,
}

const Cell = ({isXTurn, cellValue, updateCellValue, rowidx, colidx}:CellPropTypes) => {
    
    return (
        <StyledCell cellValue={cellValue} onClick={(e)=>{e.preventDefault();updateCellValue(isXTurn, rowidx, colidx)}}>{cellValue ? cellValue : '_'}</StyledCell>
    )
}

export default Cell;