import * as React from 'react'

function getRandomColor() {
	const colors = ['green', 'blue', 'purple', 'red', 'pink']
	return colors[Math.floor(Math.random() * colors.length)]
}
// This in input takes the state for which we will be tracking previous
function usePrevious(value) {
	const [current, setCurrent] = React.useState(value)
	const [previous, setPrevious] = React.useState(null)
	if (current !== value) {
		setPrevious(current)
		setCurrent(value)
	}
	return previous
}

export default function App() {
	const [color, setColor] = React.useState(getRandomColor())
	const previousColor = usePrevious(color)

	const handleClick = () => {
		function getNewColor() {
			const newColor = getRandomColor()
			if (color === newColor) {
				getNewColor()
			} else {
				setColor(newColor)
			}
		}
		getNewColor()
	}

	return (
		<section>
			<h1>usePrevious</h1>
			<button className="link" onClick={handleClick}>
				Next
			</button>
			<article>
				<figure>
					<p
						style={{
							height: '200px',
							background: `${previousColor}`
						}}
					/>
					<figcaption>Previous: {previousColor}</figcaption>
				</figure>
				<figure>
					<p style={{ height: '200px', background: `${color}` }} />
					<figcaption>Current: {color}</figcaption>
				</figure>
			</article>
		</section>
	)
}
