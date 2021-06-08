
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/free-solid-svg-icons'

const PanelHeader = ({
    title = ''
}) => {

    const icon = (() => {
        switch (title) {
            case "Transport":
                return icons.faCar
            case "Food":
                return icons.faUtensils
            case "Streaming":
                return icons.faSignal
            case "Fashion":
                return icons.faTshirt
            case "Purchase":
                return icons.faShoppingCart
            default:
                return icons.faCircle
        }
    })()

    return (
        <span>
            <span className={'panel-header-icon'}>
                <FontAwesomeIcon icon={icon} />
            </span>
            <span>
                {title}
            </span>
        </span>
    )
}

export default PanelHeader