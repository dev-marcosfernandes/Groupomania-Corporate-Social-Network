import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresContainerComponent } from './parametres-container.component';

describe('ParametresContainerComponent', () => {
  let component: ParametresContainerComponent;
  let fixture: ComponentFixture<ParametresContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametresContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
