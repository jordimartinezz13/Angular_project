import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoUnicoComponent } from './producto-unico.component';

describe('ProductoUnicoComponent', () => {
  let component: ProductoUnicoComponent;
  let fixture: ComponentFixture<ProductoUnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoUnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoUnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
