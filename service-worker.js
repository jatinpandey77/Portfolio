const filesToCache = [
    '/',
    'index.html',
    'assets/css/main.css',
    'assets/css/fontawesome-all.min.css',
    'assets/css/noscript.css',
    'assets/js/register_sw.js',
	'service-worker.js',
	'favicon.ico',
	'assets/icon.png',
	'manifest.json',
	'assets/webfonts/fa-brands-400.eot',
	'assets/webfonts/fa-brands-400.svg',
	'assets/webfonts/fa-brands-400.ttf',
	'assets/webfonts/fa-brands-400.woff',
	'assets/webfonts/fa-brands-400.woff2',
	'assets/webfonts/fa-regular-400.eot',
	'assets/webfonts/fa-regular-400.svg',
	'assets/webfonts/fa-regular-400.ttf',
	'assets/webfonts/fa-regular-400.woff',
	'assets/webfonts/fa-regular-400.woff2',
	'assets/webfonts/fa-solid-900.eot',
	'assets/webfonts/fa-solid-900.svg',
	'assets/webfonts/fa-solid-900.ttf',
	'assets/webfonts/fa-solid-900.woff',
	'assets/webfonts/fa-solid-900.woff2'
];
  
const staticCacheName = 'portfolio-cache-v1';
  
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request)
			.then(response => {
				// TODO 5 - Respond with custom 404 page
				return caches.open(staticCacheName).then(cache => {
					cache.put(event.request.url, response.clone());
					return response;
				});
			});
		}).catch(error => { 
			// TODO 6 - Respond with custom offline page
		})
	);
});