const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB Atlas URI - Use environment variable in production
const uri = process.env.MONGODB_URI || "mongodb+srv://tvecert:HelloWorld@tvecert.6dxi7.mongodb.net/?retryWrites=true&w=majority&appName=TVECERT";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});



// Create an HTTP server
const server = http.createServer(app);

// Enhanced CORS configuration
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json());

// Enhanced CORS setup
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Security headers middleware
app.use((req, res, next) => {
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Temporary storage for OTPs
const otpStore = {};

console.log("Email User:", process.env.EMAIL_USER);

// Improved Nodemailer configuration with error handling
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Additional settings for better reliability
    pool: true,
    maxConnections: 1,
    maxMessages: 5
  });
};

let transporter = createTransporter();

// Verify transporter on startup
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email transporter error:", error);
  } else {
    console.log("Email server is ready to take our messages");
  }
});

// MongoDB connection management
let dbClient;
async function connectDB() {
  if (!dbClient) {
    try {
      dbClient = await client.connect();
      console.log("Connected to MongoDB");
      return dbClient;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
  return dbClient;
}

// Handle client connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/////// C E R T I F I C A T E S    U P D A T E S ///////
app.get("/data/certificationInfo/certificateInfo", async (req, res) => {
  try {
    await connectDB();
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
    await connectDB();
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

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Invalid request: 'ids' must be a non-empty array" });
  }

  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("certificateInfo");

    const objectIds = ids.map((id) => new ObjectId(id));

    const result = await collection.deleteMany({ _id: { $in: objectIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No records found to delete" });
    }

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

/////// D E L E G A T E S    U P D A T E S ///////
app.get("/data/certificationInfo/delegatesInfo", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("delegatesInfo");

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching delegates:", err);
    res.status(500).send("Error fetching data from MongoDB");
  }
});

app.post("/data/certificationInfo/delegatesInfo", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("delegatesInfo");
    const newData = req.body;

    const result = await collection.insertOne(newData);

    io.emit("newData", { ...newData, id: result.insertedId });

    res.status(201).json({
      message: "Delegate data inserted successfully",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Error inserting delegate data:", err);
    res.status(500).send("Error inserting data into MongoDB");
  }
});

app.delete("/data/certificationInfo/delegatesInfo", async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Invalid request: 'ids' must be a non-empty array" });
  }

  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("delegatesInfo");

    const objectIds = ids.map((id) => new ObjectId(id));

    const result = await collection.deleteMany({ _id: { $in: objectIds } });

    res.status(200).json({ 
      message: "Data deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error("Error deleting data from MongoDB:", err);
    res.status(500).send("Error deleting data from MongoDB");
  }
});

/////// N E W S    U P D A T E S ///////
app.post("/data/certificationInfo/newsUpdate", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("newsUpdate");

    const { title, description, date, expiryDate } = req.body;
    const newData = { title, description, date, expiryDate };

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

app.delete("/data/certificationInfo/newsUpdate", async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Invalid request: 'ids' must be a non-empty array" });
  }

  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("newsUpdate");

    const objectIds = ids.map((id) => new ObjectId(id));

    const result = await collection.deleteMany({ _id: { $in: objectIds } });

    res.status(200).json({ 
      message: "News deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error("Error deleting data from MongoDB:", err);
    res.status(500).send("Error deleting data from MongoDB");
  }
});

app.get("/data/certificationInfo/newsUpdate", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("newsUpdate");

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).send("Error fetching data from MongoDB");
  }
});

app.get("/data/certificationInfo/careerInfo", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("careerInfo");

    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching career info:", err);
    res.status(500).send("Error fetching data from MongoDB");
  }
});

app.post("/data/certificationInfo/careerInfo", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("careerInfo");
    const newData = req.body;

    const result = await collection.insertOne(newData);

    io.emit("newData", { ...newData, id: result.insertedId });

    res.status(201).json({
      message: "Career data inserted successfully",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Error inserting career data:", err);
    res.status(500).send("Error inserting data into MongoDB");
  }
});

app.delete("/data/certificationInfo/careerInfo", async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Invalid request: 'ids' must be a non-empty array" });
  }

  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("careerInfo");

    const objectIds = ids.map((id) => new ObjectId(id));

    const result = await collection.deleteMany({ _id: { $in: objectIds } });

    io.emit("deletedData", ids);

    res.status(200).json({
      message: `${result.deletedCount} document(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error("Error deleting career data:", err);
    res.status(500).send("Error deleting data from MongoDB");
  }
});

// Enhanced Login Route
app.post("/api/login", async (req, res) => {
  const { userName, password } = req.body;
  
  if (!userName || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Username and password are required" 
    });
  }

  try {
    await connectDB();
    const db = client.db("tvecert");
    const collection = db.collection("credentials");

    console.log(`Login attempt for username: ${userName}`);
    const user = await collection.findOne({ userName, password });
    if (user) {
      console.log("User found:", user.userName);
      res.json({
        success: true,
        message: "Credentials verified",
        userEmail: user.Email,
        userName: user.userName
      });
    } else {
      console.log("Invalid credentials");
      res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error verifying credentials:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error verifying credentials",
      error: err.message 
    });
  }
});

// Enhanced Email Verification
app.post("/api/verify-email", async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "Email is required" 
    });
  }

  try {
    await connectDB();
    const db = client.db("tvecert");
    const collection = db.collection("credentials");

    const user = await collection.findOne({ Email: email });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore[email] = {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
      };

      console.log(`Sending OTP to: ${email}`);

      // Recreate transporter if needed
      if (!transporter) {
        transporter = createTransporter();
      }

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code - TVECERT",
        text: `Your OTP is ${otp}. This OTP will expire in 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #2563eb; text-align: center;">OTP Verification</h2>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for TVECERT verification is:</p>
            <div style="text-align: center; margin: 30px 0;">
              <h1 style="font-size: 32px; color: #2563eb; text-align: center; letter-spacing: 5px; background: #f3f4f6; padding: 15px; border-radius: 5px; display: inline-block;">${otp}</h1>
            </div>
            <p>This OTP will expire in 5 minutes.</p>
            <p>If you didn't request this OTP, please ignore this email.</p>
            <br>
            <p>Best regards,<br>TVECERT Team</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`OTP sent successfully to ${email}`);

      res.json({ 
        success: true, 
        message: "OTP sent to email" 
      });
    } else {
      console.log(`Email not found: ${email}`);
      res.status(404).json({ 
        success: false, 
        message: "Email not found in the database" 
      });
    }
  } catch (err) {
    console.error("Error in email verification:", err);
    
    // More specific error messages
    if (err.code === 'EAUTH') {
      res.status(500).json({ 
        success: false, 
        message: "Email service configuration error. Please check email credentials." 
      });
    } else if (err.code === 'ENOTFOUND') {
      res.status(500).json({ 
        success: false, 
        message: "Network error: Cannot connect to email service" 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: "Error sending OTP. Please try again later.",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
});

// Enhanced OTP Verification
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ 
      success: false, 
      message: "Email and OTP are required" 
    });
  }

  const otpData = otpStore[email];
  
  if (!otpData) {
    return res.status(401).json({ 
      success: false, 
      message: "OTP not found or expired. Please request a new OTP." 
    });
  }

  if (otpData.expiresAt < Date.now()) {
    delete otpStore[email];
    return res.status(401).json({ 
      success: false, 
      message: "OTP has expired. Please request a new OTP." 
    });
  }

  if (otpData.otp === otp) {
    delete otpStore[email];
    res.json({ 
      success: true, 
      message: "OTP verified successfully" 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: "Invalid OTP. Please try again." 
    });
  }
});

// Password Reset Route
app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ 
      success: false, 
      message: "Email and new password are required" 
    });
  }

  try {
    await connectDB();
    const db = client.db("tvecert");
    const collection = db.collection("credentials");

    const result = await collection.updateOne(
      { Email: email },
      { $set: { password: newPassword } }
    );

    if (result.modifiedCount === 1) {
      res.json({ 
        success: true, 
        message: "Password reset successfully" 
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error resetting password" 
    });
  }
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ 
      status: "OK", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: "Connected",
      email: process.env.EMAIL_USER ? "Configured" : "Not configured"
    });
  } catch (error) {
    res.status(500).json({ 
      status: "Error", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: "Disconnected",
      error: error.message
    });
  }
});

// Test email endpoint
app.post("/api/test-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "Email is required" 
    });
  }

  try {
    if (!transporter) {
      transporter = createTransporter();
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Test Email from TVECERT",
      text: "This is a test email from TVECERT server.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Test Email</h2>
          <p>This is a test email from your TVECERT server.</p>
          <p>If you received this, your email configuration is working correctly.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: "Test email sent successfully" 
    });
  } catch (err) {
    console.error("Error sending test email:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error sending test email",
      error: err.message 
    });
  }
});

// Clean up expired OTPs every hour
setInterval(() => {
  const now = Date.now();
  let cleanedCount = 0;
  
  Object.keys(otpStore).forEach(email => {
    if (otpStore[email].expiresAt < now) {
      delete otpStore[email];
      cleanedCount++;
    }
  });
  
  if (cleanedCount > 0) {
    console.log(`Cleaned up ${cleanedCount} expired OTPs`);
  }
}, 60 * 60 * 1000); // Run every hour

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  if (dbClient) {
    await dbClient.close();
    console.log('MongoDB connection closed');
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  if (dbClient) {
    await dbClient.close();
    console.log('MongoDB connection closed');
  }
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email User: ${process.env.EMAIL_USER || 'Not configured'}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'Not configured'}`);
});
