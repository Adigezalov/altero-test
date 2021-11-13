export interface IRegion {
	readonly id: number
	path: string
	name: number
	children?: IRegion[]
}
