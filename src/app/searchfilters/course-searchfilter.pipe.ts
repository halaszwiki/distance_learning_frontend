import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/course';

@Pipe({
  name: 'coursesearchfilter'
})
export class CourseSearchfilterPipe implements PipeTransform {

  transform(courses: Course[], searchBox: string): Course[] {
    if(!courses || !searchBox){
      return courses;
    }
    return courses.filter(course => course.name.toLocaleLowerCase().includes(searchBox.toLocaleLowerCase()));
  }
}
