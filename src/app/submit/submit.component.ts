import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Phrase } from '../phrase.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgForm, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule, MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl();
  filteredCategories: Observable<string[]>;
  categories: string[] = ['2019'];
  allCategories: string[] = [];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  submitForm: FormGroup;
  snackBar: MatSnackBar;
  constructor(private db: AngularFirestore, public snickers: MatSnackBar) {
    this.snackBar = snickers;
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
        startWith(null),
        map((category: string | null) => category ? this._filter(category) : this.allCategories.slice()));
  }

  ngOnInit() {
    this.retrieveCategories();
  	this.submitForm = new FormGroup({
      phrase: new FormControl('', { validators: [Validators.required] }),
      user: new FormControl('', { validators: [Validators.required] }),
      allCategories: new FormControl(null, { validators: [] })
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

  private retrieveCategories() {
    this.allCategories = [];
    let result = this.db.collection('categories').get();
    result.forEach(value =>
      {
        value.forEach(entry =>
        {
          this.allCategories.push(entry.get("categoryName"))
      });
    });
  }

    /** Save the node to database */
  saveItem(newCategory: string) {
    if(!this.allCategories.includes(newCategory)){
      let addCategory = {
        'categoryName': newCategory
      }
      this.db.collection('categories').add(addCategory);
      this.retrieveCategories();
    }else{
      this.snackBar.open('Already a category called that', 'Dismiss', {
        duration: 2000
      });
    }
  }
  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.categories.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.categoryCtrl.setValue(null);
    }
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter(category => category.toLowerCase().indexOf(filterValue) === 0);
  }
}
