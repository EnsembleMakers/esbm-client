import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../../lib/styleUtils';
import { Link } from 'react-router-dom';

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
    width: 95%;
    max-width: 768px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
`;

// 로고
const LogoWrapper = styled.div`
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled(Link)`
    color: #4695D6;
    font-family: 'Rajdhani';
    font-size: 2.4rem;
    letter-spacing: 1px;
    text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
`;

const AuthWrapper = ({children}) => (
    <Positioner>
            <LogoWrapper>
                <Logo to="/">ensemble makers</Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
    </Positioner>
);

export default AuthWrapper;