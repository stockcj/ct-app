import { MdSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ReplaySubject, Observable } from 'rxjs';
import { Exam } from './exam';
import { ExamComponent } from './examcomponent';
import { Version } from './version';

@Injectable()
export class ExamService {

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              public examCreationValidationBar: MdSnackBar) { }

  getExams(): FirebaseListObservable<Exam[]> {
    return this.db.list('exams');
  }

  getExam($key: string): FirebaseObjectObservable<Exam> {
    return this.db.object('exams/' + $key);
  }

  getComponents($key: string): FirebaseListObservable<ExamComponent[]> {
    return this.db.list('exams/' + $key + '/components/');
  }

  getVersions(ekey: string, ckey: string): FirebaseListObservable<Version[]> {
    return this.db.list('exams/' + ekey + '/components/' + ckey + '/versions/');
  }

  createExam(exam: Exam): ReplaySubject<any> {
    const resultSubject = new ReplaySubject(1);

    this.db.list('/exams').push({ name: exam.name })
      .then(newExam => {
        const updateExamData = {};
        updateExamData[`exams/${newExam.key}`] = {
          name: exam.name,
        };
        this.db.object('/').update(updateExamData)
        .then(() => {
          for (const component of exam.components) {
               this.db.list(`/exams/${newExam.key}/components`).push({name: component.name})
               .then(newComponent => {
                  for (const version of component.versions) {
                    this.db.list(`/exams/${newExam.key}/components/${newComponent.key}/versions`).push(version);
                  }
               });
          }
        })
        .then(() => {
          resultSubject.next(Exam);
        })
        .catch(err => {
          resultSubject.error(err);
        })
        .then(() => {
        this.examCreationValidationBar.open('New exam created', 'Ok', {
          duration: 2000,
        });
     });
      });
    return resultSubject;
  }

  updateExam(exam: Exam) {
    const resultSubject = new ReplaySubject(1);
    if (exam !== undefined && exam.$key !== undefined) {
      const dataToUpdate = {};
      dataToUpdate[`exams/${exam.$key}/name`] =
        exam.name;
      this.db.object('/')
        .update(dataToUpdate)
        .then(() => {
          resultSubject.next(exam);
        })
        .catch(err => {
          resultSubject.error(err);
        });
    }
    return resultSubject;
  }

  deleteExam(exam: Exam): ReplaySubject<any> {
    const resultSubject = new ReplaySubject(1);
    if (exam !== undefined && exam.$key !== undefined) {
      const dataToDelete = {};
      dataToDelete[`exams/${exam.$key}`] = null;
      this.db.object('/').update(dataToDelete)
        .then(() => {
          resultSubject.next(exam);
        })
        .catch(err => {
          resultSubject.error(err);
        })
        .then(() => {
          this.examCreationValidationBar.open('Exam deleted', 'Ok', {
            duration: 2000,
          });
        });
    }
    return resultSubject;
  }

}
