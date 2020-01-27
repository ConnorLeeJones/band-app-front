import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumProfileComponent } from './album-profile.component';

describe('AlbumProfileComponent', () => {
  let component: AlbumProfileComponent;
  let fixture: ComponentFixture<AlbumProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
