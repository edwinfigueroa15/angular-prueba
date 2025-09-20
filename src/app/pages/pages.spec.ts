import { TestBed } from '@angular/core/testing';
import { Pages } from './pages';

describe('Pages', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pages],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Pages);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(Pages);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, Pages');
  });
});
