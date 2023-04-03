import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, pipe } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  courses$: Observable <Course[]> | null = null;
  displayedColumns = ['name', 'category', 'actions'];
  // courseService: CoursesService

  constructor(private courseService: CoursesService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private snackbar: MatSnackBar) {
    // this.courses = [];
    // this.courseService = new CoursesService();
    this.refresh()
  }
  ngOnInit(): void {
    // this.courses = this.courseService.list();
  }

  refresh() {
    this.courses$ = this.courseService.list()
    .pipe (
      catchError( () => {
        this.onError('Erro ao carregar cursos.')
        return of([]); // retorna um observable de array vazio
      })
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onRemove(course: Course) {
    this.courseService.remove(course._id).subscribe(() => {
      this.refresh()
      this.snackbar.open('Curso removido com sucesso!', 'X', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
    },
    error => this.onError('Erro ao tentar remover curso.')
    );
  }

}
