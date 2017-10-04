import { assertThat, not, greaterThan, containsString } from 'hamjest';
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
    describe('passes when spied-on function', () => {
      it('got called', () => {
        const f = buildFunctionSpy();
        f();
        assertThat(f, wasCalledWith());
      });
      it('got called with expected arg', () => {
        const f = buildFunctionSpy();
        f(23, 42, {a: 1}, [0, 1]);
        assertThat(f, wasCalledWith(23, 42, {a: 1}, [0, 1]));
      });
      it('got called with more args, than expected', () => {
        const f = buildFunctionSpy();
        f(1, 2);
        assertThat(f, wasCalledWith(1));
      });
      it('got called with right and wrong args', () => {
        const f = buildFunctionSpy();
        f(1, 2);
        f();
        assertThat(f, wasCalledWith(1, 2));
      });
    });
    describe('fails when', () => {
      it('the spy is not a spy', () => {
        const noSpy = null;
        assertThat(noSpy, not(wasCalledWith(1, 2)));
      });
    });
    describe('fails when the spied-on-function', () => {
      it('was not called', () => {
        const f = buildFunctionSpy();
        assertThat(f, not(wasCalledWith()));
      });
      it('was not called with expected args', () => {
        const f = buildFunctionSpy();
        f();
        assertThat(f, not(wasCalledWith(23)));
      });
      it('was not called with the expected 2nd arg', () => {
        const f = buildFunctionSpy();
        f(1);
        assertThat(f, not(wasCalledWith(1, 2)));
      });
    });
    describe('WHEN it fails', () => {
      it('has a readable error message', () => {
        const f = buildFunctionSpy();
        f();
        try {
          assertThat(f, wasCalledWith(42));
        } catch (e) {
          assertThat(e.message, containsString('Expected: was called with [<42>]'));
          assertThat(e.message, containsString('but: was called with one of [[]]'));
        }
      });
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
