import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParemetresComponent } from './paremetres.component';

describe('ParemetresComponent', () => {
  let component: ParemetresComponent;
  let fixture: ComponentFixture<ParemetresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParemetresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParemetresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
