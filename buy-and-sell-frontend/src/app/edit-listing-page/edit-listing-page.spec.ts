import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListingPage } from './edit-listing-page';

describe('EditListingPage', () => {
  let component: EditListingPage;
  let fixture: ComponentFixture<EditListingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditListingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
