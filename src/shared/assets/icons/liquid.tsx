export const Liquid = () => {
	return (
		<svg
			className='rotate-90 absolute z-0'
			xmlns='http://www.w3.org/2000/svg'
			version='1.1'
			width='400'
			height='300'
			fill='#82ECAD'
		>
			<defs>
				<filter id='goo'>
					<feGaussianBlur in='SourceGraphic' stdDeviation='10' result='blur' />
					<feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -12' result='goo' />
					<feComposite in='SourceGraphic' in2='goo' operator='atop' />
				</filter>
			</defs>
			<g filter="url('#goo')">
				<circle cx='400' cy='0' r='250' />
				<circle id='one' cx='110' cy='30' r='80' />
				<circle id='two' cx='110' cy='120' r='30' />
				<circle id='three' cx='170' cy='130' r='60' />
				<circle id='four' cx='225' cy='165' r='50' />
				<circle id='five' cx='270' cy='200' r='30' />
				<circle id='six' cx='370' cy='190' r='90' />
			</g>
		</svg>
	)
}
