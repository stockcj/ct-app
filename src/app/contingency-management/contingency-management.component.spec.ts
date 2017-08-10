import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContingencyManagementComponent } from './contingency-management.component';

describe('ContingencyManagementComponent', () => {
  let component: ContingencyManagementComponent;
  let fixture: ComponentFixture<ContingencyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContingencyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContingencyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
