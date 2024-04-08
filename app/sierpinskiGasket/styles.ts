import styled from "styled-components";

type ContainerProperties = {
    $size: number
}

export const Container = styled.section<ContainerProperties>`
    height: ${props => props.$size}px;
    width: ${props => props.$size}px;

    background-color: blueviolet;
`