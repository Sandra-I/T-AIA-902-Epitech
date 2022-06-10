import { Field } from 'formik';
import { ReactElement } from 'react'
import './Slider.scss';

const AppNumberSlider: React.FC<{
    min: number,
    max: number,
    formKey: string,
    divideBy?: number,
    children: React.ReactNode,
    handleChange: any,
    value: number,
    setFieldValue: (id: string, value: number) => void
}> = ({ min, max, divideBy = 1, formKey, children, handleChange, value, setFieldValue }): ReactElement => {

    const changeValue = (amount: -1 | 1): void => {
        setFieldValue(formKey, value + amount);
    }

    return (
        <div className="slider_container">
            <label htmlFor='formKey'>{children} <br />({value / divideBy})</label>
            <div className="range_container">
                <button onClick={() => changeValue(-1)}><p>-</p></button>
                <Field type="range" id={formKey} min={min} max={max} className="slider" onChange={handleChange} value={value} />
                <button onClick={() => changeValue(1)}><p style={{marginTop: 2}}>+</p></button>
            </div>
        </div>
    );
}

export default AppNumberSlider