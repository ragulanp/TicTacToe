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
    cellValue: string,
    updateCellValue: (event: React.MouseEvent<HTMLSpanElement>) => void,
    partOfWInningLine: boolean, 
}

const Cell = ({cellValue, updateCellValue, partOfWInningLine}:CellPropTypes) => {
    
    return (
        <StyledCell style={partOfWInningLine?{backgroundColor: "green"}: {}} cellValue={cellValue} onClick={updateCellValue}>{cellValue ? cellValue : '_'}</StyledCell>
    )
}

export default Cell;