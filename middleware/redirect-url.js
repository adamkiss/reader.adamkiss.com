const providers = [
	require('../lib/provider-ffnet'),
	require('../lib/provider-ao3'),
	require('../lib/provider-hpffa')
]

export default function ({params, query, redirect}) {
	const url = params.pathMatch

	providers.forEach(provider => {
		if (provider.match({url, query})) {
			return redirect(301, provider.getUrl({url, query}))
		}
	})
}
