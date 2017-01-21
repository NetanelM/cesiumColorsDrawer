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
  constructor($scope, eventsHandler) {
    'ngInject';
    this.$scope = $scope;
    this.eventsHandler = eventsHandler;
    this.selectColor = '#303336';

    this.icon = '/assets/iconsSymbol/airplane.svg';
    this.iconConfig = {
      viewer :this.config.viewer
    };
    this.visible = true;
    this.shapeName = '';
    this.initOptionsShape();
    this.initWatch();
  }

  initWatch() {
    let that = this;
    this.$scope.$watch(()=>this.selectColor, function (nv, ov) {
      that.changeColor();
    })
  }


  changeColor() {
    let that = this;
    switch (this.shapeName) {
      case 'Polygon':
        that.entity.polygon.material = Cesium.Color.fromCssColorString(this.selectColor);
        break;
      case 'Polyline':
        that.entity.polyline.material = Cesium.Color.fromCssColorString(this.selectColor);
        break;
      case 'Point':
        that.entity.point.color = Cesium.Color.fromCssColorString(this.selectColor);
        break;
    }
  }

  changeIcon(icon) {
    this.icon = icon;
    this.entity.billboard.image = icon.split('../').join('');
  }

  openForm() {
    this.entity = this.config.viewer.entities.getOrCreateEntity('drawingEntity');
    this.visible = false;
    this.initEntities()
  }

  initEntities() {
    let that = this;
    this.entity.polygon = new Cesium.PolygonGraphics({});
    this.entity.polygon.hierarchy = null;
    this.entity.polyline = new Cesium.PolylineGraphics({});
    this.entity.polyline.positions = null;
    this.entity.point = new Cesium.PointGraphics({
      pixelSize: 10,
      color: that.selectColor
    });
    this.entity.billboard = new Cesium.BillboardGraphics({
      scale: 0.3,
      image: that.icon
    });
    this.entity.position = null;
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

  setShape(shape) {
    this.shapeName = shape.name;
    switch (shape.method) {
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
    this.changeColor();
  }

  drawPolygon() {
    this.entity.point.show = false;
    this.entity.billboard.show = false;
    this.entity.position = null;
    this.entity.polyline.positions = null;
    this.eventsHandler.enableDrawPolygon(this.config.viewer, 'polygon', 'hierarchy')
  }

  drawPolyline() {
    this.entity.point.show = false;
    this.entity.billboard.show = false;
    this.entity.position = null;
    this.entity.polygon.hierarchy = null;
    this.eventsHandler.enableDrawPolygon(this.config.viewer, 'polyline', 'positions')
  }

  drawPoint() {
    this.entity.point.show = true;
    this.entity.billboard.show = false;
    this.entity.polygon.hierarchy = null;
    this.entity.polyline.positions = null;
    this.eventsHandler.enableDrawPoint(this.config.viewer)
  }

  drawIcon() {
    this.entity.billboard.show = true;
    this.entity.point.show = false;
    this.entity.polygon.hierarchy = null;
    this.entity.polyline.positions = null;
    this.eventsHandler.enableDrawPoint(this.config.viewer)
  }
}
