// create a rectangle box
// have x-axis and y-axis
// each data item maps to a bar

import React, { useMemo } from "react";
import {motion } from 'framer-motion'
const Bar = ({ name, height,ticket, colour }) => {
  return (
    <motion.div
      className="bar"
      initial={{height:0}}
      animate={{height:`${height}%`}}
      exit={{height:0}}
      style={{ backgroundColor: colour, height: `${height}%` }}
    >

      <div className="tooltip">
        {name} -{ticket}
      </div>
    </motion.div>
  );
};
const BarChart = ({ data }) => {
  const maxTicketCount = useMemo(() => {
    return Math.max(...data.map((item) => item.ticket));
  }, []);

  return (
    <div className="chart-container">
      <div className="chart">
        {data.map((item) => {
          return (
            <Bar
            name={item.name}
              height={(item.ticket / maxTicketCount) * 100}
              colour={item.color}
              ticket={item.ticket}
            />
          );
        })}
      </div>

      <div className="y-axis-label">Number of tickets</div>
      <div className="x-axis-label">Department</div>
    </div>
  );
};

export default BarChart;
