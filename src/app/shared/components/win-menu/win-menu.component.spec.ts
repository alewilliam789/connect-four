import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinMenuComponent } from './win-menu.component';

describe('WinMenuComponent', () => {
  let component: WinMenuComponent;
  let fixture: ComponentFixture<WinMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinMenuComponent]
    });
    fixture = TestBed.createComponent(WinMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
