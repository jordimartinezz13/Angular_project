import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCrearCocheComponent } from './formulario-crear-coche.component';


describe('FormularioCrearCocheComponent', () => {
  let component: FormularioCrearCocheComponent;
  let fixture: ComponentFixture<FormularioCrearCocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCrearCocheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCrearCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
