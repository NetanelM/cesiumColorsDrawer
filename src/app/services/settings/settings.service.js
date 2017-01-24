/**
 * Created by netanel on 24/01/2017.
 */
export class SettingsService {
  constructor($compile, $rootScope) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$compile = $compile;
  }

  openFormDraw(viewer) {
    let config = {
      viewer: viewer,
      onSubmit: this.onSubmit
    };
    this.$rootScope.config = config;
    let element = this.$compile('<form-draw config="config"></form-draw>')(this.$rootScope.$new());
    let tagBody = document.getElementsByTagName("BODY")[0];
    tagBody.appendChild(element[0]);
  }

  onSubmit(obj) {
    let object = obj
  }
}
