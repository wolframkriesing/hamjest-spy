import {
  hasProperty, equalTo, allOf, not,
  Matcher,
} from 'hamjest';

export const wasCalled = () =>
  hasProperty('wasCalled', equalTo(true));

export const wasCalledWith = (...expectedArgs) => {
  return {
    matches: (spy) => {
      if (expectedArgs.length > 0) {
        const argsToCompare = spy.lastCallArgs.slice(0, expectedArgs.length);
        return equalTo(expectedArgs).matches(argsToCompare);
      }
      return spy.wasCalled;
    }
  };
};

export const wasNotCalled = () =>
  not(wasCalled());

export const lastCallArgsWere = (expectedArgs) =>
  allOf(
    wasCalled(),
    hasProperty('lastCallArgs', equalTo(expectedArgs))
  );

export const firstCallArgsWere = (expectedArgs) =>
  allOf(
    wasCalled(),
    hasProperty('firstCallArgs', equalTo(expectedArgs))
  );

export const callCountWas = (expectedCallCount) =>
  hasProperty('callCount', equalTo(expectedCallCount));
