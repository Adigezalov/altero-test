import React, {useState, FC} from 'react'
import {IRegion} from '../interfaces/IRegion'
import Icon from './Icon'
import '../styles/Tab.css'

type TabProps = {
	region: IRegion,
	viewRegions(data: IRegion[]): JSX.Element[],
	tab: number,
	parent: boolean
}

const Tab: FC<TabProps> = ({region, viewRegions, tab, parent}): JSX.Element => {
	const [open, setOpen] = useState<boolean>(false)

	const openTab = (): void => {
		setOpen(!open)
	}

	return (
		<div>
			<div
				className={parent ? 'root parent' : 'root'}
				style={{marginLeft: tab * 20}}
				onClick={openTab}
			>
				<div className='content'>
					{parent &&
					<div className='icon'>
						{
							open
							? <Icon src={'images/down.svg'}/>
							: <Icon src={'images/up.svg'}/>
						}
					</div>}
					<Icon src={'images/secure.svg'}/>
					{region.name}
				</div>
			</div>
			{open && viewRegions(region.children!)}
		</div>
	)
}

export default Tab
