import { Component, OnInit } from '@angular/core';
import * as ClassicEditor  from '../../ckeditor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  public model= {
    editorData: "<p>Hello world!</p>"
  } 
  public Editor = ClassicEditor;
  editorConfig = {
    toolbar: [ 'heading', 'bold', 'italic', '|', 'bulletedList', 'numberedList','|', 'fontFamily', 'fontSize', 'fontColor', '|', 	'subscript', 'superscript', 'blockQuote' ],
    heading: {
      options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
      ]
    },
    fontSize: {
      options: [
          9,
          11,
          13,
          'default',
          17,
          19,
          21,
          22,
          24,
          26,
          28,
          32
      ]
    },
    fontFamily: {
      options: [
          'default',
          'Ubuntu, Arial, sans-serif',
          'Ubuntu Mono, Courier New, Courier, monospace',
          'Times, Times New Roman, Georgia, serif',
          'Verdana, Arial, Helvetica, sans-serif',
          'Lucida Console, Courier, monospace',
          'cursive',
          'fantasy'
      ]
    },
  }

  constructor() { }

  ngOnInit(): void {
  }

  public navigateHome() {

  }
  public saveDocument() {
    
  }
}
