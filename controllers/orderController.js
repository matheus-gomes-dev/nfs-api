// In-memory data store (for demonstration purposes)
let orders = [];
let nextId = 1;

const createOrder = (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const newOrder = { id: nextId++, name, description };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

const getOrders = (req, res) => {
  res.json(orders);
};

const getOrderById = (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
};

const updateOrder = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const orderIndex = orders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  orders[orderIndex] = { id, name, description };
  res.json(orders[orderIndex]);
};

const deleteOrder = (req, res) => {
  const id = parseInt(req.params.id);
  const orderIndex = orders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  const deletedOrder = orders.splice(orderIndex, 1);
  res.json(deletedOrder[0]);
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};