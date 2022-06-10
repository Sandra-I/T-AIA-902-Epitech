import './Loading.scss';
import { ReactElement } from 'react'

const AppLoading: React.FC = (): ReactElement => {
    return (
        <div style={{display: "flex"}}>
            {/* <div className="loading" /> */}
            <div className="car_loading" style={{display: 'flex'}}>
                <img src="taxi.png" style={{margin: 'auto', height: 200}} />
            </div>
        </div>
    );
}

export default AppLoading