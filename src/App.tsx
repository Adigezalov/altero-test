import React, {useState, useEffect} from 'react'
import {startMirage} from './server-mock'
import {Region} from './interfaces/Region'
import Tab from './components/Tab'

if (process.env.NODE_ENV === 'development') {
	startMirage()
}

const MAIN_LEVEL = 'main'
const URL = '/api/regions'
const LEVEL_SEPARATOR = '.'

const style: any = {
	height: '100vh',
	padding: 20,
	backgroundColor: '#eeeeee',
}

function App() {
	const [regions, setRegions] = useState<any>({})

	useEffect(() => {
		fetch(URL)
			.then(res => res.json())
			.then(data => {
				sort(data)
			})
	}, [])

	const sort = (data: [Region]) => {
		const regions: any = {}
		data.forEach(region => {
			const path: string = region.path
			const level: string[] = path.split(LEVEL_SEPARATOR)
			level.pop()
			const key = level.join(LEVEL_SEPARATOR) || MAIN_LEVEL
			if (regions[key]) {
				regions[key].push(region)
			} else {
				regions[key] = []
				regions[key].push(region)
			}
		})
		setRegions(regions)
	}

	const viewRegions = (path: string = MAIN_LEVEL) => {
		const tab: number = path === MAIN_LEVEL ? 0 : +path.split(LEVEL_SEPARATOR).length
		return regions[path]
			? regions[path].map((region: Region) => (
					<Tab region={region} viewRegions={viewRegions} tab={tab} key={region.id} parent={!!regions[region.path]} />
			  ))
			: null
	}

	return <div style={style}>{regions[MAIN_LEVEL] ? viewRegions() : <>Загрузка и сортировка...</>}</div>
}

export default App
