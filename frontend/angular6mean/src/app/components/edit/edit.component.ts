import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, Form, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private formBuild: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    // Autopopulates the input fields with the selected document data.
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }

  // Creates the updateForm schema with validations.
  createForm() {
    this.updateForm = this.formBuild.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });
  }

  // Updates the document with input data and redirects to the /list route.
  updateIssue(title, responsible, description, severity, status) {
    this.issueService.updateIssue(this.id, title, responsible, description, severity,
      status).then(() => {
        this.router.navigate(['/list']);
      });
  }

}
