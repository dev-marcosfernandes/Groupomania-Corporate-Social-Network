import { TestBed } from '@angular/core/testing';

import { ProfilUserService } from './profil-user.service';

describe('ProfilUserService', () => {
  let service: ProfilUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
