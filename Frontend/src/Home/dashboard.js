import "./Dashboard.css";

function Dashboard() {
  
  
  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard</h2>
      <div className="cards">
        <div className="card card-products">
          <h3>Products</h3>
          <p>50</p>
        </div>

        <div className="card card-categories">
          <h3>Revenue</h3>
          <p>50</p>
        </div>

        <div className="card card-categories">
          <h3>Customers</h3>
          <p>50</p>
        </div>

        <div className="card card-categories">
          <h3>Orders</h3>
          <p>50</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
