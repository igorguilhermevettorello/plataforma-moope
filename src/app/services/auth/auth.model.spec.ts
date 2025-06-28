import { TestBed } from '@angular/core/testing';

import { AuthModel } from './auth.model';

describe('AuthModel', () => {
  let service: AuthModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
