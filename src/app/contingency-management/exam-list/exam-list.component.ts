import { Observable, Subscription } from 'rxjs';
import { ExamService } from './../exam.service';
import { Component, OnInit, Input } from '@angular/core';
import { Exam } from '../exam';

@Component({
  selector: 'ct-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  @Input()
  exams: Observable<Exam[]>;

  constructor(private examService: ExamService) { }

  ngOnInit() {
  }

  deleteExam(exam: Exam) {
    this.examService.deleteExam(exam).subscribe(() => {
      console.log('deleting', exam);
    },
    err => {
      console.log('err', err);
    });
  }

}
