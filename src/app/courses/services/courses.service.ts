import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  list(): Course[] {
    return [
      { _id: '1', name: 'Angular', category: 'front-end'},
      { _id: '2', name: 'Java', category: 'back-end'},
      { _id: '3', name: 'CSS', category: 'front-end'}
    ];
  }
}
