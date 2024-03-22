import styled from 'styled-components';

export const Section = styled.section`
.circles-container{
    display: flex;
}

.circle {
    margin: .75rem 0 0 .75rem;
    border-radius: 50%;
    height: 1.5rem;
    width: 1.5rem;
    text-align: center;
    cursor: default;
    font-size: .75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .3s;
}

.inactive {
    background-color: #6c6c6c;
    opacity: .5;
}

.active{
    background-color: #a6a6a6;
}

.guess{
    position: relative;
    z-index: 5000;
}

.guess::before{
    content: '';
    height: 110%;
    width: 110%;
    position: absolute;
    border-radius: 50%;
    border: 2px solid #b8ced7;
    transition: .3s;
    animation: test 1s alternate infinite ease-in-out;
}

@keyframes test {
    0% {
        border-color: palegoldenrod;
        transform: scale(1.1);
    }
    100% {
        border-color: #f29516;
        transform: scale(1);
    }
}

.target {
    background-color: #f29516;
}

`