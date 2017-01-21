describe('directive formDraw', function () {
  let vm;
  let element;

  beforeEach(angular.mock.module('colorPicker'));

  beforeEach(inject(($compile, $rootScope, $q) => {

    element = angular.element(`<form-draw></form-draw>`);

    $compile(element)($rootScope.$new());
    $rootScope.$digest();
    vm = element.isolateScope().appCtrl;
  }));
  describe('constructor', function () {
    it('should be compiled', () => {
      expect(element.html()).toEqual(1);
    });
  });

});
