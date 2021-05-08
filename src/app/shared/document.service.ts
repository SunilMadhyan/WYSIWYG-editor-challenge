import { Injectable } from  "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Document } from '../constants/document'
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
   providedIn: 'root' 
})
export class DocumentService {

    constructor(private http: HttpClient) { }

    public getDocuments(documentId = "0"): Observable<HttpResponse<Document>> {
        return this.http.get<Document>(
            `documents/${documentId}`, { observe: 'response' }
            );
    }
    
    public saveDocument(data: Document): Observable<{status: string, message: Document[]}> {
        return this.http.post<{status: string, message: Document[]}>('documents', data);
    }

    public updateDocument(data: Document): Observable<{status: string, message: Document[]}> {
        return this.http.put<{status: string, message: Document[]}>('documents', data);
    }
   
}