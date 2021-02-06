import { useState, useCallback, useLayoutEffect } from 'react'
import { debounce } from 'lodash'

function getDimensionObject(node) {
	const rect = node.getBoundingClientRect()

	return {
		width: rect.width,
		height: rect.height,
		top: 'x' in rect ? rect.x : rect.top,
		left: 'y' in rect ? rect.y : rect.left,
		x: 'x' in rect ? rect.x : rect.left,
		y: 'y' in rect ? rect.y : rect.top,
		right: rect.right,
		bottom: rect.bottom,
	}
}

function useDimensions(liveMeasure = true) {
	const [dimensions, setDimensions] = useState({})
	const [node, setNode] = useState(null)

	const ref = useCallback(node => {
		setNode(node)
	}, [])

	useLayoutEffect(() => {
		if (node) {
			const measure = () =>
				window.requestAnimationFrame(() =>
					setDimensions(getDimensionObject(node)),
				)
			const measureDebounce = debounce(measure, 500)
			measureDebounce()

			if (liveMeasure) {
				window.addEventListener('resize', measureDebounce)
				window.addEventListener('scroll', measureDebounce)

				return () => {
					window.removeEventListener('resize', measureDebounce)
					window.removeEventListener('scroll', measureDebounce)
				}
			}
		}
	}, [liveMeasure, node])

	return [ref, dimensions, node]
}

export default useDimensions
