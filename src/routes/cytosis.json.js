

// ex: 	https://github.com/sveltejs/sapper/blob/master/site/src/routes/docs/index.svelte
// 			https://github.com/sveltejs/sapper/blob/master/site/src/routes/docs/index.json.js

// // routes/blog/[slug].json.js
// import db from './_database.js'; // the underscore tells Sapper this isn't a route

// export async function get(req, res, next) {
// 	// the `slug` parameter is available because this file
// 	// is called [slug].json.js
// 	const { slug } = req.params;

// 	const article = await db.get(slug);

// 	if (article !== null) {
// 		res.setHeader('Content-Type', 'application/json');
// 		res.end(JSON.stringify(article));
// 	} else {
// 		next();
// 	}
// }

import send from '@polka/send';
import Cytosis from 'cytosis';
import * as sapper from '@sapper/server';

import { config } from "dotenv";

import { automailer } from '../_helpers/mailer.js'

config(); // https://github.com/sveltejs/sapper/issues/122


let json;

export function get(req, res) {

	const view = process.env.STATUS=='Preview' ? "Preview" : "Published"

	console.log('view::', view)
	try {
	  let bases = [{
		  tables: ["Content"],
		  options: {
		    "view": view,
		  }
	  },{
		  tables: ["Posts"],
		  options: {
		    "view": view,
		  }
	  }]

		const { slug } = req.params;

		console.log('loading cytosis...', bases)

		const apiEditorKey = process.env.AIRTABLE_PRIVATE_API
		const baseId = process.env.AIRTABLE_PRIVATE_BASE

	  let _cytosis = new Cytosis({
	    apiKey: apiEditorKey,
	    baseId: baseId,
	    bases: 	bases,
	    routeDetails: '[pdseminar/get]',
	  })


	  _cytosis.then((_result) => {

	  	delete _result['apiKey']
	  	delete _result['baseId']

			json = JSON.stringify(_result)
			send(res, 200, json, {
				'Content-Type': 'application/json'
			});
	  })
	} catch(err) {
		throw new Error('[pdseminar/get] Error', err)
	}
}


