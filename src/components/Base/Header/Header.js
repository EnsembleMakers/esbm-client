import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { media, device } from '../../../lib/styleUtils';

// 상단 고정, 그림자
const Positioner = styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    border-bottom: 1px solid #eee;
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media ${device.phone} { 
        padding-right: 5px;
        padding-left: 5px;
        width: 94%;
    }
    @media ${device.tablet} { 
        padding-right: 10px;
        padding-left: 10px;
        width: 94%;
    }
    @media ${device.desktop} { 
        padding-right: 20px;
        padding-left: 20px;
        width: 90%;
    }
    @media ${device.wide} { 
        padding-right: 20px;
        padding-left: 20px;
        width: 90%;
    }

`;

// 로고
const Logo = styled.a`
    display: inline-block;
    letter-spacing: 1px;
    color: #f69e53;
    font-family: 'Rajdhani';
    text-decoration: none;

    @media ${device.phone} { 
        font-size: 20px;
    }
    @media ${device.tablet} { 
        font-size: 20px;
    }
    @media ${device.desktop} { 
        font-size: 28px;
    }
    @media ${device.wide} { 
        font-size: 28px;
    }
`;

// 중간 메뉴
const Menu = styled.div`
    flex-grow: 1;
    padding-right: 10px;
    padding-left: 10px;
    // border: 1px solid red;
`;

const Header = ({children}) => {
    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                    <Logo href="/">ensemble makers</Logo>
                    <Menu></Menu>
                    {children}
                </HeaderContents>
            </WhiteBackground>
        </Positioner>
    );
};

export default Header;