import React, { useEffect, useState } from "react";

export default function WarehouseInventory() {
  const [items, setItems] = useState([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock fetch (local data)
  const fetchInventory = () => {
    return [
      { id: 1, name: "Boxes", stock: 5, threshold: 10 },
      { id: 2, name: "Bubble Wrap", stock: 15, threshold: 20 },
      { id: 3, name: "Packing Tape", stock: 50, threshold: 30 },
      { id: 4, name: "pen",stock:30, threshold:17},
      { id: 5, name: "Oil",stock:20, threshold:14}
    ];
  };
  
  useEffect(() => {
    setItems(fetchInventory());
    if (autoRefresh) {
      const interval = setInterval(() => setItems(fetchInventory()), 5000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const updateStock = (id, delta) => {
    setItems(items.map(it =>
      it.id === id ? { ...it, stock: Math.max(0, it.stock + delta) } : it
    ));
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>📦 Warehouse Inventory</h2>
      <label>
        <input
          type="checkbox"
          checked={autoRefresh}
          onChange={() => setAutoRefresh(!autoRefresh)}
        /> Auto Refresh
      </label>
      <table border="1" cellPadding="8" style={{ marginTop: 10, width: "100%" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Stock</th>
            <th>Threshold</th>
            <th>Alert</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id} style={{ background: it.stock < it.threshold ? "#e91212ff" : "" }}>
              <td>{it.name}</td>
              <td>{it.stock}</td>
              <td>{it.threshold}</td>
              <td>{it.stock < it.threshold ? "⚠ Low Stock" : ""}</td>
              <td>
                <button onClick={() => updateStock(it.id, -1)}>-</button>
                <button onClick={() => updateStock(it.id, +1)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

