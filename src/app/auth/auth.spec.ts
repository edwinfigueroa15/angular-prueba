import { TestBed } from '@angular/core/testing';
import { Auth } from './auth';

describe('Auth', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auth],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Auth);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Auth);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Auth');
  });
});
