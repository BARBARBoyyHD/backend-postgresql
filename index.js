const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 5000;

app.use(cors());
app.use(express.json());

// get all items
app.get("/api", async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM item_list");
    res.json(allItems.rows);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});

// add items
app.post("/api", async (req, res) => {
  try {
    const { item_name, item_description, item_price, item_quantity } = req.body;
    const newItem = await pool.query(
      "INSERT INTO item_list(item_name,item_description,item_price,item_quantity) VALUES($1,$2,$3,$4) RETURNING *",
      [item_name, item_description, item_price, item_quantity]
    );
    res.json("Data added successfully");
    res.status(200).json(newItems.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// get single todo
app.get("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findItem = await pool.query(
      "SELECT * FROM item_list WHERE item_id = $1",
      [id]
    );
    res.json(findItem.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
    res.status(404).json("Item not found");
  }
});

// delete items
app.delete("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItems = await pool.query(
      "DELETE FROM item_list WHERE item_id = $1",
      [id]
    );
    res.json("Item deleted successfully");
  } catch (error) {
    console.log(error);
  }
});

// Edit items
app.put("/api/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, item_description, item_price, item_quantity } = req.body;
    await pool.query(
      "UPDATE item_list SET item_name = $1, item_description = $2, item_price = $3, item_quantity = $4 WHERE item_id = $5",
      [item_name, item_description, item_price, item_quantity, id]
    );
    res.status(200).json("item was updated successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while updating the items");
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
