export const buildFunctionSpy = ({ returnValue = void 0 } = {}) => {
  const spy = (...args) => {
    spy.wasCalled = true;
    spy.lastCallArgs = args;
    spy.allCallsArgs.push(args);
    spy.callCount++;
    spy.firstCallArgs = spy.allCallsArgs[0];
    return returnValue;
  };
  spy.wasCalled = false;
  spy.lastCallArgs = [];
  spy.allCallsArgs = [];
  spy.callCount = 0;
  spy.firstCallArgs = [];
  return spy;
};
