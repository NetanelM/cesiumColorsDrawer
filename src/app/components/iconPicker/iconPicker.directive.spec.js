describe('directive iconPicker', function () {
  let vm;
  let element;

  beforeEach(angular.mock.module('colorPicker'));

  beforeEach(inject(($compile, $rootScope, $q) => {

    element = angular.element(`<icon-picker></icon-picker>`);

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
