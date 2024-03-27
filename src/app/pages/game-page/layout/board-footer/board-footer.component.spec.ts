import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFooterComponent } from './board-footer.component';

describe('BoardFooterComponent', () => {
  let component: BoardFooterComponent;
  let fixture: ComponentFixture<BoardFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardFooterComponent]
    });
    fixture = TestBed.createComponent(BoardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
