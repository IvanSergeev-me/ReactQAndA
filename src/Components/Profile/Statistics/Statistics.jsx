import React from "react";
import { NavLink } from "react-router-dom";
import s from "../Profile.module.css";
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { ReactChart } from 'chartjs-react';
  import { Line } from 'react-chartjs-2';
  
  // Register modules,
  // this example for time scale and linear scale
  ReactChart.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);
  
  // options of chart similar to v2 with a few changes
  // https://www.chartjs.org/docs/next/getting-started/v3-migration/
  const chartOption = {
    responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Просмотры ваших вопросов',
            },
        },
        
  };
  
  // data of chart similar to v2, check the migration guide
  const labels = ['Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь'];
  const chartData = {
    labels,
    datasets: [
        {
          label: 'Просмотры',
          data: [153, 20 , 46, 491, 22, 11, 15],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
  };
  
  const BarChart = () => {
    return (
        <div className={s.profile__statisctics}>
            <div className={s.statistics__button_container}><NavLink to={"/Profile/Settings"} className={s.statistics__button_small}>Свернуть</NavLink></div>
            <Line options={chartOption} data={chartData} className={s.statistics__chart}/>
      </div>
    );
  };
export default BarChart;