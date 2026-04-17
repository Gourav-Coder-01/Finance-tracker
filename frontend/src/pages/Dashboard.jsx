import React from "react";

const Dashboard = () => {
  return (
    <div>
      {/* selection section------------------------------------------------- */}
      <div className="flex justify-end">
        <select className="outline-none">
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      {/* selection section------------------------------------------------- */}

      

    </div>
  );
};

export default Dashboard;
