/*
*	Created by Fred Naude  - 2016_03_19
*
*	Simple preloader library
*	
*	V1.0
*
* 	TODO
*	Set spinner colors via js
*	Set defaults for object
* 	Create more loader templates and maybe move it to separate files?
*/

var Preload = function(options){
	console.log('Preloader : Inited', options.mainDiv);
	var div = options.mainDiv;
	var el = document.querySelector(div) || document.getElementById(div);
	var images = document.getElementsByTagName('img');
	var loaderDiv;
	var loaderTemplate;
	var loadedImages = 0;
	var opacityIncrements = 0.1;
	var delay = 3000;
	var fps = 60;
	var startTime;
	var currentTime;
	var noImages = false;
	console.log('Preloader : Div', el);
	console.log('Preloader : Images', images);

	var obj = {
		mainDiv : el,
		loaderType : options.loaderType,
		loaderColor : options.loaderColor,
		overlayColor : options.overlayColor,
		minimumTime: options.minimumTime,
		imageLoading: options.imageLoading
	};

	//captures the start time of the aplication
	var startTimer = function(){
		startTime = new Date().getTime();
	};

	//Create the loader div. This is the parent
	var createDiv = function(className, id){
		var createLoaderParent = document.createElement('div');
		createLoaderParent.className = className;
		createLoaderParent.id = id;

		return createLoaderParent;
	};

	//style the newly created div
	var styleDiv = function(div, styleArray, styleValue){
		var isArray = Array.isArray(styleArray);
		if(isArray){
			var i;
			for(i = 0; i<styleArray.length; i++){
				div.style[styleArray[i]] = styleValue[i];
			}
		}else{
			console.log('Preloader : Style', styleArray, styleValue);
			div.style[styleArray] = styleValue;
		}
	};

	//insert the newly created div
	var insertDiv = function(nodeElement, childElement){
		nodeElement.insertBefore(childElement, nodeElement.firstChild);
	};

	//Switches the template. Checks whic template to use and appends it loader div
	var templateDiv = function(loaderType){
		console.log('Preloader : Loader', loaderType);
		switch(loaderType){
			case 'basic':
			var loaderCircle = createDiv('loader-circle');
			insertDiv(loaderDiv, loaderCircle);
			var loaderCircleSpinner = createDiv('loader-circle-spinner');
			insertDiv(loaderCircle, loaderCircleSpinner);
		}
	};

	//return the decrease function. Uses setTimeout so we can control the length of fadeout animation
	var fadeOutLoader = function(el){
		var opacity = 1;
		function decrease(){
			console.log('Preloader : Fade', 'Starting fade.');
			opacity -= opacityIncrements;
			if(opacity <= 0){
				el.style.opacity = 0;
				el.parentNode.removeChild(el);
				return true;
			}
			el.style.opacity = opacity;
			setTimeout(decrease, delay/fps);
		}

		return decrease;
	};

	//this checks if all the images are finished loading
	var imageLoaded = function(){
		if(!noImages){
			loadedImages++;
		}		
		if(loadedImages === images.length){
			console.log('Preloader : LoadedImage', 'All image loaded.');
			var fadeMe = fadeOutLoader(loaderDiv);
			currentTime = new Date().getTime();
			var elapsedTime = currentTime - startTime;
			console.log('Preloader : Elapsed', elapsedTime, obj.minimumTime);
			//if the time is less than the minimum time, wait for the minimum time
			if(elapsedTime < obj.minimumTime){
				setTimeout(function(){
					fadeMe();
				}, obj.minimumTime);
			}else{
				fadeMe();
			}
		}
	};

	//this function loops through all the images on the page. Checks the load status of each image
	var checkImagesLoaded = function(){
		if(images.length === 0 || options.imageLoading === false){
			noImages = true;
			//imageLoaded();
			var fadeMe = fadeOutLoader(el);
			currentTime = new Date().getTime();
			var elapsedTime = currentTime - startTime;
			//if the time is less than the minimum time, wait for the minimum time
			if(elapsedTime < obj.minimumTime){
				setTimeout(function(){
					fadeMe();
				}, obj.minimumTime);
			}else{
				fadeMe();
			}
		}else{
			var i;
			for(i = 0; i<images.length; i++){
				images[i].onload = function(){
					imageLoaded();
				};
			}
		}
	};

	startTimer();
	loaderDiv = createDiv('loader', 'loader-overlay');
	styleDiv(loaderDiv, 'backgroundColor', obj.overlayColor);
	insertDiv(el, loaderDiv);
	loaderTemplate = templateDiv(obj.loaderType);
	checkImagesLoaded();
	console.log('Preloader : Tmp', loaderDiv);

	return obj;
};