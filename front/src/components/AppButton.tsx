import { ReactElement } from 'react'
import './Button.scss'
const AppButton: React.FC<{
    onClick(event: any): void,
    disabled: boolean,
    label: string
}> = ({ onClick, disabled, label }): ReactElement => {
    return (<button type="button" onClick={onClick} disabled={disabled}>{label}</button>);
}

export default AppButton