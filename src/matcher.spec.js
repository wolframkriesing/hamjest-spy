import { assertThat, not } from 'hamjest';
import {
  buildFunctionSpy,
  wasCalled, wasNotCalled,
} from './index';

describe('Matchers', () => {
  describe('`wasCalled()`', () => {
    it('fires when spied-on function got called', () => {
      const f = buildFunctionSpy();
      f();
      assertThat(f, wasCalled());
    });
    it('bails when spied-on function had NOT been called', () => {
      const f = buildFunctionSpy();
      assertThat(f, not(wasCalled()));
    });
  });

  describe('`wasNotCalled()`', () => {
    it('fires when spied-on function was NOT called', () => {
      const f = buildFunctionSpy();
      assertThat(f, wasNotCalled());
    });
    it('bails when spied-on function was called', () => {
      const f = buildFunctionSpy();
      f();
      assertThat(f, not(wasNotCalled()));
    });
  });
});