/**
 * Created by yonk on 19/01/2017.
 */
export function MapCesiumDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    template: '<form-draw config="mapCtrl.config"></form-draw><div id="cesiumContainer"></div>',
    controller: MapCesiumController,
    controllerAs: 'mapCtrl'
  };

  return directive;

}

class MapCesiumController {
  constructor() {
    'ngInject';
    this.initMapCesium();
  }

  initMapCesium() {
    Cesium.BingMapsApi.defaultKey = 'AroazdWsTmTcIx4ZE3SIicDXX00yEp9vuRZyn6pagjyjgS-VdRBfBNAVkvrucbqr';
    this.viewer = new Cesium.Viewer('cesiumContainer');
    this.config = {
      viewer: this.viewer,
      submit :this.onSubmit
    };
  }

  onSubmit(obj){

  }
}


