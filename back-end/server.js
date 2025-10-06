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

// Enhanced Email Transporter with Multiple Providers
const createEmailTransporter = () => {
  try {
    // Option 1: Gmail with OAuth2 (Most Secure)
    if (process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN) {
      console.log("📧 Using Gmail OAuth2");
      const { google } = require('googleapis');
      
      const OAuth2 = google.auth.OAuth2;
      const oauth2Client = new OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.GMAIL_REFRESH_TOKEN
      });

      const accessToken = oauth2Client.getAccessToken();

      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_USER,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: accessToken
        }
      });
    }

    // Option 2: Gmail with App Password
    else if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log("📧 Using Gmail with App Password");
      return nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }

    // Option 3: SendGrid
    else if (process.env.SENDGRID_API_KEY) {
      console.log("📧 Using SendGrid");
      return nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY
        }
      });
    }

    // Option 4: Mailtrap (Testing)
    else if (process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS) {
      console.log("📧 Using Mailtrap for testing");
      return nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER,
          pass: process.env.MAILTRAP_PASS
        }
      });
    }

    // Option 5: SMTP with custom service
    else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      console.log("📧 Using Custom SMTP");
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }

    else {
      console.log("❌ No email service configured");
      return null;
    }
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
  console.log("⚠️ Email transporter not created - emails will not work");
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
  socket.on("disconnect", () => {
    console.log("🔌 User disconnected:", socket.id);
  });
});

// [ALL YOUR EXISTING ROUTES - Keep them exactly as before]
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

// FIXED: Email Verification with Fallback and Better Error Handling
app.post("/api/verify-email", async (req, res) => {
  const { email } = req.body;
  
  console.log(`📧 Email verification request for: ${email}`);
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "Email is required" 
    });
  }

  // Check if email transporter is available
  if (!transporter) {
    console.error("❌ Email transporter not available");
    return res.status(503).json({ 
      success: false, 
      message: "Email service is currently unavailable. Please contact administrator." 
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
        expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
      };

      console.log(`✅ Generated OTP for: ${email}`);

      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@tvecert.com',
        to: email,
        subject: "Your OTP Code - TVECERT",
        text: `Your OTP is ${otp}. This OTP will expire in 10 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #2563eb; text-align: center;">OTP Verification</h2>
            <p>Hello,</p>
            <p>Your One-Time Password (OTP) for TVECERT verification is:</p>
            <div style="text-align: center; margin: 30px 0;">
              <h1 style="font-size: 32px; color: #2563eb; text-align: center; letter-spacing: 5px; background: #f3f4f6; padding: 15px; border-radius: 5px; display: inline-block;">${otp}</h1>
            </div>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this OTP, please ignore this email.</p>
            <br>
            <p>Best regards,<br>TVECERT Team</p>
          </div>
        `
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ OTP email sent successfully to ${email}`);
        console.log(`📨 Message ID: ${info.messageId}`);
        
        res.json({ 
          success: true, 
          message: "OTP sent to your email successfully" 
        });
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
        
        // Try to recreate transporter and retry once
        console.log("🔄 Attempting to recreate email transporter...");
        transporter = createEmailTransporter();
        
        if (transporter) {
          try {
            const retryInfo = await transporter.sendMail(mailOptions);
            console.log(`✅ OTP email sent successfully on retry to ${email}`);
            res.json({ 
              success: true, 
              message: "OTP sent to your email successfully" 
            });
          } catch (retryError) {
            console.error("❌ Email retry failed:", retryError);
            return res.status(500).json({ 
              success: false, 
              message: "Failed to send OTP email. Please try again later or contact support." 
            });
          }
        } else {
          return res.status(500).json({ 
            success: false, 
            message: "Email service configuration error. Please contact administrator." 
          });
        }
      }
    } else {
      console.log(`❌ Email not found: ${email}`);
      res.status(404).json({ 
        success: false, 
        message: "Email not found in our system" 
      });
    }
  } catch (err) {
    console.error("❌ Error in email verification:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error during email verification" 
    });
  }
});

// OTP Verification
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

// Email Configuration Status Endpoint
app.get("/api/email-config", (req, res) => {
  const config = {
    emailService: "Multiple providers configured",
    hasGmailOAuth: !!(process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET),
    hasGmailAppPassword: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    hasSendGrid: !!process.env.SENDGRID_API_KEY,
    hasMailtrap: !!(process.env.MAILTRAP_USER && process.env.MAILTRAP_PASS),
    hasCustomSMTP: !!(process.env.SMTP_HOST && process.env.SMTP_USER),
    transporterAvailable: !!transporter,
    environment: process.env.NODE_ENV || 'development'
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
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@tvecert.com',
      to: email,
      subject: "Test Email from TVECERT Server",
      text: "This is a test email from TVECERT server.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Test Email - TVECERT</h2>
          <p>This is a test email from your TVECERT server.</p>
          <p>If you received this, your email configuration is working correctly!</p>
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
        configured: !!(process.env.EMAIL_USER || process.env.SENDGRID_API_KEY || process.env.SMTP_HOST),
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
  console.log(`📧 Email configured: ${!!transporter}`);
});
