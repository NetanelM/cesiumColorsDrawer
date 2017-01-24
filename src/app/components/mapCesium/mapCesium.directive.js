/**
 * Created by yonk on 19/01/2017.
 */
export function MapCesiumDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: '<div ng-click="mapCtrl.openForm()">openForm</div><div id="cesiumContainer"></div>',
    controller: MapCesiumController,
    controllerAs: 'mapCtrl'
  };

  return directive;

}

class MapCesiumController {
  constructor(settingsService) {
    'ngInject';
    this.settingsService =settingsService;
    this.initMapCesium();

  }

  openForm(){
    this.settingsService.openFormDraw(this.viewer);
  }

  initMapCesium() {
    Cesium.BingMapsApi.defaultKey = 'AroazdWsTmTcIx4ZE3SIicDXX00yEp9vuRZyn6pagjyjgS-VdRBfBNAVkvrucbqr';
    this.viewer = new Cesium.Viewer('cesiumContainer');
    this.config = {
      viewer: this.viewer,
      submit: this.onSubmit
    };
  }

  onSubmit(obj) {

  }
}


