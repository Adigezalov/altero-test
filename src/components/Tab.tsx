import React, {useState} from 'react'
import SecureIcon from './SecureIcon'
import DownIcon from './DownIcon'
import UpIcon from './UpIcon'

const Tab = ({region, viewRegions, tab, parent}: any) => {
	const [hover, setHover] = useState(false)
	const [open, setOpen] = useState(false)

	const style = {
		root: {
			display: 'inline-block',
			marginLeft: tab * 20,
			paddingLeft: 20,
			paddingTop: 10,
			paddingRight: 20,
			paddingBottom: 10,
			backgroundColor: hover ? '#808080' : 'transparent',
			cursor: parent ? 'pointer' : 'auto',
			borderRadius: 5,
		},
		content: {display: 'flex', alignItems: 'center'},
		icon: {marginRight: 15},
	}

	const openTab = () => {
		setOpen(!open)
	}

	return (
		<div>
			<div
				style={style.root}
				onMouseEnter={() => {
					setHover(parent)
				}}
				onMouseLeave={() => {
					setHover(false)
				}}
				onClick={openTab}
			>
				<div style={style.content}>
					{parent && <div style={style.icon}>{open ? <DownIcon /> : <UpIcon />}</div>}
					<div style={style.icon}>
						<SecureIcon />
					</div>
					{region.name}
				</div>
			</div>
			{open && viewRegions(region.path)}
		</div>
	)
}

export default Tab
