import React, { Component } from 'react';
import styled from 'styled-components';
import { ImageRail } from '../../ReviewSeriesId/ImageRail';
import './ReviewSeriesIdItem.scss';

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  transition: .2s linear;
  height: 600px;
  border: 3px solid #549dd9; 
  flex-direction: column;

  ${props => props.selected == false && 
    `
    border: none;
    border-top: 1px solid;
    border-top-color: #ddd;
    height: 120px;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    `
  }
  
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 152px;
  width: 32.33%;
  ${props => props.selected == true && 
    `
    width: 100%;
    `
  }
`

const Rating = styled.div`
  width: 22.33%;
`

const Title = styled.div`
  color: #484848;
  font-weight: 700;
  font-size: 23px;
  ${props => props.selected == true && 
    `
    text-align: center; 
    margin-bottom: 10px; 
    font-size: 24px;
    `
  }
`

const Auth = styled.div`
  font-size: 16px;
  margin-top: 8px;
  color: grey;
  ${props => props.selected == true && 
    `
    text-align: right;
    `
  }
`

const Stat = styled.div`
  font-size: 18px;
  margin-top: 8px;
  color: grey;
  ${props => props.selected == true && 
    `
    text-align: right;
    `
  }
`

const DetailContents = styled.div`
  height: 420px;
  border-radius: 10px;
  background-color: #f5f5f5;
  color: #6A6A6A;
  padding: 15px;
  margin-top: 10px;
  overflow: scroll;
`

class ReviewSeriesIdItem extends Component {
  render() {
    const { review, reviewById } = this.props;

    const { handleGetById } = this.props;
    let selected = reviewById.get('_id')==review._id 

    return(
      <Wrapper
        selected={selected}
        onClick={()=>{!selected && handleGetById(review._id)}}
      >
      <Header selected={selected}>
        <Title selected={selected}>{review.title}</Title>
        <Auth selected={selected}>작성자</Auth>
        <Stat selected={selected}>신뢰도 <img style={{width: '45px'}} src='/img/gauge11.png'/></Stat>
      </Header>
      {!selected && <Rating><div>평점: 5</div><img src='/img/star22.png'/></Rating>}
      {!selected && <ImageRail images={review.images}></ImageRail>}
      {selected && <div><DetailContents dangerouslySetInnerHTML={ {__html: review.content} }/><a href={`/reviewOrder/${review._id}`}>자세히보기</a></div>}
      </Wrapper>
    )
  }
}

export default ReviewSeriesIdItem;