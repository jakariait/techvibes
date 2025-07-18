const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const slugify = require("slugify");
const QRCode = require("qrcode");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    counter: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
    },
    accountDeletion: {
      requested: {
        type: Boolean,
        default: false,
      },
      requestedAt: {
        type: Date,
      },
    },
    role: { type: String, enum: ["normal", "corporate"], default: "normal" },
    password: {
      type: String,
      required: true,
      select: false,
    },
    resetOTP: {
      type: Number,
      select: false,
    },
    resetOTPExpiry: {
      type: Date,
      select: false,
    },

    // QR code field
    qrCode: { type: String },

    baseUrl: {
      type: String,
      default: "user.techvibesbd.com",
    },

    permission: {
      type: [String],
      default: [],
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

  },
  { timestamps: true, versionKey: false },
);

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Slug + counter generation and uniqueness check
userSchema.pre("save", async function (next) {
  if (!this.isModified("fullName")) return next();

  const baseSlug = slugify(this.fullName, { lower: true, strict: true });

  // Find all slugs starting with baseSlug to find max counter
  const regex = new RegExp(`^${baseSlug}(-\\d+)?$`);

  const usersWithSlug = await mongoose.models.User.find({ slug: regex });

  if (usersWithSlug.length === 0) {
    this.counter = 0;
    this.slug = `${baseSlug}-0`;
  } else {
    // Extract max counter from existing slugs
    const counters = usersWithSlug
      .map((u) => {
        const match = u.slug.match(/-(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .sort((a, b) => b - a); // descending order

    const maxCounter = counters[0];
    this.counter = maxCounter + 1;
    this.slug = `${baseSlug}-${this.counter}`;
  }

  next();
});

// Generate QR code after slug is ready
userSchema.pre("save", async function (next) {
  if (!this.isModified("slug")) return next();

  try {
    // Use baseUrl field if set; fallback to default domain
    const domain = this.baseUrl || "user.techvibesbd.com";

    // Construct full profile URL
    const fullUrl = `https://${domain}/profile/${this.slug}`;

    // Generate QR code from the full URL
    const qrCodeData = await QRCode.toDataURL(fullUrl, {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 1,
      scale: 6,
    });

    this.qrCode = qrCodeData;
    next();
  } catch (err) {
    next(err);
  }
});

// Password compare method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
