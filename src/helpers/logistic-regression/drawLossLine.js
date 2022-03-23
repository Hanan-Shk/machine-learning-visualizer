import { axisBottom, axisLeft, scaleLinear, select } from "d3";
import clearLossLines from "./clearLossLines";

import { shifter } from "./initializeCoordinatePlaneGraph";

export const scaleNumber = (x, xMin, xMax, a, b) => ((b - a) * (x - xMin) / (xMax - xMin)) + a;

export const scaleNumbers = (list, rMin, rMax, tMin, tMax) => {
    const scaledList = list.map(number => {
        return ({
            y1: (((number.y1 - rMin) / (rMax - rMin) * (tMax - tMin)) + tMin),
            y2: (((number.y2 - rMin) / (rMax - rMin) * (tMax - tMin)) + tMin),
            x1: number.x1,
            x2: number.x2,
        })
    })
    return scaledList;
}

const drawLossLine = (lossLineDimensions) => {
    
    const containerWidth = document.querySelector('#loss-plane').clientWidth;
    const containerHeight = document.querySelector('#loss-plane').clientHeight;

    const lossPlaneSvg = select('#loss-plane-svg');
    const lossPlaneXAxis = select('#loss-plane-x-axis');
    const lossPlaneYAxis = select('#loss-plane-y-axis');

    const yMax = Math.max(...lossLineDimensions.map(loss => loss.y1))
    const yMin = Math.min(...lossLineDimensions.map(loss => loss.y2))
    const xMax2 = Math.max(...lossLineDimensions.map(loss => loss.x2))

    const xScaler = scaleLinear()
        .range([shifter, containerWidth - shifter])
        .domain([0, xMax2])

    const yScaler = scaleLinear()
        .range([containerHeight - (shifter * 2), 0])
        .domain([yMin, yMax]);
    
    lossPlaneXAxis.call(axisBottom(xScaler))
    lossPlaneYAxis.call(axisLeft(yScaler))

    // if ( lossPlaneSvg.selectAll('.loss-line').empty() ) {
        lossPlaneSvg
            .selectAll('.loss-line')
            .data(lossLineDimensions)
            .enter()
            .append('line')
            .attr('class', 'loss-line')
            .attr('x1', d => shifter + (d.x1 * ((containerWidth - (shifter * 2)) / lossLineDimensions.length)))
            .attr('x2', d => shifter + (d.x2 * ((containerWidth - (shifter * 2)) / lossLineDimensions.length)))
            .attr('y1', d => scaleNumber(d.y1, yMin, yMax, yMin, yMax) * containerHeight)
            .attr('y2', d => scaleNumber(d.y2, yMin, yMax, yMin, yMax) * containerHeight)
            .attr('stroke', 'rgb(90, 141, 169)')
            .attr('stroke-width', '2px')
    // } else {
    //     console.log(lossLineDimensions);
    //     lossPlaneSvg
    //         .selectAll('.loss-line')
    //         .data(lossLineDimensions)
    //         .enter()
    //         .append('line')
    //         .attr('class', 'loss-line')
    //         .attr('x1', d => (d.x1 * 200) + shifter)
    //         .attr('x2', d => (d.x2 * 200) + shifter)
    //         .attr('y1', d => scaleNumber(d.y1, yMin, yMax, yMin, yMax) * containerHeight)
    //         .attr('y2', d => scaleNumber(d.y2, yMin, yMax, yMin, yMax) * containerHeight)
    //         .attr('stroke', 'rgb(90, 141, 169)')
    //         .attr('stroke-width', '2px')
    // }


    // return gradientPlaneSvg;
}

export default drawLossLine;