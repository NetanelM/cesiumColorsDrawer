export class EventsHandlerService {
  constructor() {
    'ngInject';
  }

  enableDraw(viewer) {
    this.classDraw = new EntityDraw(viewer);

    return this.classDraw.setDraw();
  }
}

class EntityPoint {
  constructor(viewer) {
    this._viewer = viewer;
    this.entityDraw = false;
    this._eventHandler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas);
  }

  get eventHandler() {
    return this._eventHandler;
  }

  set eventHandler(eventHandler) {
    this._eventHandler = eventHandler;
  }

  get viewer() {
    return this._viewer;
  }

  _setupEvents() {
    this._eventHandler.setInputAction((click)=>this.mouseLeft(click), Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  setDraw(_onDrawEnd) {
    this.initDrawPoint();
    this.onDrawEnd = _.isFunction(_onDrawEnd) ? _onDrawEnd : ()=> {
    };
    return this;
  }
  initDrawPoint(){
    this._setupEvents();
    this.drawingEntitiy = this.viewer.entities.getOrCreateEntity('drawingEntity');
    //this.drawingEntitiy
  }

  mouseLeft(click) {
    let position = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
    if (_.isUndefined(position)) {
      return;
    }
  }
}

class EntityDraw {
  constructor(viewer) {
    this._viewer = viewer;
    this.entityDraw = false;
    this._eventHandler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas);
  }

  get eventHandler() {
    return this._eventHandler;
  }

  set eventHandler(eventHandler) {
    this._eventHandler = eventHandler;
  }

  initDrawPolyline() {
    this._setupEvents();
    this.drawingEntitiy = this.viewer.entities.getOrCreateEntity('drawingEntity');
    this.polygonPositions = [];
    const positionCBP = new Cesium.CallbackProperty(()=> {
      return this.polygonPositions;
    }, false);

    this.drawingEntitiy.show = true;
    this.drawingEntitiy.polyline = {
      positions: positionCBP
    };
    this.drawingEntitiy.polyline.material = Cesium.Color.BLUE;
  }

  _setupEvents() {
    this._eventHandler.setInputAction((click)=>this.mouseLeft(click), Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this._eventHandler.setInputAction((movement)=>this.mouseMove(movement), Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this._eventHandler.setInputAction(()=>this.drawEnd(), Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }

  get viewer() {
    return this._viewer;
  }

  drawEnd() {
    this.viewer.trackedEntity = undefined;
    this.entityDraw = false;
    this.polygonPositions.splice(this.polygonPositions.length - 2, 2, this.polygonPositions[0]);
    const geoJson = this.convertToGeoJson(this.pointsToCartographicArray(this.polygonPositions));
    _.isFunction(this.onDrawEnd) ? this.onDrawEnd(geoJson) : '';
    this.disableCameraMotion(true, this.viewer);
    this._eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this._eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this._eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    //this.removeEntity(this.drawingEntity);
    return this.convertToGeoJson(this.pointsToCartographicArray(this.polygonPositions));
  }

  removeEntity(entity) {
    this.viewer.entities.remove(entity);
  }

  convertToGeoJson(coordinates) {
    return {
      type: 'Polygon',
      coordinates: [_.map(coordinates, (coords)=> {
        return [coords.longitude, coords.latitude, coords.height]
      })]
    }
  }

  pointsToCartographicArray(carteians) {
    if (!_.isArray(carteians) || !_.isObject(carteians[0]) || !carteians[0].x) {
      return [];
    }
    return _.map(carteians, (carteian)=> {
      let cartographics = Cesium.Cartographic.fromCartesian(carteian);
      cartographics.longitude = Cesium.Math.toDegrees(cartographics.longitude);
      cartographics.latitude = Cesium.Math.toDegrees(cartographics.latitude);
      return cartographics;
    });
  }

  disableCameraMotion(state, viewer) {
    viewer.scene.screenSpaceCameraController.enableRotate = state;
    viewer.scene.screenSpaceCameraController.enableZoom = state;
    viewer.scene.screenSpaceCameraController.enableLook = state;
    viewer.scene.screenSpaceCameraController.enableTilt = state;
    viewer.scene.screenSpaceCameraController.enableTranslate = state;
  }

  setDraw(_onDrawEnd, _onDrawUpdate) {
    this.initDrawPolyline();
    this.onDrawEnd = _.isFunction(_onDrawEnd) ? _onDrawEnd : ()=> {
    };
    this.onDrawUpdate = _.isFunction(_onDrawUpdate) ? _onDrawUpdate : ()=> {
    };
    this.disableCameraMotion(false, this.viewer);
    return this;
  }

  mouseLeft(click) {
    let position = this.viewer.camera.pickEllipsoid(click.position, this.viewer.scene.globe.ellipsoid);
    if (_.isUndefined(position)) {
      return;
    }

    this.polygonPositions.push(position);
    if (this.polygonPositions.length === 1) {
      this.polygonPositions.push(position);
    }
    const geoJson = this.convertToGeoJson(this.pointsToCartographicArray(this.polygonPositions));
    this.onDrawUpdate(geoJson);
    this.entityDraw = true;
    return this;
  }

  mouseMove(movement) {
    if (!this.entityDraw) {
      return;
    }

    const endPoint = this.viewer.camera.pickEllipsoid(movement.endPosition, this.viewer.scene.globe.ellipsoid);

    if (_.isUndefined(endPoint)) {
      return;
    }
    this.polygonPositions[this.polygonPositions.length - 1] = endPoint;
    return this;
  }
}
