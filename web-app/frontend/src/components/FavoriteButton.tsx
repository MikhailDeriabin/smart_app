import classes from './FavoriteButton.module.css';
import {ReactComponent as Star} from '../img/star_FILL0_wght400_GRAD0_opsz48.svg'
import {Component} from "react";

class FavoriteButton extends Component<{ handleClick: any }, { checked: boolean }> {

    constructor(props: { handleClick: any; } | Readonly<{ handleClick: any; }>) {
        super(props);
        this.state = {checked: false};
    }

    render() {
        let {handleClick} = this.props;
        //const {t} = useTranslation();
        const handleChange = (event: { target: { checked: any; }; }) => {
            if (event.target.checked) {
                this.setState({checked: true});
            } else {
                this.setState({checked: false});
            }
        };
        return (
            <div className={classes.container}>
                {
                    this.state.checked ?
                        <Star width="48" height="48" viewBox="0 0 48 48" stroke={`#000000`} stroke-width="2"
                              fill={`#fddb00`} className={classes.star}/>
                        :
                        <Star width="48" height="48" viewBox="0 0 48 48" stroke={`#000000`} stroke-width="2"
                              fill={`rgba(253, 219, 0, 0)`} className={classes.star}/>
                }
                <input onChange={handleChange} type="checkbox" onClick={handleClick} className={classes.toggle}/>
            </div>
        );
    }
}

export default FavoriteButton;



