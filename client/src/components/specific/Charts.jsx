import React from 'react';
import {Line , Doughnut} from 'react-chartjs-2'
import {
    CategoryScale,
    Chart as ChartJs,
    Tooltip,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    plugins,
    scales
} from 'chart.js';
import { BorderColor } from '@mui/icons-material';
import { purple, purpleLight } from '../constants/color';

ChartJs.register(
    CategoryScale,
    Tooltip,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
);

 const linerChartOptions =  {
    responsive : true,
    plugins : {
        legend : {
            display : false,
        }
    },
    title : {
        display : false
    },
    scales : {
        x:{
            grid : {
                display : false,   // to remove gride
            }
        },
        y : {
            beginAtZero : true,
            grid : {
                display : false,   // to remove gride
            }
        }
    }
 }

 const LineChart = ({value = []}) => {

    const data = {
       labels : ['january', 'Febuary', 'March', "April", "May", "June", "July"],
       datasets : [
        {
        data : value,
        label : 'Revenue',
        fill : true,
        backgroundColor : purpleLight,
        borderColor : purple,
       },
        
    ]
    }

  return (
    <Line data={data} options={linerChartOptions}/>
  )
}
 const DoughnutChart = () => {
  return (
    <div>Charts</div>
  )
}

export {LineChart, DoughnutChart}

