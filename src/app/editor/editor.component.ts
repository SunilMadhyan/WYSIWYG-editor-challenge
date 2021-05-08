import { Component, OnInit } from '@angular/core';
import * as ClassicEditor  from '../../ckeditor';
import { DocumentService } from '../shared/document.service';
import { Document} from '../constants/document';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  document: Document = new Document("","","");
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

  constructor(private route: ActivatedRoute, private router: Router, private documentService: DocumentService) { 
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.document.id = params['id'];
    });
    if ( this.document.id ) {
      this.documentService.getDocuments(this.document.id)
      .subscribe(data => {
        this.document = data.body[0];
        this.model.editorData = data.body[0].document;
        console.log(this.document);
      })
    }

  }

  public navigateHome() {
    this.router.navigate(['/']);
  }

  public saveDocument() {
    this.documentService.saveDocument(new Document('',this.model.editorData,''))
    .subscribe(data => {
      if (data && data.status === "success" ) {
        this.document = data.message[0];
        this.model.editorData = data.message[0].document;
      }
    });
  }

  public updateDocument() {
    this.documentService.updateDocument(new Document(this.document.id,this.model.editorData,''))
    .subscribe(data => {
      if (data && data.status === "success" ) {
        this.document = data.message[0];
        this.model.editorData = data.message[0].document;
      }
    });
  }
}
