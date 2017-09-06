import {
  hasProperty, equalTo, allOf, not,
  Matcher,
} from 'hamjest';

export const wasCalled = () =>
  hasProperty('wasCalled', equalTo(true));

function WasCalledWith() {
  Matcher.call(this);
}
WasCalledWith.prototype = Object.create(Matcher.prototype);
WasCalledWith.prototype.constructor = WasCalledWith;
WasCalledWith.prototype.matches = () => true;
WasCalledWith.prototype.describeTo = () => {};
WasCalledWith.prototype.describeMismatch = () => {};

export const wasCalledWith = () => new WasCalledWith();

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
