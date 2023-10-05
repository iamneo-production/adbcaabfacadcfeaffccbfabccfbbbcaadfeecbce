import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTablePopoverComponent } from './select-table-popover.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


describe('SelectTablePopoverComponent', () => {
  let component: SelectTablePopoverComponent;
  let fixture: ComponentFixture<SelectTablePopoverComponent>;
  let dialog : MatDialog
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTablePopoverComponent ],
      imports:[
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule
      ],
      providers:[
       {provide: MatDialogRef , useValue : {}},
       MatDialog
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTablePopoverComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
