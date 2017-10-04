# hamjest-spy
The simplest spy, providing simple hamjest matchers.
```js
  import { assertThat, not } from 'hamjest';
  import { buildFunctionSpy, wasCalled } from 'hamjest-spy';
  
  describe('Hamjest-spy', () => {
    it('provides `buildFunctionSpy()` to build a spy, and `wasCalled()` is the matcher that can test the spies result', () => {
      const f = buildFunctionSpy(); // <<<<< `buildFunctionSpy()` by hamjest-spy
      f();
      assertThat(f, wasCalled());   // <<<<< `wasCalled()` by hamjest-spy
    });
  });
```

# What is hamjest?
[Hamjest][hamjest] is a great non-intrusive set of matcher functions, that allow to 
combine matchers and make really readable tests.

# How to use?
See [the tests][tests] for how I use the spy and the according matchers.

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