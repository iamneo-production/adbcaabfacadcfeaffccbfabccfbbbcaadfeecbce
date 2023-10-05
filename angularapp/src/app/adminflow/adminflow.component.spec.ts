import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminflowComponent } from './adminflow.component';
import { AdminflowserviceService } from '../Services/adminflowservice.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('AdminflowComponent', () => {
  let component: AdminflowComponent;
  let fixture: ComponentFixture<AdminflowComponent>;
  let dialog: MatDialog
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule, MatDialogModule],
      declarations: [ AdminflowComponent ],
      providers:[AdminflowserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialog = TestBed.inject(MatDialog)
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
