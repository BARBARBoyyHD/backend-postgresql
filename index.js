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
        const {id}=req.params
        const findItem = await pool.query("SELECT * FROM item_list WHERE item_id = $1", [id]);
        res.json(findItem.rows[0]);
    } catch (error) {   
        res.json({ error: error.message });
        res.status(404).json("Item not found");
    }
})

// delete items
// app.delete("/api/:id", async (req, res) => {
//     try {
//         const 
//     } catch (error) {
//         console.log(error);
//     }
// })

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
