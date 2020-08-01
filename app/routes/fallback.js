import { app } from '../utils'

export default function fallback({params}) {
	app(`<div>${params.wild}</div>`)
}
