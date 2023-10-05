import { TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';

import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      imports:[
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
        ]
    });
    guard = TestBed.inject(AuthGuard);

  });

  it('should be created gaurd', () => {
    expect(guard).toBeTruthy();
  });
});
