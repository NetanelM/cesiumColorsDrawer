import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { EventsHandlerService } from '../app/services/eventsHandler/eventsHandler.service';
import { MetaDataService } from '../app/services/metaData/metaData.service';
import { AppDirective } from '../app/components/app/app.directive';
import { FormDrawDirective } from '../app/components/formDraw/formDraw.directive';
import { IconPickerDirective } from '../app/components/iconPicker/iconPicker.directive';
import { MapCesiumDirective } from '../app/components/mapCesium/mapCesium.directive';

angular.module('colorPicker', ['ngAnimate', 'mdColorPicker', 'ngAria', 'ui.router', 'ngMaterial', 'toastr'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('metaData', MetaDataService)
  .service('eventsHandler', EventsHandlerService)
  .directive('app', AppDirective)
  .directive('mapCesium', MapCesiumDirective)
  .directive('iconPicker', IconPickerDirective)
  .directive('formDraw', FormDrawDirective);
