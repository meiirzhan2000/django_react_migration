import React, { useState, useEffect } from 'react';
import {
  Button,
  Spinner,
  Card,
  Badge,
  ListGroup,
  Alert,
  Tabs,
  Tab,
  Form
} from 'react-bootstrap';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jqueryData, setJqueryData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('fetch');

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
      const response = window.jQueryFunction('Hello from React! This message is sent from the React component to the jQuery function.');
      console.log('jQuery response:', response);
    } else {
      console.error('jQuery function not available');
    }
  };

  // Handle item selection
  const handleItemSelect = (item) => {
    setSelectedItem(item);
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
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
        fill
      >
        <Tab eventKey="fetch" title="Fetch Data">
          <div className="d-grid gap-2 d-md-flex mb-3">
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
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading data...</p>
            </div>
          ) : (
            <div>
              {items.length > 0 && (
                <div>
                  <h5 className="border-bottom pb-2 mb-3">Data loaded with React:</h5>
                  <ListGroup>
                    {items.map(item => (
                      <ListGroup.Item
                        key={item.id}
                        action
                        onClick={() => handleItemSelect(item)}
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{item.name}</div>
                          {item.description}
                        </div>
                        <Badge bg="primary" pill>ID: {item.id}</Badge>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}

              {selectedItem && (
                <Card className="mt-4">
                  <Card.Header>Selected Item Details</Card.Header>
                  <Card.Body>
                    <Card.Title>{selectedItem.name}</Card.Title>
                    <Card.Text>{selectedItem.description}</Card.Text>
                    <Button size="sm" variant="secondary" onClick={() => setSelectedItem(null)}>
                      Close Details
                    </Button>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </Tab>

        <Tab eventKey="jquery" title="jQuery Data">
          {jqueryData ? (
            <div>
              <Alert variant="info">
                <Alert.Heading>Data loaded by jQuery (detected in React)</Alert.Heading>
                <p>React has detected that jQuery has loaded data from the API.</p>
              </Alert>

              <Card bg="light">
                <Card.Header>JSON Data</Card.Header>
                <Card.Body>
                  <pre>{JSON.stringify(jqueryData, null, 2)}</pre>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <Alert variant="secondary">
              <p className="mb-0">No data loaded by jQuery yet. Click the "Load Data with jQuery" button in the jQuery section.</p>
            </Alert>
          )}
        </Tab>

        <Tab eventKey="form" title="Form Example">
          <Card>
            <Card.Header>React Bootstrap Form Example</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;