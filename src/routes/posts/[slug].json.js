
import got from 'got'

export async function get(req, res, next) {

	const { slug } = req.params;
	const view = process.env.STATUS=='Preview' ? "Preview" : "Published"

	let cachedContent = cache.get(`posts/${slug}`)
	if(cachedContent) {
		send(res, 200, json, {
			'Content-Type': 'application/json'
		});
		return 
	}

	// console.log('view::', view)
	try {
	  let bases = [{
		  tables: ["Posts"],
		  options: {
		    "view": view,
        keyword: slug,
        matchKeywordWithField: 'Slug',
        matchStyle: 'exact'
		  }
	  }]

		const apiEditorKey = process.env.AIRTABLE_PRIVATE_API
		const baseId = process.env.AIRTABLE_PRIVATE_BASE

	  let _cytosis = new Cytosis({
	    apiKey: apiEditorKey,
	    baseId: baseId,
	    bases: 	bases,
	    routeDetails: '[cytosis/get]',
	  })


	  _cytosis.then((_result) => {

	  	delete _result['apiKey']
	  	delete _result['baseId']

			json = JSON.stringify(_result)
			cache.set( `posts/${slug}`, json, 60*60 );
			send(res, 200, json, {
				'Content-Type': 'application/json'
			})
	  })
	} catch(err) {
		throw new Error('[cytosis/get] Error', err)
	}
}




