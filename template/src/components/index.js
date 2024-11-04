import Icons from './icons/index.js';
import SvgIcon from './SvgIcon/index.vue';
import MyVideo from './MyVideo/index.vue';
import ImagePreviewDialog from './ImagePreviewDialog/index.vue';

const install = (app) => {
  app.use(Icons);
  app.component('SvgIcon', SvgIcon);
  app.component('MyVideo', MyVideo);
  app.component('ImagePreviewDialog', ImagePreviewDialog);
};

export default install;
