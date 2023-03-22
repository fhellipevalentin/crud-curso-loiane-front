import { CoursesService } from './../services/courses.service';
import { Course } from './../model/course';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{

  courses: Course[] = [];
  displayedColumns = ['name', 'category'];
  // courseService: CoursesService

  constructor(private courseService: CoursesService) {
    // this.courses = [];
    // this.courseService = new CoursesService();

  }
  ngOnInit(): void {
    this.courses = this.courseService.list();
  }
}
