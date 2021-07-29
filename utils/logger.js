/* eslint-disable no-console */
const { errorFormat } = require('./errorFormat');

class Logger {

	constructor(tag) {
		this.tag = tag;
	}

	_prepareTag(level = 'log' | 'error') {
		return `${this.tag} <${level}>`;
	}

	_prepareMetaData(metaData) {
		for (const i in metaData) {
			if (metaData[i] instanceof Error) {
				metaData[i] = errorFormat(
					metaData[i],
					true
				);
			}
		}

		return metaData;
	}

	log(message, metaData = {}) {
		const date = new Date();

		if (process.env.NODE_ENV !== 'test') {
			console.log(
				JSON.stringify({
					tag: this.prepareTag('log'),
					message,
					level: 'log',
					formattedDate: date.toISOString(),
					env: process.env.NODE_ENV,
					processId: process.pid,
					timestamp: date.getTime(),
					metaData: this.prepareMetaData(metaData),
				})
			);
			console.log(' ');
		}
	}

	error(message, metaData = {}) {
		const date = new Date();

		if (process.env.NODE_ENV !== 'test') {
			console.error(
				JSON.stringify({
					tag: this.prepareTag('error'),
					message,
					level: 'error',
					formattedDate: date.toISOString(),
					env: process.env.NODE_ENV,
					processId: process.pid,
					timestamp: date.getTime(),
					metaData: this.prepareMetaData(metaData),
				})
			);
			console.error(' ');
		}
	}
}

module.export = Logger;