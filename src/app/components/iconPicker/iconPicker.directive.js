export function IconPickerDirective() {

  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/iconPicker/iconPicker.html',
    scope: {
      config :"="
    },
    controller: IconPickerController,
    controllerAs: 'iconPickerCtrl',
    bindToController: true
  };

  return directive;

}

class IconPickerController {
  /**
   * @constructor
   * Initializes icons options respectively to layer type, default chosen icon, listener to change icon slide that
   * change chosen icon and affect on view
   */
  constructor(metaData) {
    'ngInject';
    this.ICON_PICKER_WIDTH = 300;
    this.iconsPath = 'assets/images/icons/';
    this.entity = this.config.viewer.entities.getOrCreateEntity('drawingEntity');
    this.icon = '/assets/iconsSymbol/airplane.svg';
    this.metaData = metaData;
    this.visible = false
  }


  /**
   * @ngdoc method
   * @name openPicker
   * @description show icon Picker
   */
  openPicker() {
    this.searchInput = '';
    this.history = this.metaData.getIconsHistory();
    this.icons = this.metaData.getIconsPack();
    this.visible = true;
  }


  /**
   * @ngdoc method
   * @name closePicker
   * @description hide icon Picker
   */
  closePicker() {
    this.searchInput = '';
    this.visible = false;
  }

  /**
   * @ngdoc method
   * @name setIcon
   * @description save user icon choice
   * @param icon (string) selected icon
   */
  setIcon(icon, saveToHistory) {
    this.closePicker();

    if (saveToHistory) {
      this.icon =icon;
      this.entity.billboard.image = icon;
      this.metaData.saveIconsHistoryUnique(icon);
    }
  }

  /**
   * @ngdoc method
   * @name getTitle
   * @description get icon title
   * @param src (string) selected icon source
   */
  getTitle(src) {
    let filename = src.substr(src.lastIndexOf('/') + 1);
    return filename.split('.')[0];
  }

}

