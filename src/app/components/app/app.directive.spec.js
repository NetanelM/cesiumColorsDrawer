/**
 * @todo Complete the test
 * This example is not perfect.
 * The `link` function is not tested.
 * (malarkey usage, addClass, $watch, $destroy)
 */
describe('directive app', function () {
  let vm;
  let element;

  beforeEach(angular.mock.module('colorPicker'));

  beforeEach(inject(($compile, $rootScope, $q) => {

    element = angular.element(`<app></app>`);

    $compile(element)($rootScope.$new());
    $rootScope.$digest();
    vm = element.isolateScope().appCtrl;
  }));
  describe('constructor', function () {
    it('should be compiled', () => {
      expect(element.html()).not.toEqual(1);
    });
  });

});
