import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import Labels from './Labels';
import { chartData, getCurrentAmount } from '../calculations/calculate';
import {default as api} from '../stores/apiSlice';

Chart.register(ArcElement);


export default function Graph() {

  const {data, isFetching, isSuccess, isError} = api.useGetLabelsQuery();
  let graphData;

  if(isFetching) {
    graphData = <div>Fetching...</div>;
  }
  if(isSuccess) {
    graphData = <Doughnut {...chartData(data)}></Doughnut>;
  }
  else if(isError) {
    graphData = <div>Error</div>
  }

  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
            {graphData}
          <h3 className="mb-4 font-bold title">Current Balance
          <span className="block text-2xl text-emerald-500">₹{getCurrentAmount(data) ?? 0}</span>
          </h3>
        </div>
       

        <div className="flex flex-col py-10 gap-4">
          {/* Labels */}
          <Labels></Labels>
        </div>
      </div>
    </div>
  )
}
