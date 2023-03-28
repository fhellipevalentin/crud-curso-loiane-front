import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private service: CoursesService, private _snackBar: MatSnackBar, private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
    .subscribe(data => this.onSuccess(), error => this.onError())

  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this._snackBar.open("Curso salvo com sucesso!", '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this._snackBar.open("Erro ao salvar curso.", '', { duration: 3000 });
  }
}
