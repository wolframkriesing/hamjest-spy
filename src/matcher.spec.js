import { assertThat, not, greaterThan } from 'hamjest';
import {
  buildFunctionSpy,
  wasCalled, wasCalledWith,
  wasNotCalled, callCountWas,
  firstCallArgsWere, lastCallArgsWere,
} from './index';

describe('Matchers:', () => {
  describe('`wasCalled()`', () => {
    it('passes when spied-on function got called', () => {
      const f = buildFunctionSpy();
      f();
      assertThat(f, wasCalled());
    });
    it('bails when spied-on function had NOT been called', () => {
      const f = buildFunctionSpy();
      assertThat(f, not(wasCalled()));
    });
  });

  describe('`wasCalledWith()`', () => {
    it('passes when spied-on function got called', () => {
      const f = buildFunctionSpy();
      f();
      assertThat(f, wasCalledWith());
    });
    it('passes when spied-on function got called with expected first arg', () => {
      const f = buildFunctionSpy();
      f(42);
      assertThat(f, wasCalledWith(42));
    });
    it('fails when spied-on function was not called', () => {
      const f = buildFunctionSpy();
      assertThat(f, not(wasCalledWith()));
    });
    it('fails when spied-on function was not called with expected args', () => {
      const f = buildFunctionSpy();
      f();
      assertThat(f, not(wasCalledWith(23)));
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

  describe('`lastCallArgsWere()`', () => {
    it('passes when last call`s args match', () => {
      const args = [1, 'two'];
      const f = buildFunctionSpy();

      f(args[0], args[1]);

      assertThat(f, lastCallArgsWere(args));
    });
    it('passes even when other args were used before', () => {
      const args = [1, 'two'];
      const f = buildFunctionSpy();

      f();                  // first call
      f(args[0], args[1]);  // last call

      assertThat(f, lastCallArgsWere(args));
    });
    it('bails when args don`t match', () => {
      const args = [];
      const f = buildFunctionSpy();

      f(1, 'two');

      assertThat(f, not(lastCallArgsWere(args)));
    });
  });

  describe('`callCountWas()`', () => {
    it('passes when spy got called once', () => {
      const f = buildFunctionSpy();

      f();

      assertThat(f, callCountWas(1));
    });
    it('passes for multiple calls', () => {
      const f = buildFunctionSpy();

      f();
      f();
      f();

      assertThat(f, callCountWas(3));
    });
  });
});

// more:
// - when NOT to use a matcher
// - how to use the spy, e.g. with returnValue
// - how to use it inside a class or as property
