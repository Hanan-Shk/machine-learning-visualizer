import { useEffect, useState } from 'react';

import CoordinatesMetrics from './coordinates-metrics/coordinates-metrics';
import CoordinatesTabs from './coordinate-tabs/coordinate-tabs';
import CoordinatesPlane from './coordinates-plane/coordinates-plane';
import ControlPlane from './control-plane/control-plane';

import style from './logistic-regression.module.sass';
import GradientPlane from './gradient-plane/gradient-plane';

const LogisticRegression = () => {

    const [algorithmData, setAlgorithmData] = useState({
        loss_hist: [],
        eta: 0.0001,
    });
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {    
        return () => {
            setAlgorithmData({});
            setSelectedTab(0);
        };
    }, []);

    return (
        <div
        className={style.container}
        id='logistic-regression'
        >
            <CoordinatesMetrics
            algorithmData={algorithmData}
            ></CoordinatesMetrics>
            <CoordinatesTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            ></CoordinatesTabs>
            <CoordinatesPlane
            selectedTabIndex={selectedTab}
            ></CoordinatesPlane>
            <GradientPlane
            selectedTabIndex={selectedTab}
            ></GradientPlane>
            <ControlPlane
            setAlgorithmData={setAlgorithmData}
            ></ControlPlane>
        </div>
    )
}


export default LogisticRegression;