import {
  hasProperty, equalTo, allOf, not,
  Matcher,
} from 'hamjest';

export const wasCalled = () =>
  hasProperty('wasCalled', equalTo(true));

export const wasCalledWith = (...expectedArgs) => {
  function WasCalledWith() {
    Matcher.call(this);
  }
  WasCalledWith.prototype = Object.create(Matcher.prototype);
  WasCalledWith.prototype.constructor = WasCalledWith;
  WasCalledWith.prototype.matches = (spy) => {
    if (expectedArgs.length > 0) {
      return equalTo(expectedArgs).matches(spy.lastCallArgs);
    }
    return spy.wasCalled;
  };
  WasCalledWith.prototype.describeTo = () => {};
  WasCalledWith.prototype.describeMismatch = () => {};
  return new WasCalledWith();
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
