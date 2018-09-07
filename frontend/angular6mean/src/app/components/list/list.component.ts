import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  columns = ['Title', 'Responsible', 'Description', 'Severity', 'Status', 'Actions'];

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    // Fetches all documents.
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data Requested');
        console.log(this.issues);
      });
  }
  // Redirects to the /edit route.
  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  // Deletes the selected issue and refreshes the document view.
  deleteIssue(id) {
    this.issueService.deleteIssue(id).then(() => {
      this.fetchIssues();
    });
  }
}
