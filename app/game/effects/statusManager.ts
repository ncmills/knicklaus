import { StatusEffect } from '../types';

export class StatusManager {
  public effect: StatusEffect = StatusEffect.None;

  applyEffect(effect: StatusEffect) {
    this.effect = effect;
    // Effect stays permanently until browser refresh
  }

  tick() {
    // No expiry — effects are permanent
    return null;
  }

  isActive(): boolean {
    return this.effect !== StatusEffect.None;
  }
}
