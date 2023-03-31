import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, pipe } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  courses$: Observable <Course[]>;
  displayedColumns = ['name', 'category', 'actions'];
  // courseService: CoursesService

  constructor(private courseService: CoursesService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    // this.courses = [];
    // this.courseService = new CoursesService();
    this.courses$ = this.courseService.list()
    .pipe (
      catchError( error => {
        this.onError('Erro ao carregar cursos.')
        return of([]); // retorna um observable de array vazio
      })
    )
  }
  ngOnInit(): void {
    // this.courses = this.courseService.list();
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
