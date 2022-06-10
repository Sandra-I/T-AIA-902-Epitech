import { ReactElement, useEffect, useState } from 'react'
import './Switch.scss';

const AppSwitch: React.FC<{ setCustom: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setCustom }): ReactElement => {
    const [on, setOn] = useState(false);

    useEffect(() => setCustom(on), [on])

    const onInputClick = (input: HTMLInputElement): void => {
        setOn(input.checked)
    }

    return (
        <div style={{ display: "flex", width: 250, justifyContent: 'space-between'}}>
            OPTIMIZED
            <div className="switch_container">
                <label htmlFor="switch" className={"switch_label " + (on ? "on" : "")} >
                    <div className="switch_visual" />
                    <input id="switch" type="checkbox" onClick={(e) => onInputClick(e.target as HTMLInputElement)} />
                </label>
            </div>
            CUSTOM
        </div>
    );
}

export default AppSwitch;
