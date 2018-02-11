let rainyDay = require('./RainyDay').RainyDay;
const bgCovers = {
	path: 'http://image.lcddjm.com/qnimg/',
	names: [
		'20171010-DSC_2019.jpg',
		'20171010-DSC_2020.jpg',
		'20171010-DSC_2068.jpg',
		'20171010-DSC_2075.jpg',
		'20171010-DSC_2077.jpg',
		'20171010-DSC_2078.jpg',
		'20171010-DSC_2085.jpg',
		'20171010-DSC_2091.jpg',
		'20171010-DSC_2190.jpg',
		'20171010-DSC_2198.jpg',
		'20171010-DSC_2223.jpg',
		'20171010-DSC_2357.jpg',
		'20171011-DSC_2363.jpg',
		'20171011-DSC_2367.jpg'
	]
}

function instantiationEngine() {
    let engine;
	let pic = document.querySelector('#rainyday');
	pic.onload = function () {
		engine = new rainyDay({
			image: pic,
			height: window.innerHeight,
			width: window.innerWidth
		});
		engine.canvas.id = "rainCanvas";
		engine.rain([
			[3, 3, 0.88],
			[5, 5, 0.9],
			[6, 2, 1]
		], 100);
		this.crossOrigin = 'anonymous';
		this.style.visibility = "hidden";
	}
	pic.crossOrigin = "Anonymous";
	pic.src = bgCovers.path + bgCovers.names[Math.floor(Math.random() * bgCovers.names.length)];
}

export {
    instantiationEngine
}
