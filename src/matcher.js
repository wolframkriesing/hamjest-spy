import {
  hasProperty, equalTo, allOf, not, hasItem,
  Matcher,
} from 'hamjest';
import {isSpy} from './spy';

export const wasCalled = () =>
  hasProperty('wasCalled', equalTo(true));

export const wasCalledWith = (...expectedArgs) => {
  return {
    matches: (spy) => {
      if (!isSpy(spy)) {
        return false;
      }
      if (expectedArgs.length > 0) {
        const allCallArgs = spy.allCallsArgs;
        const argsToCompare = allCallArgs
          .map(oneCallsArgs => oneCallsArgs.slice(0, expectedArgs.length));
        return hasItem(expectedArgs).matches(argsToCompare);
      }
      return spy.wasCalled;
    },
    describeTo: function (description) {
      description
        .append('was called with ')
        .appendDescriptionOf(expectedArgs)
      ;
    },
    describeMismatch: function(actual, description) {
      description
        .append('was called with one of ')
        .appendDescriptionOf(actual.allCallsArgs)
      ;
    },
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
