import React, { Component } from 'react';
import './ReviewCoverImg.scss';

class ReviewCoverImg extends Component {
  render() {
    const { coverImgURL } = this.props;
    const { handleChangeCoverImg, handleDeleteCoverImg } = this.props;
    return(
      <div>
        <div className="review-cover-label">커버 이미지를 선택해주세요!</div>
        <div className="review-cover-wrapper">
          <div className="review-cover-thumbnail-wrapper">
            <div className="review-cover-thumbnail">
              {coverImgURL && <img src={coverImgURL}/>}
            </div>
          </div>
          <div className="review-cover-img-button-wrapper">
            <div style={{color: '#767676', fontSize: '16  px',fontWeight: '600', marginBottom: '5px'}}>커버 이미지 올리기</div>
            <div style={{color: '#767676', fontSize: '13px', fontWeight: '600', marginBottom: '5px'}}>아래 버튼을 클릭해서 커버 이미지를 등록하거나 수정할 수 있습니다.</div>
            <div style={{color: '#767676', fontSize: '13px', fontWeight: '600', marginBottom: '5px'}}>고효율포맷(HEIC)은 지원하지 않습니다.</div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div className="review-cover-img-button-box">
                <label htmlFor="ex_file">사진선택</label>
                <input type="file" id="ex_file" accept=".gif, .jpg, .jpeg, .png" onChange={handleChangeCoverImg}/>
              </div>
              <div className="review-cover-img-delete-button-box">
                <label onClick={handleDeleteCoverImg}>사진삭제</label>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default ReviewCoverImg;