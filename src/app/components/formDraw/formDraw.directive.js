export function FormDrawDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    scope: {
      config: "="
    },
    templateUrl: 'app/components/formDraw/formDraw.html',
    controller: FormDrawController,
    controllerAs: 'formDrawCtrl',
    bindToController: true
  };

  return directive;
}

class FormDrawController {
  constructor(eventsHandler) {
    'ngInject';
    this.eventsHandler = eventsHandler;
    this.selectColor = '#303336';
    this.visible = true;
    this.initOptionsShape();
  }

  openForm() {
    //this.eventsHandler.enableDraw
    this.entity = this.config.viewer.entities.getOrCreateEntity('drawingEntity');
    this.visible = false;
    this.initEntities()
  }

  initEntities() {
    this.entity.polygon = new Cesium.PolygonGraphics({});
    this.entity.polygon.show = false;
    this.entity.polyline = new Cesium.PolylineGraphics({});
    this.entity.polyline.show = false;
    this.entity.point = new Cesium.PointGraphics({});
    this.entity.point.show = false;
  }

  initOptionsShape() {
    this.optionsShape = [
      {
        name: 'Polygon',
        method: 'drawPolygon'
      },
      {
        name: 'Polyline',
        method: 'drawPolyline'
      },
      {
        name: 'Point',
        method: 'drawPoint'
      },
      {
        name: 'Icon',
        method: 'drawIcon'
      }
    ];
  }

  setShape(method) {
    switch (method) {
      case 'drawPolygon':
        this.drawPolygon();
        break;
      case 'drawPolyline':
        this.drawPolyline();
        break;
      case 'drawPoint':
        this.drawPoint();
        break;
      case 'drawIcon':
        this.drawIcon();
        break;
    }
  }

  drawPolygon() {
    this.eventsHandler.enableDraw(this.config.viewer)
  }

  drawPolyline() {

  }

  drawPoint() {

    this.entity = new Cesium.PointGraphics({})
  }

  drawIcon() {

  }
}
