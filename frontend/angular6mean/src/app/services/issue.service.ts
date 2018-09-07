import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Issue } from '../models/issue.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  // Declare issue references
  private issueDoc: AngularFirestoreDocument<Issue>;
  issue: Observable<Issue>;

  // The name of your MongoDB database collection.
  collection = 'issues';

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  // Fetches all documents.
  getIssues() {
    return this.db.collection(`${this.collection}`).valueChanges();
  }

  // Fetches a single document by _id.
  getIssueById(id) {
    this.issueDoc = this.db.collection(`${this.collection}`).doc(id);
    return this.issueDoc.valueChanges();
  }

  // Creates a new document.
  addIssue(title, responsible, description, severity) {
    const newIssueRef = this.db.collection(`${this.collection}`).ref.doc();
    const id = newIssueRef.id;
    return newIssueRef.set({
      id: id,
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    });
  }

  // Updates an existing document.
  updateIssue(id, title, responsible, description, severity, status) {
    return this.db.collection(`${this.collection}`).doc(`${id}`).update({
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status
    });
  }

  // Deletes an existing document.
  deleteIssue(id) {
    return this.db.collection(`${this.collection}`).doc(`${id}`).delete();
  }
}
