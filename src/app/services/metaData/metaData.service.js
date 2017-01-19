//import metaData from './metaData';

/**
 * @constructor
 * receive some services that it dependent on, initializes service objects that will provide information to application modules
 */
export class MetaDataService {
  constructor($http) {
    'ngInject';
    const ICON_PACK_INDEX_FILENAME = '__index__.json';

    let that = this;
    //=== development mode meta ===//
    this.devmode = (window.location.href.indexOf('?devmode') > -1);

    //=== data files ===//
    this.dataFilesSpec = [];
    this.dataFilesRemovedColumns = {};
    this.dataFilesPolygonNameColumn = {};
    //=== data urls ===//
    this.dataUrlsSpec = [];

    //=== icons ===//
    this.iconsHistory = [];
    this.iconsFolder = '../assets/iconsSymbol/';
    //get path without "../../"
    this.iconsPackPath = this.iconsFolder.split('../').join('');
    this.iconsPack = [];

    $http.get(this.iconsPackPath + ICON_PACK_INDEX_FILENAME).then(function (response) {
      //success
      that.iconsPack = _.map(response.data, function (icon) {
        return unescape(that.iconsFolder + icon);
      });
    }, function () {
      //failure
      //toastr.error('ארעה שגיאה בזמן טעינת רשימת האייקונים')
    });

    //this.metaData = metaData;
    //this.metaData = new metaData();
  }

  /**
   * @ngdoc method
   * @name resetMeta
   * @description resetMeta params (usually used when error occurred)
   */
  reset() {
    this.projectLoadInProgress = false;
    this.dataFilesSpec = [];
    this.dataFilesRemovedColumns = {};
    this.dataFilesPolygonNameColumn = {};
    this.dataUrlsSpec = [];
  }


  //======================================================================//
  //======================== SAVE META FUNCTIONS =========================//
  //======================================================================//
  /**
   * @ngdoc method
   * @name saveFileData
   * @description save (add to array) loaded file meta data
   */
  saveFileData(name, type) {
    let spec = {
      fileName: name,
      dataType: type
    };
    if (this.dataFilesRemovedColumns[name]) {
      spec.removedColumns = this.dataFilesRemovedColumns[name];
    }
    if (this.dataFilesPolygonNameColumn[name]) {
      spec.polygonNameColumn = this.dataFilesPolygonNameColumn[name];
    }
    this.dataFilesSpec.push(spec);
  }

  /**
   * @ngdoc method
   * @name saveURLData
   * @description save (add to array) loaded url meta data
   */
  saveURLData(url, type) {
    let spec = {
      url: url,
      dataType: type
    };
    this.dataUrlsSpec.push(spec);
  }

  /**
   * @ngdoc method
   * @name saveProjectFile
   * @description set (replace array) loaded files meta data
   */
  setAllFilesData(dataFiles) {
    this.dataFilesSpec = dataFiles;
  }

  /**
   * @ngdoc method
   * @name saveIconsHistoryUnique
   * @description save icon to history (if not already exist in history)
   */
  saveIconsHistoryUnique(src) {
    if (this.iconsHistory.indexOf(src) === -1) {
      this.iconsHistory.push(src);
    }
  }

  setProjectLoadFlag(value) {
    this.projectLoadInProgress = value;
  }

  setRemovedColumns(fileName, removedColumns) {
    this.dataFilesRemovedColumns[fileName] = removedColumns;
  }

  setPolygonNameColumn(fileName, nameColumn) {
    this.dataFilesPolygonNameColumn[fileName] = nameColumn;
  }

  //======================================================================//
  //======================== GET META FUNCTIONS ==========================//
  //======================================================================//
  getLoadedFilesData() {
    return this.dataFilesSpec;
  }

  getLoadedURLsData() {
    return this.dataUrlsSpec;
  }

  getIconsPack() {
    return this.iconsPack;
  }

  getIconsHistory() {
    return this.iconsHistory;
  }

  isProjectLoadInProgress() {
    return this.projectLoadInProgress;
  }

  getTlVersion() {
    return this.tlVersion;
  }

  isDevelopmentMode() {
    return this.devmode;
  }
}

