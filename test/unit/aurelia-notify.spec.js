import {Container} from 'aurelia-dependency-injection';
import {configure} from '../../src/aurelia-notify';

describe('testing aurelia configure routine', () => {
  const frameworkConfig = {
    container: new Container(),
    globalResources() {
    },
    transient() {
    }
  };

  it('should export configure function', () => {
    expect(typeof configure).toBe('function');
  });

  it('should accept a setup callback passing back the callback', (done) => {
    let callback = (callback) => {
      expect(typeof callback).toBe('object');
      done();
    };
    configure(frameworkConfig, callback);
  });

  it('should accept no callback and not fail', () => {
    configure(frameworkConfig);
  });
});
