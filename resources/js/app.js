// window._ = require('lodash');

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
try {
    require('./bootstrap');
	require('./jquery-2.1.1.min');
	require('./sweetalert.min');
	require('../plugins/js/adminlte.js');
	require('../plugins/js/bootstrap.bundle.min.js');
	require('../plugins/js/Chart.min.js');
	require('../plugins/js/dashboard.js');
	require('../plugins/js/jquery.overlayScrollbars.min.js');
	require('../plugins/jquery.validation/jquery.validate.min.js');
	require('../plugins/js/jquery.dataTables.min.js');
	// require('../plugins/js/dataTables.bootstrap4.min.js');
	require('./custom');
    // require('datatables.net')(window, $);
    // require('datatables.net-bs')(window, $);
} catch (e) {}