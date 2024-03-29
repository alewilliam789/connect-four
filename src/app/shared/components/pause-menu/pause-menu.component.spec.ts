import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseMenuComponent } from './pause-menu.component';

describe('PauseMenuComponent', () => {
  let component: PauseMenuComponent;
  let fixture: ComponentFixture<PauseMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PauseMenuComponent]
    });
    fixture = TestBed.createComponent(PauseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
