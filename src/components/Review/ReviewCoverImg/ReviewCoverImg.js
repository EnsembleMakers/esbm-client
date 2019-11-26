import React, { Component } from 'react';
import './ReviewCoverImg.scss';

class ReviewCoverImg extends Component {
  render() {
    const { coverImgURL } = this.props;
    const { handleChangeCoverImg, handleDeleteCoverImg } = this.props;
    return(
      <div className="review-cover-img-wrapper">
        {!coverImgURL?
        <div className="review-cover-img"/>
        :<img className="review-cover-img" src={coverImgURL}/>
        }
        <div className="review-cover-img-button-wrapper">
          <div style={{color: '#767676', fontSize: '16  px',fontWeight: '600', marginBottom: '5px'}}>모델 이미지 올리기</div>
          <div style={{color: '#767676', fontSize: '13px', fontWeight: '600', marginBottom: '5px'}}>아래 버튼을 클릭해서 모델 이미지를 등록하거나 수정할 수 있습니다.</div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="review-cover-img-button-box">
              <label htmlFor="ex_file">사진선택</label>
              <input type="file" id="ex_file" onChange={handleChangeCoverImg}/>
            </div>
            <div className="review-cover-img-delete-button-box">
              <label onClick={handleDeleteCoverImg}>사진삭제</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReviewCoverImg;