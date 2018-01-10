import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseTalentComponent } from './showcase-talent.component';

describe('ShowcaseTalentComponent', () => {
  let component: ShowcaseTalentComponent;
  let fixture: ComponentFixture<ShowcaseTalentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcaseTalentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
