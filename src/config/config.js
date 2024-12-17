// MONGODB CONNECTION
export const DATABASE = "mongodb+srv://ecomapi:ecomapi@cluster0.urx7h.mongodb.net/EcomData?retryWrites=true&w=majority&appName=Cluster0";

// JWT config
export const JWT_KEY = "5EC7CEFA1BE7C9354A639369A2AA8";
export const JWT_EXPIRE_TIME = 60 * 60 * 24 * 30;

// Email config
export const EMAIL_HOST = "smtp.gmail.com"; // Gmail SMTP server
export const EMAIL_PORT = 587; // Port for sending email using STARTTLS
export const EMAIL_SECURITY = false; // Encryption method
export const EMAIL_USER = "mdarifuzzamanas@gmail.com"; // Your Gmail address
export const EMAIL_PASSWORD = "arifujjaman12"; // Your Gmail password (or App Password)

export const MAX_JSON_SIZE = "50mb";
export const URL_ENCODED = true;

export const REQUEST_LIMIT_TIME = 15 * 60 * 1000; //15 Min
export const REQUEST_LIMIT_NUMBER = 2000; //2000 Request Per 15 Min

export const WEB_CACHE = false;
export const PORT = 5050;
