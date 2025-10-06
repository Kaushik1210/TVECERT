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

// Enhanced CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Handle preflight requests
app.options('*', cors());

// Security headers middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Temporary storage for OTPs
const otpStore = {};

console.log("🚀 Server Starting...");
console.log("🌍 Environment:", process.env.NODE_ENV || 'development');
console.log("📧 Email User configured:", !!process.env.EMAIL_USER);
console.log("🔑 Email Pass configured:", !!process.env.EMAIL_PASS);
console.log("🔗 Allowed Origins:", allowedOrigins);

// Enhanced Email Transporter with Multiple Fallbacks
const createEmailTransporter = () => {
  try {
    // Check if credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials are not configured in environment variables');
    }

    console.log("📧 Creating email transporter with:", process.env.EMAIL_USER);
    
    // Gmail with App Password (Recommended)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Should be 16-character app password
      },
      tls: {
        rejectUnauthorized: false // For better compatibility
      },
      // Connection pool settings
      pool: true,
      maxConnections: 5,
      maxMessages: 100
    });

    console.log("✅ Email transporter created successfully");
    return transporter;
    
  } catch (error) {
    console.error("❌ Error creating email transporter:", error.message);
    return null;
  }
};

let transporter = createEmailTransporter();

// Verify email configuration on startup
if (transporter) {
  transporter.verify(function (error, success) {
    if (error) {
      console.log("❌ Email transporter verification failed:", error.message);
    } else {
      console.log("✅ Email server is ready to send messages");
    }
  });
} else {
  console.log("❌ Email transporter not created - check your email credentials");
}

// MongoDB connection management
let dbClient;
async function connectDB() {
  if (!dbClient) {
    try {
      dbClient = await client.connect();
      console.log("✅ Connected to MongoDB successfully");
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
  console.log("🔌 User connected:", socket.id);

  // Handle authentication events
  socket.on("login_attempt", (data) => {
    console.log("🔐 Login attempt via socket:", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("🔌 User disconnected:", socket.id);
  });
});

/////// C E R T I F I C A T E S    U P D A T E S ///////
app.get("/data/certificationInfo/certificateInfo", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("certificateInfo");

    const data = await collection.find({}).toArray();
    console.log(`📊 Fetched ${data.length} certificates`);
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching certificate data:", err);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
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

    console.log(`✅ New certificate added with ID: ${result.insertedId}`);
    res.status(201).json({
      message: "Data inserted successfully",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("❌ Error inserting certificate data:", err);
    res.status(500).json({ error: "Error inserting data into MongoDB" });
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

    console.log(`🗑️ Deleted ${result.deletedCount} certificate(s)`);
    res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} record(s)`,
    });
  } catch (error) {
    console.error("❌ Error deleting certificates:", error);
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
    console.log(`📊 Fetched ${data.length} delegates`);
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching delegates:", err);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
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

    console.log(`✅ New delegate added with ID: ${result.insertedId}`);
    res.status(201).json({
      message: "Delegate data inserted successfully",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("❌ Error inserting delegate data:", err);
    res.status(500).json({ error: "Error inserting data into MongoDB" });
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

    console.log(`🗑️ Deleted ${result.deletedCount} delegate(s)`);
    res.status(200).json({ 
      message: "Data deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error("❌ Error deleting delegates:", err);
    res.status(500).json({ error: "Error deleting data from MongoDB" });
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

    console.log(`✅ New news update added with ID: ${result.insertedId}`);
    res.status(201).json({
      message: "News update added successfully",
      data: { ...newData, id: result.insertedId },
    });
  } catch (err) {
    console.error("❌ Error inserting news data:", err);
    res.status(500).json({ error: "Error inserting data into MongoDB" });
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

    console.log(`🗑️ Deleted ${result.deletedCount} news item(s)`);
    res.status(200).json({ 
      message: "News deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error("❌ Error deleting news:", err);
    res.status(500).json({ error: "Error deleting data from MongoDB" });
  }
});

app.get("/data/certificationInfo/newsUpdate", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("newsUpdate");

    const data = await collection.find({}).toArray();
    console.log(`📊 Fetched ${data.length} news items`);
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching news:", err);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  }
});

app.get("/data/certificationInfo/careerInfo", async (req, res) => {
  try {
    await connectDB();
    const database = client.db("certificationInfo");
    const collection = database.collection("careerInfo");

    const data = await collection.find({}).toArray();
    console.log(`📊 Fetched ${data.length} career items`);
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching career info:", err);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
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

    console.log(`✅ New career item added with ID: ${result.insertedId}`);
    res.status(201).json({
      message: "Career data inserted successfully",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("❌ Error inserting career data:", err);
    res.status(500).json({ error: "Error inserting data into MongoDB" });
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

    console.log(`🗑️ Deleted ${result.deletedCount} career item(s)`);
    res.status(200).json({
      message: `${result.deletedCount} document(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error("❌ Error deleting career data:", err);
    res.status(500).json({ error: "Error deleting data from MongoDB" });
  }
});

// Enhanced Login Route
app.post("/api/login", async (req, res) => {
  const { userName, password } = req.body;
  
  console.log(`🔐 Login attempt for username: ${userName}`);
  
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

    const user = await collection.findOne({ userName, password });
    if (user) {
      console.log(`✅ Login successful for user: ${userName}`);
      
      // Emit login success event
      io.emit("login_success", { userName: user.userName });
      
      res.json({
        success: true,
        message: "Credentials verified",
        userEmail: user.Email,
        userName: user.userName
      });
    } else {
      console.log(`❌ Invalid credentials for user: ${userName}`);
      
      // Emit login failed event
      io.emit("login_failed", { userName });
      
      res.status(401).json({ 
        success: false, 
        message: "Invalid username or password" 
      });
    }
  } catch (err) {
    console.error("❌ Error verifying credentials:", err);
    
    // Emit login error event
    io.emit("login_error", { error: err.message });
    
    res.status(500).json({ 
      success: false, 
      message: "Error verifying credentials",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// FIXED: Enhanced Email Verification for Production
app.post("/api/verify-email", async (req, res) => {
  const { email } = req.body;
  
  console.log(`📧 Email verification request for: ${email}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "Email is required" 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide a valid email address" 
    });
  }

  // Check if email transporter is available
  if (!transporter) {
    console.error("❌ Email transporter not available - recreating...");
    transporter = createEmailTransporter();
    
    if (!transporter) {
      return res.status(503).json({ 
        success: false, 
        message: "Email service is currently unavailable. Please contact administrator." 
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

      console.log(`✅ Generated OTP for: ${email}`);
      console.log(`📧 Using email service: ${process.env.EMAIL_USER}`);

      const mailOptions = {
        from: {
          name: "TVECERT Verification System",
          address: process.env.EMAIL_USER
        },
        to: email,
        subject: "Your OTP Code - TVECERT Account Verification",
        text: `Your OTP verification code is: ${otp}. This code will expire in 5 minutes.\n\nIf you didn't request this OTP, please ignore this email.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px; background: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #2563eb; margin: 0;">TVECERT OTP Verification</h2>
            </div>
            
            <p style="font-size: 16px; color: #374151;">Hello,</p>
            
            <p style="font-size: 16px; color: #374151;">Your One-Time Password (OTP) for account verification is:</p>
            
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px;">
              <h1 style="font-size: 42px; color: #2563eb; text-align: center; letter-spacing: 8px; margin: 0; font-weight: bold;">${otp}</h1>
            </div>
            
            <p style="font-size: 14px; color: #ef4444; text-align: center; font-weight: bold;">
              ⚠️ This OTP will expire in 5 minutes.
            </p>
            
            <p style="font-size: 14px; color: #6b7280; text-align: center;">
              If you didn't request this OTP, please ignore this email.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 14px; color: #6b7280; margin: 0;">
                Best regards,<br>
                <strong>TVECERT Team</strong>
              </p>
            </div>
          </div>
        `
      };

      // Send email with comprehensive error handling
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent successfully to ${email}`);
        console.log(`📨 Message ID: ${info.messageId}`);
        
        res.json({ 
          success: true, 
          message: "OTP sent to your email successfully. Please check your inbox." 
        });
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
        
        // Specific error handling for common email issues
        let errorMessage = "Failed to send OTP email. Please try again later.";
        let statusCode = 500;
        
        if (emailError.code === 'EAUTH') {
          errorMessage = "Email authentication failed. Please use App Password instead of regular Gmail password.";
          statusCode = 500;
        } else if (emailError.code === 'EENVELOPE') {
          errorMessage = "Invalid email address format.";
          statusCode = 400;
        } else if (emailError.responseCode === 535) {
          errorMessage = "Email authentication failed. Please check if you're using an App Password (16 characters) and not your regular Gmail password.";
          statusCode = 500;
        } else if (emailError.code === 'ECONNECTION') {
          errorMessage = "Cannot connect to email service. Please check your internet connection.";
          statusCode = 503;
        }
        
        return res.status(statusCode).json({ 
          success: false, 
          message: errorMessage 
        });
      }
    } else {
      console.log(`❌ Email not found in database: ${email}`);
      res.status(404).json({ 
        success: false, 
        message: "Email not found in our system. Please check the email address or contact administrator." 
      });
    }
  } catch (err) {
    console.error("❌ Error in email verification process:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error during email verification. Please try again later.",
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
});

// Enhanced OTP Verification
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  console.log(`🔑 OTP verification attempt for: ${email}`);

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
    
    // Emit OTP verification success
    io.emit("otp_verified", { email });
    
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

// Password Reset Route
app.post("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  console.log(`🔄 Password reset request for: ${email}`);

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
      console.log(`✅ Password reset successfully for: ${email}`);
      
      // Emit password reset event
      io.emit("password_reset", { email });
      
      res.json({ 
        success: true, 
        message: "Password reset successfully" 
      });
    } else {
      console.log(`❌ User not found for password reset: ${email}`);
      res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }
  } catch (err) {
    console.error("❌ Error resetting password:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error resetting password" 
    });
  }
});

// Email Configuration Status Endpoint
app.get("/api/email-status", (req, res) => {
  const status = {
    success: true,
    service: "gmail",
    userConfigured: !!process.env.EMAIL_USER,
    passConfigured: !!process.env.EMAIL_PASS,
    transporterAvailable: !!transporter,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  };
  
  console.log("📧 Email status check:", status);
  res.json(status);
});

// CORS Test Endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working correctly!",
    origin: req.headers.origin,
    allowedOrigins: allowedOrigins,
    timestamp: new Date().toISOString()
  });
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
      message: "Email service not configured properly" 
    });
  }

  try {
    const mailOptions = {
      from: {
        name: "TVECERT Test System",
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: "Test Email - TVECERT Server Configuration",
      text: "This is a test email to verify that your TVECERT server email configuration is working correctly.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">✅ TVECERT Email Test</h2>
          <p>This is a test email from your TVECERT server.</p>
          <p>If you received this, your email configuration is working correctly!</p>
          
          <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Server Information:</strong></p>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Email Service:</strong> Gmail with App Password</p>
          </div>
          
          <p style="color: #059669; font-weight: bold;">🎉 Congratulations! Your email setup is working perfectly.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Test email sent successfully to ${email}`);
    
    res.json({ 
      success: true, 
      message: "Test email sent successfully! Check your inbox." 
    });
  } catch (err) {
    console.error("❌ Test email error:", err);
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
    
    const healthStatus = {
      status: "OK",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: "Connected",
      email: {
        configured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        transporter: !!transporter,
        service: "gmail"
      },
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.version
      }
    };
    
    console.log("🏥 Health check passed");
    res.status(200).json(healthStatus);
  } catch (error) {
    console.error("🏥 Health check failed:", error);
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
}, 60 * 60 * 1000); // Run every hour

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Received SIGINT - Shutting down gracefully...');
  if (dbClient) {
    await dbClient.close();
    console.log('✅ MongoDB connection closed');
  }
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('🛑 Received SIGTERM - Shutting down gracefully...');
  if (dbClient) {
    await dbClient.close();
    console.log('✅ MongoDB connection closed');
  }
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

// Start server
server.listen(port, () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 TVECERT Server Started Successfully!');
  console.log('='.repeat(50));
  console.log(`📍 Port: ${port}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Email Service: ${process.env.EMAIL_USER ? 'Configured' : 'Not Configured'}`);
  console.log(`🔗 Allowed Origins: ${allowedOrigins.join(', ')}`);
  console.log(`⏰ Server Time: ${new Date().toISOString()}`);
  console.log('='.repeat(50));
  console.log('📋 Available Endpoints:');
  console.log('   🏥 GET  /health              - Health check');
  console.log('   🔐 POST /api/login           - User login');
  console.log('   📧 POST /api/verify-email    - Send OTP');
  console.log('   🔑 POST /api/verify-otp      - Verify OTP');
  console.log('   📧 POST /api/test-email      - Test email config');
  console.log('   📊 GET  /api/email-status    - Email config status');
  console.log('   🌐 GET  /api/cors-test       - CORS test');
  console.log('='.repeat(50) + '\n');
});
