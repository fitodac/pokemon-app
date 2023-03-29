import { useSelector } from 'react-redux'

import style from './Popup.module.css'


const Popup = () => {

	const { active, message } = useSelector(state => state.popup)

	return (
		<>
			<div className={ active ? `${style.popup} ${style.active}` : `${style.popup}` }>
				<div className={ style['popup-body'] }>

					<svg width="100px" height="94px" viewBox="0 0 100 94">
						<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
							<g id="Group" fill="#000000" fillRule="nonzero">
								<path d="M24.6634889,27.2929512 C25.7478807,26.2125929 27.5072448,26.2125929 28.5916637,27.2929512 L30.5562657,29.2502457 L32.5208678,27.2929512 C33.6052596,26.2125929 35.3635403,26.2125929 36.4490426,27.2929512 C37.5334344,28.3733096 37.5334344,30.1261295 36.4490426,31.2065149 L34.4844406,33.1638094 L36.4490426,35.1211039 C37.5334344,36.2014622 37.5334344,37.9532029 36.4490426,39.0346675 C35.3635945,40.1150259 33.6052867,40.1150259 32.5208678,39.0346675 L30.5562657,37.077373 L28.5916637,39.0346675 C27.5072719,40.1150259 25.7479078,40.1150259 24.6634889,39.0346675 C23.579097,37.9532569 23.579097,36.2014892 24.6634889,35.1211039 L26.6280909,33.1638094 L24.6634889,31.2065149 C23.579097,30.1261565 23.579097,28.3733365 24.6634889,27.2929512 Z" id="Path"></path>
								<path d="M63.5525282,27.2929512 C64.6379763,26.2125929 66.3962842,26.2125929 67.4807031,27.2929512 L69.4453051,29.2502457 L71.4099071,27.2929512 C72.4942989,26.2125929 74.2525797,26.2125929 75.338082,27.2929512 C76.4224738,28.3733096 76.4224738,30.1261295 75.338082,31.2065149 L73.3734799,33.1638094 L75.338082,35.1211039 C76.4224738,36.2014622 76.4224738,37.9532029 75.338082,39.0346675 C74.2526339,40.1150259 72.494326,40.1150259 71.4099071,39.0346675 L69.4453051,37.077373 L67.4807031,39.0346675 C66.3963112,40.1150259 64.6380305,40.1150259 63.5525282,39.0346675 C62.4681364,37.9532569 62.4681364,36.2014892 63.5525282,35.1211039 L65.5171302,33.1638094 L63.5525282,31.2065149 C62.4681364,30.1261565 62.4681364,28.3733365 63.5525282,27.2929512 Z" id="Path"></path>
								<path d="M29.7253744,71.0992847 C28.6388701,72.1785907 26.8805352,72.1764861 25.7961162,71.0940147 C24.7127807,70.012604 24.7148932,68.2597571 25.8014062,67.180451 L31.3713761,61.6457697 C32.4568242,60.5664637 34.2129654,60.5685683 35.2973843,61.6478779 L38.8881001,65.226317 L42.4798992,61.6478779 C43.0004149,61.1292983 43.7071018,60.8373422 44.4445013,60.8373422 C45.1808445,60.8373422 45.8875313,61.1292983 46.408047,61.6478779 L49.9998462,65.226317 L53.5916453,61.6478779 C54.6760372,60.5675195 56.4343179,60.5675195 57.5198202,61.6478779 L61.110536,65.226317 L64.7023351,61.6478779 C65.223907,61.128246 65.9316773,60.8362937 66.6690496,60.8373422 C67.4064491,60.8384 68.1141922,61.1314029 68.6347079,61.6520872 L74.1689278,67.1867685 C75.2512071,68.2702838 75.2480384,70.0221054 74.1615224,71.1014114 C73.0739618,72.1796652 71.3155998,72.1765082 70.2322642,71.0929794 L66.6626734,67.5231747 L63.0752076,71.0972966 C61.9908158,72.1776549 60.2314517,72.1776549 59.1470327,71.0972966 L55.5552336,67.5188575 L51.9645178,71.0972966 C51.4429459,71.6158762 50.7362319,71.9078697 49.9999158,71.9078697 C49.2635997,71.9078697 48.5568857,71.6158762 48.0353138,71.0972966 L44.4445979,67.5188575 L40.8527988,71.0972966 C39.768407,72.1776549 38.0090429,72.1776549 36.9246239,71.0972966 L33.3306581,67.5158894 L29.7253744,71.0992847 Z" id="Path"></path>
								<path d="M77.7767245,0 C90.0501043,0 100,9.91315605 100,22.1395348 L100,22.1395348 L100,71.8604652 C100,84.0881931 90.0498334,94 77.7767245,94 L77.7767245,94 L22.2232755,94 C9.94989573,94 0,84.0879233 0,71.8604652 L0,71.8604652 L0,22.1395348 C0,9.91288623 9.95016656,0 22.2232755,0 L22.2232755,0 Z M77.0620144,7 L23.9379856,7 C15.1354335,7 8,14.0817358 8,22.8170161 L8,70.1819557 C8,78.9172361 15.1354335,86 23.9379856,86 L77.0620144,86 C85.8645665,86 93,78.9172361 93,70.1819557 L93,22.8170161 C93,14.0817358 85.8645665,7 77.0620144,7 Z" id="Shape"></path>
							</g>
						</g>
					</svg>

					<div>{ message }</div>
				</div>
			</div>
		</>
	)
}


export default Popup