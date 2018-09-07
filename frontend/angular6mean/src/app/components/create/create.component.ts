import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private formBuild: FormBuilder) { 
      // Creates the createForm schema with validations.
    this.createForm = this.formBuild.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });
  }

  ngOnInit() {
  }

  // Adds a new document with the entered data and redirects to the /list route.
  addIssue(title, responsible, description, severity) {
    this.issueService.addIssue(title, responsible, description, severity).then(() => {
      this.router.navigate(['/list']);
    });
  }

}
