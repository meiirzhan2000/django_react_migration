// static/js/react/components/App.js
import React, { useState, useEffect } from 'react';
// Import individual components (preferred method)
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

// Import the Bootstrap CSS directly
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jqueryData, setJqueryData] = useState(null);

  // Function to fetch data directly from React
  const fetchData = () => {
    setLoading(true);
    fetch('/api/data/')
      .then(response => response.json())
      .then(data => {
        setItems(data.items);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  // Call jQuery function from React
  const callJQueryFunction = () => {
    if (window.jQueryFunction) {
      const response = window.jQueryFunction('Hello from React!');
      console.log('jQuery response:', response);
    } else {
      console.error('jQuery function not available');
    }
  };

  // Listen for jQuery custom events
  useEffect(() => {
    const handleJQueryDataLoaded = (event, data) => {
      console.log('jQuery loaded data detected in React:', data);
      setJqueryData(data);
    };

    // Add event listener
    $(document).on('jqueryDataLoaded', handleJQueryDataLoaded);

    // Clean up
    return () => {
      $(document).off('jqueryDataLoaded', handleJQueryDataLoaded);
    };
  }, []);

  return (
    <div className="react-container">
      {/* CRITICAL: Use React-Bootstrap Button components, NOT regular HTML buttons */}
      <div className="d-flex gap-2 mb-3">
        <Button variant="primary" onClick={fetchData} disabled={loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="ms-2">Loading...</span>
            </>
          ) : (
            'Load Data with React'
          )}
        </Button>
        <Button variant="outline-primary" onClick={callJQueryFunction}>
          Call jQuery Function
        </Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading data...</p>
        </div>
      ) : (
        <div>
          {items.length > 0 && (
            <div>
              <h5>Data loaded with React:</h5>
              <ListGroup>
                {items.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <p className="text-muted mb-0">{item.description}</p>
                    </div>
                    <Badge bg="primary" pill>
                      {item.id}
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}

          {jqueryData && (
            <div className="mt-4">
              <h5>Data loaded by jQuery (detected in React):</h5>
              <Card className="bg-light">
                <Card.Body>
                  <pre>{JSON.stringify(jqueryData, null, 2)}</pre>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;