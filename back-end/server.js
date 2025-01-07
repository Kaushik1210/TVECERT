const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const nodemailer = require("nodemailer");
require("dotenv").config();



const app = express();
const port = 5000;

const url = "mongodb://localhost:27017/tvecertData";
const client = new MongoClient(url);

// Create an HTTP server
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());

// Temporary storage for OTPs
const otpStore = {};

console.log("Email User:", process.env.EMAIL_USER);



// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  },
});

// Handle client connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//////// C E R T I F I C A T E S    U P D A T E S ////////
app.get("/data/certificationInfo/certificateInfo", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("certificateInfo");

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data from MongoDB");
  }
});

app.post("/data/certificationInfo/certificateInfo", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("certificateInfo");
    const newData = req.body;

    const result = await collection.insertOne(newData);

    // Emit an event to notify all clients about the new data
    io.emit("newData", { ...newData, id: result.insertedId });

    res.status(201).json({
      message: "Data inserted successfully",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data into MongoDB");
  }
});

app.delete("/data/certificationInfo/certificateInfo", async (req, res) => {
  const { ids } = req.body; // Expecting an array of `_id` values in the request body

  // Validate the input
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Invalid request: 'ids' must be a non-empty array" });
  }

  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("certificateInfo");

    // Convert provided ids to MongoDB ObjectId
    const objectIds = ids.map((id) => {
      if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ID format: ${id}`);
      }
      return new ObjectId(id);
    });

    // Attempt to delete documents with matching _id values
    const result = await collection.deleteMany({ _id: { $in: objectIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No records found to delete" });
    }

    // Respond with success
    res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} record(s)`,
    });
  } catch (error) {
    console.error("Error deleting records:", error);
    res.status(500).json({
      message: "Failed to delete records due to an internal error",
      error: error.message,
    });
  }
});










//////// D E L E G A T E S    U P D A T E S ////////

app.get("/data/certificationInfo/delegatesInfo", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("delegatesInfo");

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Error fetching data from MongoDB");
  }
});

app.post("/data/certificationInfo/delegatesInfo", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("delegatesInfo");
    const newData = req.body;

    const result = await collection.insertOne(newData);

    // Emit an event to notify all clients about the new data
    io.emit("newData", { ...newData, id: result.insertedId });

    res.status(201).send(
      `Data inserted into certificationInfo/certificateInfo with id: ${result.insertedId}`
    );
  } catch (err) {
    res.status(500).send("Error inserting data into MongoDB");
  }
});

app.delete("/data/certificationInfo/delegatesInfo", async (req, res) => {
  try {
    const { ids } = req.body; // Array of IDs to delete
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("delegatesInfo");

    await collection.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error("Error deleting data from MongoDB:", err);
    res.status(500).send("Error deleting data from MongoDB");
  }
});





//////// N E W S    U P D A T E S ////////



app.post("/data/certificationInfo/newsUpdate", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("newsUpdate");

    const { title, description, date, expiryDate } = req.body;

    const newData = {
      title,
      description,
      date,
      expiryDate,
    };

    const result = await collection.insertOne(newData);

    io.emit("newData", { ...newData, id: result.insertedId });

    res.status(201).json({
      message: "News update added successfully",
      data: { ...newData, id: result.insertedId },
    });
  } catch (err) {
    console.error("Error inserting data into MongoDB:", err);
    res.status(500).send("Error inserting data into MongoDB");
  }
});

const { ObjectId } = require("mongodb");

app.delete("/data/certificationInfo/newsUpdate", async (req, res) => {
  try {
    const { ids } = req.body; // Array of IDs to delete
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("newsUpdate");

    const objectIds = ids.map((id) => new ObjectId(id)); // Convert string IDs to ObjectId
    const result = await collection.deleteMany({ _id: { $in: objectIds } });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "News deleted successfully" });
    } else {
      res.status(404).json({ message: "No news items found to delete" });
    }
  } catch (err) {
    console.error("Error deleting data from MongoDB:", err);
    res.status(500).send("Error deleting data from MongoDB");
  }
});


app.get("/data/certificationInfo/newsUpdate", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("newsUpdate");

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Error fetching data from MongoDB");
  }
});








app.get("/data/certificationInfo/careerInfo", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("careerInfo");

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Error fetching data from MongoDB");
  }
});



app.post("/data/certificationInfo/careerInfo", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("careerInfo");
    const newData = req.body;

    const result = await collection.insertOne(newData);

    // Emit an event to notify all clients about the new data
    io.emit("newData", { ...newData, id: result.insertedId });

    res.status(201).send(
      `Data inserted into certificationInfo/deligatesInfo with id: ${result.insertedId}`
    );
  } catch (err) {
    res.status(500).send("Error inserting data into MongoDB");
  }
});


app.delete("/data/certificationInfo/careerInfo", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("certificationInfo");
    const collection = database.collection("careerInfo");
    const { ids } = req.body; // Array of IDs to delete

    if (ids && ids.length > 0) {
      const result = await collection.deleteMany({
        _id: { $in: ids.map(id => new ObjectId(id)) }, // Convert string ids to ObjectId
      });

      // Emit an event to notify all clients that data was deleted
      io.emit("deletedData", ids);

      res.status(200).send(`${result.deletedCount} document(s) deleted successfully`);
    } else {
      res.status(400).send("No IDs provided for deletion");
    }
  } catch (err) {
    res.status(500).send("Error deleting data from MongoDB");
  }
});







// New Feature: Login Route
app.post("/api/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    await client.connect();
    const db = client.db("admin");
    const collection = db.collection("credentials");

    console.log(`Login attempt for username: ${userName}`);
    const user = await collection.findOne({ userName, password });
    if (user) {
      console.log("User found:", user);
      res.json({
        success: true,
        message: "Credentials verified",
        userEmail: user.Email,
      });
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error verifying credentials:", err);
    res.status(500).send("Error verifying credentials");
  }
});

// New Feature: Email Verification
app.post("/api/verify-email", async (req, res) => {
  const { email } = req.body;
  try {
    await client.connect();
    const db = client.db("admin");
    const collection = db.collection("credentials");

    const user = await collection.findOne({ Email: email });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore[email] = {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
      };

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}`,
      });

      res.json({ success: true, message: "OTP sent to email" });
    } else {
      res.status(401).json({ success: false, message: "Email not found in the database" });
    }
  } catch (err) {
    res.status(500).send("Error verifying email");
  } finally {
    await client.close();
  }
});

// New Feature: OTP Verification
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const otpData = otpStore[email];
  if (otpData && otpData.otp === otp && otpData.expiresAt > Date.now()) {
    delete otpStore[email];
    res.json({ success: true, message: "OTP verified" });
  } else {
    res.status(401).json({ success: false, message: "Invalid or expired OTP" });
  }
});

// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
