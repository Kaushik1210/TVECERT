const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB Atlas URI
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

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'https://your-production-domain.com'
].filter(Boolean);

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Security headers middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Temporary storage for OTPs
const otpStore = {};

console.log("Environment:", process.env.NODE_ENV);
console.log("Email User configured:", !!process.env.EMAIL_USER);
console.log("Email Pass configured:", !!process.env.EMAIL_PASS);

// Enhanced Nodemailer configuration for production
const createTransporter = () => {
  try {
    // Validate email credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials are not configured');
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // For production compatibility
      },
      // Additional settings for better reliability
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5
    });

    return transporter;
  } catch (error) {
    console.error('Error creating email transporter:', error.message);
    return null;
  }
};

let transporter = createTransporter();

// Verify transporter on startup
if (transporter) {
  transporter.verify(function (error, success) {
    if (error) {
      console.log("❌ Email transporter verification failed:", error);
    } else {
      console.log("✅ Email server is ready to take our messages");
    }
  });
} else {
  console.log("❌ Email transporter not created - check credentials");
}

// MongoDB connection management
let dbClient;
async function connectDB() {
  if (!dbClient) {
    try {
      dbClient = await client.connect();
      console.log("✅ Connected to MongoDB");
      return dbClient;
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      throw error;
    }
  }
  return dbClient;
}

// Handle client connections
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// [ALL YOUR EXISTING ROUTES REMAIN THE SAME - certificates, delegates, news, career info]
// ... (Include all your existing routes here)

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
  const { ids } = req.body;

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

    res.status(201).send(
      `Data inserted into certificationInfo/delegatesInfo with id: ${result.insertedId}`
    );
  } catch (err) {
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

    res.status(200).json({ message: "Data deleted successfully" });
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

    res.status(200).json({ message: "News deleted successfully" });
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

    res.status(201).send(
      `Data inserted into certificationInfo/careerInfo with id: ${result.insertedId}`
    );
  } catch (err) {
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
    res.status(200).send(`${result.deletedCount} document(s) deleted successfully`);
  } catch (err) {
    res.status(500).send("Error deleting data from MongoDB");
  }
});

// Enhanced Login Route
app.post("/api/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    await connectDB();
    const db = client.db("tvecert");
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

// FIXED: Enhanced Email Verification for Production
app.post("/api/verify-email", async (req, res) => {
  const { email } = req.body;
  
  console.log(`Email verification request for: ${email}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "Email is required" 
    });
  }

  // Check if email transporter is available
  if (!transporter) {
    console.error("Email transporter not available - recreating...");
    transporter = createTransporter();
    
    if (!transporter) {
      return res.status(500).json({ 
        success: false, 
        message: "Email service is currently unavailable. Please try again later." 
      });
    }
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

      console.log(`Generating OTP for: ${email}`);
      console.log(`Using email: ${process.env.EMAIL_USER}`);

      const mailOptions = {
        from: {
          name: "TVECERT System",
          address: process.env.EMAIL_USER
        },
        to: email,
        subject: "Your OTP Code - TVECERT",
        text: `Your OTP verification code is: ${otp}. This code will expire in 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #2563eb; text-align: center;">TVECERT OTP Verification</h2>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for account verification is:</p>
            <div style="text-align: center; margin: 30px 0;">
              <h1 style="font-size: 32px; color: #2563eb; text-align: center; letter-spacing: 5px; background: #f3f4f6; padding: 15px; border-radius: 5px; display: inline-block;">${otp}</h1>
            </div>
            <p><strong>This OTP will expire in 5 minutes.</strong></p>
            <p>If you didn't request this OTP, please ignore this email.</p>
            <br>
            <p>Best regards,<br>TVECERT Team</p>
          </div>
        `
      };

      // Send email with better error handling
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent successfully to ${email}`);
        console.log(`📧 Message ID: ${info.messageId}`);
        
        res.json({ 
          success: true, 
          message: "OTP sent to your email successfully" 
        });
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
        
        // Specific error handling for common email issues
        if (emailError.code === 'EAUTH') {
          return res.status(500).json({ 
            success: false, 
            message: "Email authentication failed. Please check email configuration." 
          });
        } else if (emailError.code === 'EENVELOPE') {
          return res.status(500).json({ 
            success: false, 
            message: "Invalid email address." 
          });
        } else {
          return res.status(500).json({ 
            success: false, 
            message: "Failed to send OTP email. Please try again later." 
          });
        }
      }
    } else {
      console.log(`❌ Email not found in database: ${email}`);
      res.status(404).json({ 
        success: false, 
        message: "Email not found in our system. Please check the email address." 
      });
    }
  } catch (err) {
    console.error("❌ Error in email verification process:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error during email verification",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
});

// Enhanced OTP Verification
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  console.log(`OTP verification attempt for: ${email}`);

  if (!email || !otp) {
    return res.status(400).json({ 
      success: false, 
      message: "Email and OTP are required" 
    });
  }

  const otpData = otpStore[email];
  
  if (!otpData) {
    console.log(`❌ No OTP found for email: ${email}`);
    return res.status(401).json({ 
      success: false, 
      message: "OTP not found or expired. Please request a new OTP." 
    });
  }

  if (otpData.expiresAt < Date.now()) {
    delete otpStore[email];
    console.log(`❌ OTP expired for email: ${email}`);
    return res.status(401).json({ 
      success: false, 
      message: "OTP has expired. Please request a new OTP." 
    });
  }

  if (otpData.otp === otp) {
    delete otpStore[email];
    console.log(`✅ OTP verified successfully for: ${email}`);
    res.json({ 
      success: true, 
      message: "OTP verified successfully" 
    });
  } else {
    console.log(`❌ Invalid OTP for email: ${email}`);
    res.status(401).json({ 
      success: false, 
      message: "Invalid OTP. Please try again." 
    });
  }
});

// Email Configuration Test Endpoint
app.get("/api/email-config", (req, res) => {
  const config = {
    emailUser: process.env.EMAIL_USER ? "✅ Configured" : "❌ Not configured",
    emailPass: process.env.EMAIL_PASS ? "✅ Configured" : "❌ Not configured",
    environment: process.env.NODE_ENV || 'development',
    transporter: transporter ? "✅ Available" : "❌ Not available"
  };
  
  res.json(config);
});

// Test Email Endpoint
app.post("/api/test-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "Email is required" 
    });
  }

  if (!transporter) {
    return res.status(500).json({ 
      success: false, 
      message: "Email transporter not available" 
    });
  }

  try {
    const mailOptions = {
      from: {
        name: "TVECERT Test",
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: "Test Email from TVECERT Server",
      text: "This is a test email to verify your email configuration is working correctly.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Test Email - TVECERT</h2>
          <p>This is a test email from your TVECERT server.</p>
          <p>If you received this, your email configuration is working correctly! ✅</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: "Test email sent successfully" 
    });
  } catch (err) {
    console.error("Test email error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send test email",
      error: err.message 
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
      email: {
        configured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        transporter: !!transporter
      }
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
    console.log(`🧹 Cleaned up ${cleanedCount} expired OTPs`);
  }
}, 60 * 60 * 1000);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  if (dbClient) {
    await dbClient.close();
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
  console.log(`📧 Email configured: ${!!process.env.EMAIL_USER}`);
  console.log(`🔗 Allowed Origins: ${allowedOrigins.join(', ')}`);
});
