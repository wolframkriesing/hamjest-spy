import { assertThat, not } from 'hamjest';
import {
  buildFunctionSpy,
  wasCalled, wasNotCalled, firstCallArgsWere,
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

  describe('`firstCallArgsWere()`', () => {
    it('passes when spy was called with expected args', () => {
      const firstArgument = '1';
      const f = buildFunctionSpy();
      f(firstArgument);
      assertThat(f, firstCallArgsWere([firstArgument]));
    });
    it('fails when spy was called with more args', () => {
      const firstArgument = '1';
      const f = buildFunctionSpy();
      f(firstArgument, 'unexpected 2nd arg');
      assertThat(f, not(firstCallArgsWere([firstArgument])));
    });
    it('fails when spy was called without args', () => {
      const f = buildFunctionSpy();
      f();
      assertThat(f, not(firstCallArgsWere(['expected arg'])));
    });
  });
});