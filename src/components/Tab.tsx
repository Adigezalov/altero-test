import React, {useState} from 'react'
import {IRegion} from '../interfaces/IRegion'
import '../styles/Tab.css'

type TabProps = {
	region: IRegion,
	viewRegions: Function,
	tab: number,
	parent: boolean
}

const Tab = ({region, viewRegions, tab, parent}: TabProps) => {
	const [open, setOpen] = useState<boolean>(false)

	const openTab = (): void => {
		setOpen(!open)
	}

	return (
		<div>
			<div
				className='root'
				style={{
					marginLeft: tab * 20,
					cursor: parent ? 'pointer' : 'auto'
				}}
				onClick={openTab}
			>
				<div className='content'>
					{parent &&
					<div className='icon'>
						{
							open
							? <img src={process.env.PUBLIC_URL + 'images/down.svg'} alt="down"/>
							: <img src={process.env.PUBLIC_URL + 'images/up.svg'} alt="up"/>
						}
					</div>}
					<div className='icon'>
						<img src={process.env.PUBLIC_URL + 'images/secure.svg'} alt="secure"/>
					</div>
					{region.name}
				</div>
			</div>
			{open && viewRegions(region.children)}
		</div>
	)
}

export default Tab
