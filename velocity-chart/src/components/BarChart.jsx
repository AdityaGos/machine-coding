// create a rectangle box
// have x-axis and y-axis
// each data item maps to a bar 

import React from 'react'

const BarChart = ({data}) => {
  return (
        <div className="chart-container">
            <div className="chart"></div>
                <div className='y-axis-label'>Number of tickets</div>
                <div  className='x-axis-label'>Department</div>
            
        </div>
  )
}

export default BarChart