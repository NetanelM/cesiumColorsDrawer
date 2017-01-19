/**
 * Created by yonk on 08/01/2017.
 */
export function AppDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/app/app.html',
    controller: AppController,
    controllerAs: 'appCtrl',
    bindToController: true
  };

  return directive;
}

class AppController {
  constructor() {
    'ngInject';

  }
}
