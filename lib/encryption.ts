import crypto from "crypto";

// Ensure your ENCRYPTION_SECRET is exactly 32 bytes long in production!
const ALGORITHM = "aes-256-gcm";
const SECRET_KEY = process.env.ENCRYPTION_SECRET || "fallback-secret-key-must-be-32!!"; // 32 chars
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  if (!text) return text;
  
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(SECRET_KEY.padEnd(32, "0").slice(0, 32)),
    iv
  );
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag();
  
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

export function decrypt(hash: string): string {
  if (!hash || !hash.includes(":")) return hash; // Support unencrypted legacy tokens
  
  try {
    const parts = hash.split(":");
    const iv = Buffer.from(parts[0], "hex");
    const authTag = Buffer.from(parts[1], "hex");
    const encryptedText = parts[2];
    
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(SECRET_KEY.padEnd(32, "0").slice(0, 32)),
      iv
    );
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    
    return decrypted;
  } catch (error) {
    console.error("Decryption failed", error);
    return hash; // Return raw if decryption fails, though this implies corrupted data
  }
}
