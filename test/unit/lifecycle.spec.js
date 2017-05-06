import {invokeLifecycle} from '../../src/lifecycle';

class ViewModelStub {
  param = '';

  activatePromise() {
    return Promise.resolve('promise');
  }

  activateNonPromise() {
    return 'no promise';
  }

  activateNonReturn() {
  }
}

describe('the lifecycle util', () => {
  let instance;
  let model = {};

  beforeEach(() => {
    instance = new ViewModelStub();
  });

  it('should return the promise of the invocation', () => {
    let result = invokeLifecycle(instance, 'activatePromise', model);

    expect(result instanceof Promise).toBe(true);
    result.then(result => {
      expect(result).toEqual('promise');
    });
  });

  it('should return a resolved promise if function does not return one', () => {
    let result = invokeLifecycle(instance, 'activateNonPromise', model);

    expect(result instanceof Promise).toBe(true);
    result.then(result => {
      expect(result).toEqual('no promise');
    });
  });

  it('should return a resolved promise if function returns nothing', () => {
    let result = invokeLifecycle(instance, 'activateNonReturn', model);

    expect(result instanceof Promise).toBe(true);
    result.then(result => {
      expect(result).toBe(true);
    });
  });

  it('should return a resolved promise if no function is given', () => {
    let result = invokeLifecycle(instance, 'param', model);

    expect(result instanceof Promise).toBe(true);
    result.then(result => {
      expect(result).toBe(true);
    });
  });
});
