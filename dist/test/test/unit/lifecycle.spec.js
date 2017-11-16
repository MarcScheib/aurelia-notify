var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "../../src/lifecycle"], function (require, exports, lifecycle_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('invokeLifecycle', function () {
        var DEFAULT_LIFECYCLE_RESULT = true;
        var TEST_METHOD_NAME = 'canActivate';
        var vm = (_a = {},
            _a[TEST_METHOD_NAME] = function () {
                return this.output;
            },
            _a);
        describe('resolves', function () {
            // tslint:disable-next-line:max-line-length
            function testResult(done, output, expected, methodName) {
                if (expected === void 0) { expected = DEFAULT_LIFECYCLE_RESULT; }
                if (methodName === void 0) { methodName = TEST_METHOD_NAME; }
                return __awaiter(this, void 0, void 0, function () {
                    var result, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                vm.output = output;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, lifecycle_1.invokeLifecycle(vm, methodName)];
                            case 2:
                                result = _a.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                return [2 /*return*/, done.fail(e_1)];
                            case 4:
                                expect(result).toBe(expected);
                                done();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            beforeEach(function () {
                delete vm.output;
            });
            describe('with the default value when the method', function () {
                it('is not implemented', function (done) {
                    testResult(done, undefined, DEFAULT_LIFECYCLE_RESULT, 'deactivate');
                });
                describe('returns', function () {
                    it('"undefined"', function (done) {
                        testResult(done, undefined);
                    });
                    it('"null"', function (done) {
                        testResult(done, null);
                    });
                });
                describe('resolves to', function () {
                    it('"undefined"', function (done) {
                        testResult(done, Promise.resolve(undefined));
                    });
                    it('"null"', function (done) {
                        testResult(done, Promise.resolve(null));
                    });
                });
            });
            it('with the returned value', function (done) {
                var expected = 'method_returned_value';
                testResult(done, expected, expected);
            });
            it('with the resolved value', function (done) {
                var expected = 'method_resolved_value';
                testResult(done, Promise.resolve(expected), expected);
            });
        });
        describe('propagates errors when the method', function () {
            // tslint:disable-next-line:space-before-function-paren
            function testForRejection(done, expected) {
                return __awaiter(this, void 0, void 0, function () {
                    var e_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, lifecycle_1.invokeLifecycle(vm, TEST_METHOD_NAME)];
                            case 1:
                                _a.sent();
                                done.fail('Expected rejection.');
                                return [3 /*break*/, 3];
                            case 2:
                                e_2 = _a.sent();
                                expect(e_2).toBe(expected);
                                done();
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            }
            it('throws', function (done) {
                var expectedError = new Error('sync_error');
                spyOn(vm, TEST_METHOD_NAME).and.callFake(function () {
                    throw expectedError;
                });
                testForRejection(done, expectedError);
            });
            it('is rejected', function (done) {
                var expectedError = new Error();
                spyOn(vm, TEST_METHOD_NAME).and.returnValue(Promise.reject(expectedError));
                testForRejection(done, expectedError);
            });
        });
        it('invokes the method with the povided model', function (done) { return __awaiter(_this, void 0, void 0, function () {
            var expectedModel, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expectedModel = { test: 'test model' };
                        spyOn(vm, TEST_METHOD_NAME);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, lifecycle_1.invokeLifecycle(vm, TEST_METHOD_NAME, expectedModel)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        return [2 /*return*/, done.fail(e_3)];
                    case 4:
                        expect(vm[TEST_METHOD_NAME]).toHaveBeenCalledWith(expectedModel);
                        done();
                        return [2 /*return*/];
                }
            });
        }); });
        var _a;
    });
});
