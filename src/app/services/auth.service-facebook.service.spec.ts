import { TestBed } from '@angular/core/testing';

import {  FacebookSdkService } from './auth.service-facebook.service';
describe('AuthServiceFacebookService', () => {
  let service: FacebookSdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookSdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
