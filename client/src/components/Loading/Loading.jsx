import src from '../../assets/img/loading.gif'
import style from './Loading.module.css'


const Loading = () => {
	return (
		<div className={ style.loading }>
			<img src={ src } alt="Page loading" />
		</div>
	)
}

export default Loading