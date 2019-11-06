import React, { Component } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'; 
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { get } from 'http';

class ReviewEditor extends Component {

  render() {
    const { socket, roomId, reviewData, reviewMode } = this.props;
    const { handleChangeMode } = this.props;
    let reviewId = !reviewData ? undefined : reviewData.get('_id')
    // console.log(reviewMode);
    return (
        <div className="App">
            {/* <div> {roomId} </div> */}
            <h2>Using CKEditor 5 Framework in React</h2>
            <CKEditor
              editor={ ClassicEditor }
              
              // onInit={ editor => {
              //   // Connect the upload adapter using code below 
              //   editor.plugins.get("FileRepository").createUploadAdapter = function(loader) {
              //     console.log('uploadAdapter')
              //     return new UploadAdapter(loader);
              //   };
              // }}
              onChange={ ( event, editor ) => { 
                // console.log( editor.getData() );
                socket.emit('add', { roomId, data: editor.getData() } );
              }}
              onBlur={ ( event, editor ) => {
                // console.log( 'Blur.' );
                // console.log( 'Blur.', editor.commands._commands.get('undo') );
                if ( reviewData.get('isCommit') && reviewMode == 'complete' ) {
                  editor.commands._commands.get('undo').clearStack();
                  handleChangeMode('edit');
                }
              } }
              config={ {
                language: 'ko',
                plugins: [ Essentials, Paragraph, Bold, Italic, Heading, Alignment, UploadAdapter, Autoformat,
                  EasyImage, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize, SimpleUploadAdapter ],
                toolbar: [ 'heading', '|', 'bold', 'italic', '|', 'undo', 'redo', '|',  'alignment', '|', 'imageUpload'],
                image: {
                  toolbar: ['imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
                  styles: [
                    'full',
                    'alignLeft',
                    'alignRight'
                  ],
                  resizeUnit: '%'
                },
                ckfinder: {
                  uploadUrl: 'http://localhost:3000/api/reviews/imageUpload',
                  options: {
                    resourceType: 'Images'
                  }
                },
                simpleUpload: {
                  // The URL that the images are uploaded to.
                  uploadUrl: 'http://localhost:3000/api/reviews/imageUpload',
      
                  // Headers sent along with the XMLHttpRequest to the upload server.
                  headers: {
                      // 'X-CSRF-TOKEN': 'CSFR-Token',
                      // Authorization: 'Bearer <JSON Web Token>'
                      'X-CSRF-TOKEN': 'CSFR-Token',
                      'roomId': this.props.roomId,
                      reviewData: reviewId
                  }
                }
              }}
              
              data={ reviewId && 
                reviewData.get('tempContent')
              }
            />
        </div>
    );
}
}

export default ReviewEditor;