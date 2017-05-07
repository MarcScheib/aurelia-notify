import {invokeLifecycle} from '../../src/lifecycle';

describe('invokeLifecycle', () => {
  const DEFAULT_LIFECYCLE_RESULT = true;
  const DEFAULT_INVOCATION_METHOD_NAME = 'canActivate';
  const VM = {
    [DEFAULT_INVOCATION_METHOD_NAME]() {
      return this.output
    }
  };

  function testResult(done, output, expected = DEFAULT_LIFECYCLE_RESULT, methodName = DEFAULT_INVOCATION_METHOD_NAME) {
    VM.output = output;
    invokeLifecycle(VM, methodName)
      .then(result => {
        expect(result).toBe(expected);
        done();
      });
  }

  function testRejection(done, expected) {
    invokeLifecycle(VM, DEFAULT_INVOCATION_METHOD_NAME)
      .then(() => {
        done.fail('Rejection expected');
      })
      .catch(error => {
        expect(error).toBe(expected);
        done();
      });
  }

  beforeEach(() => {
    delete VM.output;
  });

  describe('should resolve with default value if the invoked method', () => {
    it('is not implemented', done => {
      testResult(done, undefined, DEFAULT_LIFECYCLE_RESULT, 'deactivate');
    });

    it('returns "undefined"', done => {
      testResult(done, undefined);
    });

    it('returns "null"', done => {
      testResult(done, null);
    });

    it('resolves to "undefined"', done => {
      testResult(done, Promise.resolve(undefined));
    });

    it('resolves to "null"', done => {
      testResult(done, Promise.resolve(null));
    });
  });

  it('resolves with the returned value', done => {
    let expected = 'returned_value';
    testResult(done, expected, expected);
  });

  it('resolves with the resolved value', done => {
    let expected = 'resolved_value';
    testResult(done, Promise.resolve(expected), expected);
  });

  it('propagates errors when the invoked method throws', done => {
    let expectedError = new Error('sync_error');
    spyOn(VM, DEFAULT_INVOCATION_METHOD_NAME).and.callFake(() => { throw expectedError; });
    testRejection(done, expectedError);
  });

  it('propagates errors when the invoked method is rejected', done => {
    let expectedError = new Error();
    spyOn(VM, DEFAULT_INVOCATION_METHOD_NAME).and.returnValue(Promise.reject(expectedError));
    testRejection(done, expectedError);
  });

  it('invokes the method with the provided model', done => {
    let expectedModel = { test: 'test model' };
    spyOn(VM, DEFAULT_INVOCATION_METHOD_NAME);
    invokeLifecycle(VM, DEFAULT_INVOCATION_METHOD_NAME, expectedModel)
      .then(result => {
        expect(result).toEqual(DEFAULT_LIFECYCLE_RESULT);
        done();
      })
      .catch(error => {
        done.fail(error);
      });

    expect(VM[DEFAULT_INVOCATION_METHOD_NAME]).toHaveBeenCalledWith(expectedModel);
  });
});
