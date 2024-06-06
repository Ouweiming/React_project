import React, { useEffect, useRef, useState } from 'react';
import { Chart } from '@antv/g2';
import './index.css';

export default function G2Chart() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/blood_filtered.json') 
      .then((response) => response.json())
      .then((data) => {
        const sampledData = sampleData(data,1500); // 对数据进行采样，数据太多卡到飞起 ：（
        setData(sampledData);
      });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (data.length > 0 && chartContainerRef.current) {
      if (!chartRef.current) {
        chartRef.current = renderChart(chartContainerRef.current, data);
      } else {
        chartRef.current.changeData(data);
      }
    }
  }, [data]);

  function sampleData(data, sampleSize) {
    const step = Math.floor(data.length / sampleSize);
    return data.filter((_, index) => index % step === 0);
  }

  function renderChart(container, data) {
    const chart = new Chart({
      container,
      height: 520,
      width: 1300,
    });

    chart
      .point()
      .data(data)
      .transform({ type: 'stackY', y1: 'hemoglobin' })
      .encode('x', 'age')
      .encode('y', (d) => (d.sex === 'Women' ? -1 : 1))
      .encode('color', 'sex',)
      .scale('color', { type: 'ordinal', range: ['#FF6666', '#0099CC'] })
      .encode('shape', 'point')
      .slider('y', true)
      .slider('x', true)
      .scale('x', { nice: true })
      .axis('y', {
        title: 'Women <- Hemoglobin -> Men', 
        titleFontSize:18,
        titleFill:'pink',
        titleFillOpacity:50,
        titleStroke:' #880808',
        label:true,
        labelFill:"#666666",
        tickStroke:"#666666",
       
        
        labelFormatter: (d) => `${Math.abs(+d)}`,
       
      })
      .axis('x', { 
        title: 'Age ->' ,
        titleFontSize:20,
        titleFill:'white',
        titleFillOpacity:50,
        titleStroke:'#0099CC',
        label:true,
        labelFill:"#666666",
        tickStroke:"#666666",

    
      })

      .legend('color', {
        title: 'Sex',
        position: 'top',
        itemLabelFill:'#666666',
      })
      .tooltip({ showMarkers: false });
      

    chart.lineY().data([0]).style('stroke', 'black'); // 添加基准线
    chart.title('Hemoglobin content',{titleFontSize:18,
      titleFill:'pink',
      titleFillOpacity:50,
      });
    
    chart.render();
    
    return chart;
  }

  return <div ref={chartContainerRef}></div>;
}
