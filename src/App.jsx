import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSystemSecured, setIsSystemSecured] = useState(true);
  const [alertCount, setAlertCount] = useState(3);
  const [lastEventTime, setLastEventTime] = useState('10:42 AM');
  
  const [motionLogs, setMotionLogs] = useState([
    { id: 1, time: '13:45', detected: 'Yes', status: 'Sent', variant: 'success' },
    { id: 2, time: '12:21', detected: 'Yes', status: 'Sent', variant: 'success' },
    { id: 3, time: '10:42', detected: 'Yes', status: 'Failed', variant: 'danger' },
    { id: 4, time: '08:46', detected: 'No', status: 'Failed', variant: 'danger' },
  ]);

  const handleTriggerAlarm = () => {
    setIsSystemSecured(false);
    setAlertCount(prev => prev + 1);
    const now = new Date();
    const currentTimeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastEventTime(currentTimeString);

    const newLog = {
      id: Date.now(),
      time: currentTimeString,
      detected: 'MANUAL TRIGGER',
      status: 'Sent',
      variant: 'success'
    };
    setMotionLogs([newLog, ...motionLogs]);
    alert("⚠️ EMERGENCY ALARM ACTIVATED!");
  };

  return (
    // "container-fluid p-0" makes the website span the full width of any screen
    <div className="container-fluid p-0" style={{ fontFamily: 'sans-serif' }}>
      <div className="row g-0 flex-column flex-md-row" style={{ minHeight: '100vh' }}>
        
        {/* RESPONSIVE SIDEBAR: full width on mobile, 250px columns on desktop */}
        <div className="col-12 col-md-auto text-white p-4" style={{ width: '100%', maxWidth: '250px', backgroundColor: '#1e293b' }}>
          <h3 className="m-0" style={{ fontSize: '24px' }}>NexusShield</h3>
          <p style={{ opacity: 0.6, fontSize: '12px', marginBottom: '20px' }}>Internet of Things System</p>
          
          {/* Flex row on mobile (horizontal menu), stacked list on desktop */}
          <ul className="d-flex flex-row flex-md-column gap-2 list-unstyled p-0 m-0 overflow-auto">
            <li onClick={() => setActiveTab('dashboard')} style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#334155' : 'transparent', borderRadius: '6px', whiteSpace: 'nowrap' }}>📊 Home</li>
            <li onClick={() => setActiveTab('logs')} style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: activeTab === 'logs' ? '#334155' : 'transparent', borderRadius: '6px', whiteSpace: 'nowrap' }}>📋 Logs</li>
            <li onClick={() => setActiveTab('liveview')} style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: activeTab === 'liveview' ? '#334155' : 'transparent', borderRadius: '6px', whiteSpace: 'nowrap' }}>📹 Live</li>
            <li onClick={() => setActiveTab('settings')} style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: activeTab === 'settings' ? '#334155' : 'transparent', borderRadius: '6px', whiteSpace: 'nowrap' }}>⚙️ Settings</li>
          </ul>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="col p-4 p-md-5" style={{ backgroundColor: '#f8fafc' }}>
          
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="mb-4">Dashboard</h1>
              {isSystemSecured ? (
                <div className="badge bg-success p-2 mb-4" style={{ fontSize: '14px' }}>System Status: Online</div>
              ) : (
                <div className="badge bg-danger p-2 mb-4" style={{ fontSize: '14px' }}>🔴 BREACH DETECTED</div>
              )}
              
              {/* Bootstrap grid "row-cols-1 row-cols-lg-2" splits boxes side-by-side on desktop, stacks them on mobile */}
              <div className="row row-cols-1 row-cols-lg-2 g-4 mt-2">
                <div className="col">
                  <div className="card p-4 shadow-sm bg-white mb-4">
                    <h5 className="text-secondary">Last Motion Event</h5>
                    <h4 className="mt-2" style={{ color: '#334155' }}>Motion at {lastEventTime}</h4>
                  </div>
                  <div className="card p-4 shadow-sm bg-white" style={{ maxWidth: '250px' }}>
                    <h5 className="text-secondary">Today's Alerts</h5>
                    <h1 className="display-3 text-danger font-weight-bold m-0">{alertCount}</h1>
                  </div>
                  {!isSystemSecured && (
                    <button className="btn btn-success mt-3 w-100" onClick={() => setIsSystemSecured(true)}>Clear Alarm</button>
                  )}
                </div>
                
                <div className="col">
                  <div className="card p-4 shadow-sm bg-white h-100">
                    <h5>Live Camera</h5>
                    <div style={{ backgroundColor: isSystemSecured ? '#e2e8f0' : '#fca5a5', height: '220px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
                      <p className={isSystemSecured ? 'text-muted' : 'text-danger fw-bold'}>
                        {isSystemSecured ? '[Camera Placeholder Feed]' : '⚠️ VISUAL ALERT RUNNING'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <h1 className="mb-4">Motion Logs</h1>
              <div className="table-responsive"> {/* "table-responsive" lets the table scroll horizontally nicely on tiny phone displays */}
                <table className="table table-striped table-hover bg-white shadow-sm rounded border">
                  <thead className="table-dark">
                    <tr>
                      <th>Timestamp</th>
                      <th>Motion Detected</th>
                      <th>Image</th>
                      <th>Alert Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {motionLogs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.time}</td>
                        <td className={log.detected === 'No' ? 'text-secondary' : 'text-danger fw-bold'}>{log.detected}</td>
                        <td>[Image]</td>
                        <td><span className={`badge bg-${log.variant}`}>{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'liveview' && (
            <div>
              <h1 className="mb-4">Live Camera</h1>
              <div className="card p-4 shadow-sm bg-white text-center">
                <div style={{ backgroundColor: isSystemSecured ? '#cbd5e1' : '#fca5a5', minHeight: '300px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <h3 className="text-secondary">{isSystemSecured ? 'Live Feed Stream Placeholder' : '🚨 RECORDING BREACH'}</h3>
                </div>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                  <button className="btn btn-danger btn-lg" onClick={handleTriggerAlarm}>Activate Alarm</button>
                  <button className="btn btn-secondary btn-lg">Refresh Feed</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="mb-4">Settings</h1>
              <div className="card p-4 shadow-sm bg-white" style={{ maxWidth: '500px' }}>
                <div className="mb-4">
                  <label className="form-label fw-bold">PIR Sensitivity</label>
                  <input type="range" className="form-range" min="1" max="10" defaultValue="5" />
                </div>
                <div className="form-check form-switch mb-4">
                  <input className="form-check-input" type="checkbox" id="notiSwitch" defaultChecked />
                  <label className="form-check-label fw-bold" htmlFor="notiSwitch">Enable Phone Notifications</label>
                </div>
                <hr />
                <p><strong>Wi-Fi Status:</strong> <span className="text-success fw-bold">Connected</span></p>
                <p><strong>Cloud Status:</strong> <span className="text-success fw-bold">Registered Device</span></p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;