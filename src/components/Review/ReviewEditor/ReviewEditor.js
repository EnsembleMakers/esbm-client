import React, { Component } from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

class ReviewEditor extends Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 Framework in React</h2>
          <CKEditor
            onInit={ editor => console.log( 'Editor is ready to use!', editor ) }
            onChange={ ( event, editor ) => console.log( { event, editor } ) }
            editor={ ClassicEditor }
            data="<p>Hello from CKEditor 5!</p>"
          />
        </div>
    );
}
}

export default ReviewEditor;