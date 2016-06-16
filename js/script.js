window.addEventListener('DOMContentLoaded', function(){
	var preloadOptions = {
		mainDiv: 'siteLoader',
		loaderType: 'basic',
		loaderColor: 'white',
		overlayColor: '#FFFFFF',
		minimumTime: 2000,
		imageLoading: false
	};
	var pload = new Preload(preloadOptions);
	console.log('DONE Loading');
});