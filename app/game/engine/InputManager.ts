export class InputManager {
  private keys: Set<string> = new Set();
  private justPressed: Set<string> = new Set();
  private element: HTMLElement | null = null;

  private onKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', 'enter', ' ', 'escape'].includes(key)) {
      e.preventDefault();
      if (!this.keys.has(key)) {
        this.justPressed.add(key);
      }
      this.keys.add(key);
    }
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.key.toLowerCase());
  };

  attach(element: HTMLElement) {
    this.element = element;
    element.addEventListener('keydown', this.onKeyDown);
    element.addEventListener('keyup', this.onKeyUp);
  }

  detach() {
    if (this.element) {
      this.element.removeEventListener('keydown', this.onKeyDown);
      this.element.removeEventListener('keyup', this.onKeyUp);
      this.element = null;
    }
    this.keys.clear();
    this.justPressed.clear();
  }

  isDown(key: string): boolean {
    return this.keys.has(key);
  }

  wasPressed(key: string): boolean {
    return this.justPressed.has(key);
  }

  // Call once per frame after processing input
  clearJustPressed() {
    this.justPressed.clear();
  }

  // Flush everything — used after dialog dismiss to prevent leaking keys
  clearAll() {
    this.keys.clear();
    this.justPressed.clear();
  }

  // Touch input simulation
  simulateKeyDown(key: string) {
    this.keys.add(key);
    this.justPressed.add(key);
  }

  simulateKeyUp(key: string) {
    this.keys.delete(key);
  }

  get up(): boolean {
    return this.isDown('arrowup') || this.isDown('w');
  }

  get down(): boolean {
    return this.isDown('arrowdown') || this.isDown('s');
  }

  get left(): boolean {
    return this.isDown('arrowleft') || this.isDown('a');
  }

  get right(): boolean {
    return this.isDown('arrowright') || this.isDown('d');
  }

  get action(): boolean {
    return this.wasPressed('enter') || this.wasPressed(' ');
  }

  get escape(): boolean {
    return this.wasPressed('escape');
  }
}
