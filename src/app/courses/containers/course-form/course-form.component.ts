import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit{

  form!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
    // this.form =
  }

  ngOnInit(): void {
  const course: Course = this.route.snapshot.data['course'];
  this.form = this.formBuilder.group({
    _id: [course._id],
    name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    category: [course.category, Validators.required],
    lessons: this.formBuilder.array(this.retrieveLessons(course))
  })
  console.log(this.form)
  console.log(this.form.value)
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {_id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      _id: [lesson._id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl]
    }
    )
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

  getErrorMessage( fieldName: string ) {
    const field = this.form.get(fieldName)
    if (field?.hasError('required')) {
      return 'Campo obrigatório'
    }
    if (field?.hasError('minlength')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`
    }
    if (field?.hasError('maxlength')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 20;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`
    }
    return 'Campo Inválido'
  }
}
