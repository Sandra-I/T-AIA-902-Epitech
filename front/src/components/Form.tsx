import { ReactElement, useState } from 'react'
import AppNumberSlider from './NumberSlider';
import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import "./Form.scss"
import AppSwitch from './Switch';
import AppButton from './AppButton';
import './Button.scss'

const url = "";

type FormType = {
    nb_episodes: number;
    max_steps_per_episode: number;
    learning_rate: number;
    discount_rate: number;
    exploration_rate: number;
    max_exploration_rate: number;
    min_exploration_rate: number;
    exploration_decay_rate: number;
}



const inputs: { min: number, max: number, divideBy?: number, key: keyof FormType, label: string }[] = [
    { min: 0, max: 100000, key: "nb_episodes", label: "Number of Episodes" },
    { min: 0, max: 200, label: "Max steps per episodes", key: "max_steps_per_episode" },
    { min: 0, max: 100, divideBy: 100, label: "Learning rate", key: "learning_rate" },
    { min: 0, max: 200, divideBy: 100, label: "Discount rate", key: "discount_rate" },
    { min: 0, max: 100, divideBy: 100, label: "Min exploration rate", key: "min_exploration_rate" },
    { min: 0, max: 100, divideBy: 100, label: "Max exploration rate", key: "max_exploration_rate" },
    { min: 0, max: 100, divideBy: 100, label: "Exploration rate", key: "exploration_rate" },
    { min: 0, max: 100, divideBy: 100, label: "Exploration decay rate", key: "exploration_decay_rate" },
]

const AppForm: React.FC<{
    setChartData(value: number[]): void,
    setLoading(value: boolean): void
}> = ({ setChartData, setLoading }): ReactElement => {
    const [custom, setCustom] = useState(false)

    const formDefault = {
        nb_episodes: 10000,
        max_steps_per_episode: 100,
        learning_rate: 0.81 * 100,
        discount_rate: 0.96 * 100,
        exploration_rate: 1,
        max_exploration_rate: 1,
        min_exploration_rate: 0.01 * 100,
        exploration_decay_rate: 0.01 * 100
    };

    const validationSchema = yup.object({
        nb_episodes: yup.number().required("Ce champ est requis"),
        max_steps_per_episode: yup.number().required("Ce champ est requis"),
        learning_rate: yup.number().required("Ce champ est requis"),
        discount_rate: yup.number().required("Ce champ est requis"),
        exploration_rate: yup.number().required("Ce champ est requis"),
        max_exploration_rate: yup.number().required("Ce champ est requis"),
        min_exploration_rate: yup.number().required("Ce champ est requis"),
        exploration_decay_rate: yup.number().required("Ce champ est requis")
    });

    const changeCustomValue = (value: boolean, resetForm: Function): void => {
        setCustom(value);
        resetForm();
    }

    const onSubmit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
        setLoading(true);
        send(transformValues(custom ? values : formDefault)).then(res => {
            setChartData(res.data)
            setLoading(false);
            setSubmitting(false);
        }).catch(() => setSubmitting(false))
    }

    // const send = (values: FormType) => axios.post(url, values);

    const send = (values: any) => Promise.resolve({data: [-45.875999999999806, 7.417999999999967, 7.436999999999962, 7.495999999999964, 7.473999999999956, 7.439999999999961, 7.418999999999969, 7.576999999999961, 7.48499999999996, 7.468999999999962]})
    const transformValues = (values: FormType): FormType => {
        const newValues: Partial<FormType> = {};
        for (const key in values) {
            const input = inputs.find(input => input.key === key)!;
            newValues[key as keyof FormType] = values[key as keyof FormType] / (input.divideBy || 1);
        }
        return newValues as FormType
    }

    return (
        <div className="form_container">
            <Formik initialValues={formDefault} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleChange, values, handleSubmit, isSubmitting, isValid, setFieldValue, resetForm }) => (
                    <><AppSwitch setCustom={(value: boolean) => changeCustomValue(value, resetForm)} />
                        <div id="form_content">
                            <Form style={{ opacity: custom ? 1 : 0.7, pointerEvents: custom ? "all" : "none" }}>
                                {inputs.map(input => (
                                    <AppNumberSlider
                                        key={input.key}
                                        min={input.min}
                                        max={input.max}
                                        divideBy={input.divideBy}
                                        formKey={input.key}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue}
                                        value={values[input.key]}  >
                                        {input.label}
                                    </AppNumberSlider>
                                ))}
                            </Form>
                            <AppButton onClick={() => handleSubmit()} disabled={(custom && !isValid) || isSubmitting} label="Submit"/>
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
}

export default AppForm