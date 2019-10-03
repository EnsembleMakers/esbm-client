import React, { Component } from 'react';
import './ModelModal.scss';
import { FaTimes } from 'react-icons/fa';
import { DetailInput } from '../DetailInput';
import { ModalError } from '../ModalError';

import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';

class ModelModal extends Component {
  render() {
    const { mode, addMode, addContent, detail, contents, modelImageURL, error } = this.props;
    const { handleChangeTemplateInput, handleChangeMainInput, handleChangeModelImg, handleDeleteModelImg, handleChangeAddMode, handleChangeAddInput, handleAddList, handleDeleteList } = this.props;
    const { handlePost, handlePatch, handleHide } = this.props;

    let buttonOn;
    const templateInputList = contents.get('template').map(
      (content, i) => {
        return <DetailInput
          key={i}
          name={i}
          deleteButton={true}
          label={content.label}
          placeholder={content.label}
          // only id, name, value, type are valid with input tags.
          value={content.value || ''}
          onChange={(e, kind) => handleChangeTemplateInput(e)}
          handleDeleteList={() => handleDeleteList(i, 'template')}
        />
      }
    )
    return(
      <div className="model-modal-wrapper">
        <div 
          className="modal-cancel-button"
          onClick={handleHide}
        ><FaTimes/>
        </div>
        <div className="model-modal-header">{ mode === 'create' ? "모델 등록하기" : "모델 수정하기"}</div>
        <div className="model-modal-line"/>
        <div style={{marginTop: '10px', textAlign: 'left', fontSize: '18px', color: '#767676', marginBottom: '10px', fontWeight: '600'}}>모델 이미지</div>
        <div className="model-modal-image-wrapper">
          {modelImageURL===null?
          <div className="model-modal-image"/>
          :<img className="model-modal-image" src={modelImageURL}/>
          }
          <div className="model-modal-image-button-wrapper">
            <div style={{color: '#767676', fontSize: '16  px',fontWeight: '600', marginBottom: '5px'}}>모델 이미지 올리기</div>
            <div style={{color: '#767676', fontSize: '13px', fontWeight: '600', marginBottom: '5px'}}>아래 버튼을 클릭해서 모델 이미지를 등록하거나 수정할 수 있습니다.</div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div className="model-modal-image-button-box">
                <label htmlFor="ex_file">사진선택</label>
                <input type="file" id="ex_file" onChange={handleChangeModelImg}/>
              </div>
              <div className="model-modal-image-delete-button-box">
                <label onClick={handleDeleteModelImg}>사진삭제</label>
              </div>
            </div>
          </div>
        </div>
        <div className="model-modal-line"/>
        {/* 모델명 */}
        <DetailInput
          deleteButton={false}
          label={'모델명'}
          name={'model'}
          placeholder={'모델명'}
          value={contents.get('model')||''}
          onChange={handleChangeMainInput}
        />
        {/* 템플릿 */}
        {templateInputList}
        {addMode === false && <div className="model-modal-open-add-input-button" onClick={() => handleChangeAddMode(true)}> 작성 목록 추가하기 </div>}
        {addMode === true && 
          <div className="model-modal-add-wrapper">
            <input 
              className="model-modal-add-input"
              placeholder="추가할 목록을 작성하세요"
              value={addContent || ''}
              onChange={handleChangeAddInput}
            />
            <div className="model-modal-add-button" onClick={() => handleAddList(addContent)}>추가하기</div>
            
            <div className="model-modal-add-cancel-button" onClick={() => handleChangeAddMode(false)}>X</div>
          </div>
        }
        <ModalError>{error.get('message')}</ModalError>
        {mode === 'create' &&
        <div className="model-modal-post-button" onClick={handlePost}>추가하기</div> ||
        mode === 'modify' &&
        <div className="model-modal-post-button" onClick={handlePatch}>저장하기</div>
        }
      </div>
    )
  }
}

export default ModelModal;