# preload_js
A preloader library 

This is a preloader library used in development projects

To use simply add a div to the html

```html
<div class="site-loader" id="siteLoader"></div>
```

And it can be styled in the following way

```css
.site-loader {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #FFF;
}
```

After including the necessary javascript file, you create a preloader object like this

```js
var preloadOptions = {
		mainDiv: 'siteLoader',
		loaderType: 'basic',
		loaderColor: 'white',
		overlayColor: '#FFFFFF',
		minimumTime: 2000,
		imageLoading: false
	};
var pload = new Preload(preloadOptions);
```
