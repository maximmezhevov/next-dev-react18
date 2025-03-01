import React from 'react'

interface Props<T> {
	items: T[]
	render: (item: T) => React.ReactNode
}

export const Render = <T,>({ items, render }: Props<T>) => {
	return items.map((item, index) => <React.Fragment key={index}>{render(item)}</React.Fragment>)
}
