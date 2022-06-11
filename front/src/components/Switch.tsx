import { ReactElement, useEffect, useState } from 'react'
import './Switch.scss';

const AppSwitch: React.FC<{ setCustom(value: boolean): void }> = ({ setCustom }): ReactElement => {
    const [on, setOn] = useState(false);

    useEffect(() => setCustom(on), [on])

    const onInputClick = (input: HTMLInputElement): void => {
        setOn(input.checked)
    }

    return (
        <div style={{ display: "flex", width: 250, justifyContent: 'space-between', margin: 'auto'}}>
            <span style={{cursor: "pointer"}} onClick={() => setOn(false)}>OPTIMIZED</span>
            <div className="switch_container">
                <label htmlFor="switch" className={"switch_label " + (on ? "on" : "")} >
                    <div className="switch_visual" />
                    <input id="switch" checked={on} type="checkbox" onChange={(e) => onInputClick(e.target as HTMLInputElement)} />
                </label>
            </div>
            <span style={{cursor: "pointer"}} onClick={() => setOn(true)}>CUSTOM</span>
        </div>
    );
}

export default AppSwitch;
