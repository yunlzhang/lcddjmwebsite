import {cacheImg} from './common';
let rainyDay = require('./RainyDay').RainyDay;
const bgCovers = {
	path: location.href.match(/localhost/) ? '/engine/' : 'https://image.lcddjm.com/engine/',
	names: [
		'20171010-20171010-DSC_2019.jpg',
		'20171010-20171010-DSC_2020.jpg',
		'20171010-20171010-DSC_2068.jpg',
		'20171010-20171010-DSC_2075.jpg',
		'20171010-20171010-DSC_2078.jpg',
		'20171010-20171010-DSC_2091.jpg',
		'20171010-20171010-DSC_2190.jpg',
		'20171010-20171010-DSC_2198.jpg',
		'20171010-20171010-DSC_2223.jpg',
		'20171011-20171011-DSC_2363.jpg',
		'20171011-20171011-DSC_2367.jpg'
	]
}

function instantiationEngine() {
	let result = {};
	let pic = document.querySelector('#rainyday');
	pic.onload = function () {
		result.engine = new rainyDay({
			image: pic,
			height: window.innerHeight,
			width: window.innerWidth
		});
		result.engine.canvas.id = "rainCanvas";
		result.engine.rain([
			[3, 3, 0.88],
			[5, 5, 0.9],
			[6, 2, 1]
		], 100);
		this.crossOrigin = 'anonymous';
		this.style.visibility = "hidden";
	}
	pic.crossOrigin = "Anonymous";
	// pic.src = cacheImg(bgCovers.path + bgCovers.names[Math.floor(Math.random() * bgCovers.names.length)])
	pic.src = bgCovers.path + bgCovers.names[Math.floor(Math.random() * bgCovers.names.length)];
	return result;
}

export {
    instantiationEngine
}
