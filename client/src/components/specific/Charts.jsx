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
import { BorderColor, OfflineShareTwoTone } from '@mui/icons-material';
import { purple, purpleLight } from '../constants/color';
import { getLast7Days } from '../../lib/features';

ChartJs.register(
    CategoryScale,
    Tooltip,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
);

const labels = getLast7Days()

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
       labels ,
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


const doughnutChartOptions = {
    responsive : true,
    plugins : {
        legend : {
            display : false,
        },
        // title : {
        //     display : false,
        // }
    },
    cutout : 120,
    
}

 const DoughnutChart = ({value = [], labels = []}) => {
    
    const data = {
        labels ,
        datasets : [
         {
         data : value,
        //  label : 'Total Chats vs Group Charts',
         
         backgroundColor : [purpleLight, orangeLight],
         hoverBackgroundColor : [purple, orange],
         borderColor : [purple, orange],
         Offset : 40,
        },
         
     ]
    }


  return (
    <Doughnut 
    style={{zIndex : 10}}
    data={data} 
    options={doughnutChartOptions}/>
  )
}

export {LineChart, DoughnutChart}

