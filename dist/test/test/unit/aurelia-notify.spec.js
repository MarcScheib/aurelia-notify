define(["require", "exports", "aurelia-dependency-injection", "../../src/aurelia-notify"], function (require, exports, aurelia_dependency_injection_1, aurelia_notify_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('testing aurelia configure routine', function () {
        var frameworkConfig = {
            container: new aurelia_dependency_injection_1.Container(),
            globalResources: function () {
                return;
            },
            transient: function () {
                return;
            }
        };
        it('should export configure function', function () {
            expect(typeof aurelia_notify_1.configure).toBe('function');
        });
        it('should accept a setup callback passing back the callback', function (done) {
            var callback = function (callback) {
                expect(typeof callback).toBe('object');
                done();
            };
            aurelia_notify_1.configure(frameworkConfig, callback);
        });
        it('should accept no callback and not fail', function () {
            aurelia_notify_1.configure(frameworkConfig);
        });
    });
});
