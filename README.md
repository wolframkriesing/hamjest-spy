# hamjest-spy
The simplest spy, providing simple hamjest matchers.
```js
  import {assertThat, not} from 'hamjest';
  import {buildFunctionSpy, wasCalled, wasCalledWith} from 'hamjest-spy';
  
  describe('Hamjest-spy', () => {
    it('provides `buildFunctionSpy()` to build a spy, and `wasCalled()` is the matcher that can test the spies result', () => {
      const f = buildFunctionSpy(); // <<<<< `buildFunctionSpy()` by hamjest-spy
      f();
      assertThat(f, wasCalled());   // <<<<< `wasCalled()` by hamjest-spy
    });
    it('provides `buildFunctionSpy()` to build a spy, and `wasCalledWith()` is the matcher that can test the spies result', () => {
      const f = buildFunctionSpy(); // <<<<< `buildFunctionSpy()` by hamjest-spy
      f(42);
      assertThat(f, wasCalledWith(42));   // <<<<< `wasCalledWith()` by hamjest-spy
    });
  });
```

# What is hamjest?
[Hamjest][hamjest] is a great non-intrusive set of matcher functions, that allow to 
combine matchers and make really readable tests.

# How to use?
See [the tests][tests] for how I use the spy and the according matchers.

# Features

```Matchers:
  `wasCalled()`
    ✓ passes when spied-on function got called
    ✓ bails when spied-on function had NOT been called
    
  `wasCalledWith()`
    passes when spied-on function
      ✓ got called
      ✓ got called with expected arg
      ✓ got called with more args, than expected
      ✓ got called with right and wrong args
    fails when
      ✓ the spy is not a spy
    fails when the spied-on-function
      ✓ was not called
      ✓ was not called with expected args
      ✓ was not called with the expected 2nd arg
    WHEN it fails
      ✓ has a readable error message
      
  `wasNotCalled()`
    ✓ fires when spied-on function was NOT called
    ✓ bails when spied-on function was called
    
  `firstCallArgsWere()`
    ✓ passes when spy was called with expected args
    ✓ fails when spy was called with more args
    ✓ fails when spy was called without args
    
  `lastCallArgsWere()`
    ✓ passes when last call`s args match
    ✓ passes even when other args were used before
    ✓ bails when args don`t match
    
  `callCountWas()`
    ✓ passes when spy got called once
    ✓ passes for multiple calls
```

# Development

## Install
- `npm install`

## Testing
- `npm test`

## How to release?
- upgrade the version (only [major versions][adr2])
- run `npm publish` (`npm run publish` doesn't work)

[tests]: ./src/matcher.spec.js
[hamjest]: https://github.com/rluba/hamjest
[adr2]: ./docs/002-only-major-versions.md