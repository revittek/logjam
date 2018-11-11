import { Component, OnInit } from '@angular/core';
import { Phrase } from '../phrase.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  submitForm: FormGroup;
  snackBar: MatSnackBar;
  constructor(private db: AngularFirestore, public snickers: MatSnackBar) {
    this.snackBar = snickers;
  }

  ngOnInit() {
  	this.submitForm = new FormGroup({
      phrase: new FormControl('', { validators: [Validators.required] }),
      user: new FormControl('', { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [] })
    });
  }

  onSubmit() {
    let splitCategories = null;
    if (this.submitForm.value.category) {
      splitCategories = this.submitForm.value.category.split(',');
    } else {
      splitCategories = [];
    }
  	let phrase = {
      phrase: this.submitForm.value.phrase,
      user: this.submitForm.value.user,
      dateAdded: new Date(),
      categories: splitCategories
    }

  	this.addDataToDatabase(phrase);
  }

  private addDataToDatabase(phrase: Phrase) {
    this.db.collection('phrases').add(phrase);
    this.snackBar.open('Your catchphrase has been submitted', 'Dismiss', {
      duration: 2000
    });
    this.submitForm.markAsPristine();
    this.submitForm.markAsUntouched();
    this.submitForm.reset();
  }

}
