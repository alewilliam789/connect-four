import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTimerComponent } from './game-timer.component';

describe('GameTimerComponent', () => {
  let component: GameTimerComponent;
  let fixture: ComponentFixture<GameTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameTimerComponent]
    });
    fixture = TestBed.createComponent(GameTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
