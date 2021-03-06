import React, {useState, useEffect, FC} from 'react'
import {startMirage} from './server-mock'
import {IRegion} from './interfaces/IRegion'
import Tab from './components/Tab'
import './styles/App.css'

if (process.env.NODE_ENV === 'development') {
	startMirage()
}

const URL:string = '/api/regions'

const App:FC = (): JSX.Element => {
	const [regions, setRegions] = useState<IRegion[]>([])

	useEffect(() => {
		fetch(URL)
			.then(res => res.json())
			.then(data => {
				sort(data)
			})
	}, [])

	const sort = (data:IRegion[]): void => {
		const regions:IRegion[] = data.reduce((children: (data: string) => IRegion[], region:IRegion) => {
			children(region.path.replace(/(^|\.)\w+$/g, "")).push({
				...region,
				children: children(region.path),
			});

			return children;
		}, function (this:any, key:string):[] {
			return this[key] || (this[key] = [])
		}.bind({}))("");

		setRegions(regions)
	}

	const viewRegions = (data:IRegion[]): JSX.Element[] => (
		data.map((region:IRegion) => {
		const levels: string[] = region.path.split('.')
		return <Tab key={region.id}
								region={region}
								tab={levels.length}
								parent={!!region.children?.length}
								viewRegions={viewRegions}/>
		})
	)

	return <div className='app'>
		{
			regions.length
				? viewRegions(regions)
				: <>Загрузка и сортировка...</>
		}
	</div>
}

export default App
