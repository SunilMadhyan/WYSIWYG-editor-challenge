import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentService } from '../shared/document.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private destroyed: Subject<any> = new Subject<void>();
  documentList: any;
  constructor(documentService: DocumentService) {
    documentService.getDocuments().pipe(takeUntil(this.destroyed)).subscribe(resp => {
      if(resp.ok && resp.status === 200){
        this.documentList = resp.body;
        console.log(this.documentList);
      }
    });
   }

  ngOnInit(): void {
  }

  public ngOnDestroy() {
    this.destroyed.next();
  }

}
