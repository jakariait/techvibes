//
// require("dotenv").config();
//
// const mysql = require("mysql2/promise");
// const mongoose = require("mongoose");
// const User = require("../models/UserModel");
// const Profile = require("../models/ProfileModel");
//
// async function migrate() {
//   // 1. Connect to MySQL
//   const mysqlConn = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "techvibes",
//   });
//
//   // 2. Connect to MongoDB
//   await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//
//   // 3. Fetch all users from MySQL
//   const [rows] = await mysqlConn.execute("SELECT * FROM users");
//
//   for (const row of rows) {
//     const fullName = `${row.first_name || ""} ${row.last_name || ""}`.trim();
//
//     const newUser = new User({
//       ...(fullName && { fullName }),
//       ...(row.email && { email: row.email }),
//       password: row.password || "RESET_REQUIRED",
//       ...(row.username && { slug: row.username }),
//     });
//
//     // 👇 Handle duplicate email error gracefully
//     let savedUser;
//     try {
//       savedUser = await newUser.save();
//     } catch (err) {
//       if (err.code === 11000 && err.keyPattern?.email) {
//         console.warn(`⚠️ Skipping duplicate email: ${row.email}`);
//         continue; // skip to next user
//       } else {
//         console.error(`❌ Failed to save user ${fullName}:`, err);
//         continue;
//       }
//     }
//
//     // SOCIAL MEDIA
//     const socialMedia = [];
//
//     const addSocial = (platform, url) => {
//       if (url && url.trim()) {
//         socialMedia.push({
//           platform: platform.toLowerCase(),
//           url: url.trim(),
//           order: socialMedia.length,
//         });
//       }
//     };
//
//     addSocial("facebook", row.Facebook);
//     addSocial("facebook page", row.Facebook_page);
//     addSocial("instagram", row.Instagram);
//     addSocial("linkedin", row.LinkedIn);
//     addSocial("youtube", row.YouTube);
//     addSocial("website", row.Website);
//     addSocial("pinterest", row.Pinterest);
//     addSocial("twitter", row.Twitter);
//     addSocial("snapchat", row.Snapchat);
//     addSocial("teams", row.Teams);
//     addSocial("quora", row.Quora);
//     addSocial("tiktok", row.Tiktok);
//     addSocial("twitch", row.Twitch);
//     addSocial("soundcloud", row.Soundcloud);
//     addSocial("vimeo", row.Vimeo);
//     addSocial("spotify", row.Spotify);
//     addSocial("discord", row.Discord);
//     addSocial("behance", row.Behance);
//     addSocial("fiverr", row.Fiverr);
//     addSocial("dribbble", row.Dribbble);
//     addSocial("upwork", row.Upwork);
//     addSocial("wechat", row.Wechat);
//
//     if (row.links) {
//       const links = row.links.split(";");
//       for (const link of links) {
//         const [url, platform] = link.split(",");
//         if (url && platform) {
//           addSocial(platform, url);
//         }
//       }
//     }
//
//     // CONTACT FIELDS
//     const emails = row.email ? [{ value: row.email, label: "Personal" }] : [];
//
//     const phones = [];
//     if (row.phone) phones.push({ value: row.phone, label: "Personal" });
//     if (row.telephone)
//       phones.push({ value: row.telephone, label: "Business" });
//
//     const whatsapp = [];
//     if (row.whatsapp) whatsapp.push({ value: row.whatsapp, label: "Personal" });
//
//     const locations = [];
//     if (row.address) locations.push({ value: row.address, label: "Primary" });
//
//     // Create Profile
//     const profileDoc = new Profile({
//       user: savedUser._id,
//       ...(row.image_name?.trim() && { profilePhoto: row.image_name.trim() }),
//       ...(row.designation?.trim() && { designation: row.designation.trim() }),
//       ...(row.company?.trim() && { companyName: row.company.trim() }),
//       ...(row.biography?.trim() && { bio: row.biography.trim() }),
//       ...(row.theme?.toLowerCase() === "dark" ||
//       row.theme?.toLowerCase() === "light"
//         ? { themeAccessLevel: row.theme.toLowerCase() }
//         : { themeAccessLevel: "dark" }),
//       ...(emails.length && { emails }),
//       ...(phones.length && { phones }),
//       ...(whatsapp.length && { whatsapp }),
//       ...(locations.length && { locations }),
//       ...(socialMedia.length && { socialMedia }),
//     });
//
//     try {
//       await profileDoc.save();
//     } catch (err) {
//       console.error(`❌ Failed to save profile for ${fullName}:`, err);
//       continue;
//     }
//
//     console.log(`✅ Migrated user ${fullName} (${row.email})`);
//   }
//
//   await mysqlConn.end();
//   await mongoose.disconnect();
//   console.log("🚀 Migration completed.");
// }
//
// migrate().catch(console.error);



require("dotenv").config();

const mysql = require("mysql2/promise");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const Profile = require("../models/ProfileModel");
const Connect = require("../models/ConnectModel"); // your model

async function migrate() {
  // 1. MySQL
  const mysqlConn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "techvibes",
  });

  // 2. MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Username → Mongo ID map
  const usernameToId = {};

  // 3. USERS & PROFILES
  const [users] = await mysqlConn.execute("SELECT * FROM users");

  for (const row of users) {
    const fullName = `${row.first_name || ""} ${row.last_name || ""}`.trim();

    const newUser = new User({
      ...(fullName && { fullName }),
      ...(row.email && { email: row.email }),
      password: row.password || "RESET_REQUIRED",
      ...(row.username && { slug: row.username }),
    });

    let savedUser;
    try {
      savedUser = await newUser.save();
      if (row.username) {
        usernameToId[row.username] = savedUser._id;
      }
    } catch (err) {
      if (err.code === 11000 && err.keyPattern?.email) {
        console.warn(`⚠️ Skipping duplicate email: ${row.email}`);
        continue;
      } else {
        console.error(`❌ Failed to save user ${fullName}:`, err);
        continue;
      }
    }

    // SOCIAL MEDIA
    const socialMedia = [];
    const addSocial = (platform, url) => {
      if (url && url.trim()) {
        socialMedia.push({
          platform: platform.toLowerCase(),
          url: url.trim(),
          order: socialMedia.length,
        });
      }
    };
    addSocial("facebook", row.Facebook);
    addSocial("facebook page", row.Facebook_page);
    addSocial("instagram", row.Instagram);
    addSocial("linkedin", row.LinkedIn);
    addSocial("youtube", row.YouTube);
    addSocial("website", row.Website);
    addSocial("pinterest", row.Pinterest);
    addSocial("twitter", row.Twitter);
    addSocial("snapchat", row.Snapchat);
    addSocial("teams", row.Teams);
    addSocial("quora", row.Quora);
    addSocial("tiktok", row.Tiktok);
    addSocial("twitch", row.Twitch);
    addSocial("soundcloud", row.Soundcloud);
    addSocial("vimeo", row.Vimeo);
    addSocial("spotify", row.Spotify);
    addSocial("discord", row.Discord);
    addSocial("behance", row.Behance);
    addSocial("fiverr", row.Fiverr);
    addSocial("dribbble", row.Dribbble);
    addSocial("upwork", row.Upwork);
    addSocial("wechat", row.Wechat);

    if (row.links) {
      const links = row.links.split(";");
      for (const link of links) {
        const [url, platform] = link.split(",");
        if (url && platform) {
          addSocial(platform, url);
        }
      }
    }

    // CONTACTS
    const emails = row.email ? [{ value: row.email, label: "Personal" }] : [];
    const phones = [];
    if (row.phone) phones.push({ value: row.phone, label: "Personal" });
    if (row.telephone) phones.push({ value: row.telephone, label: "Business" });
    const whatsapp = [];
    if (row.whatsapp) whatsapp.push({ value: row.whatsapp, label: "Personal" });
    const locations = [];
    if (row.address) locations.push({ value: row.address, label: "Primary" });

    // PROFILE
    const profileDoc = new Profile({
      user: savedUser._id,
      ...(row.image_name?.trim() && { profilePhoto: row.image_name.trim() }),
      ...(row.designation?.trim() && { designation: row.designation.trim() }),
      ...(row.company?.trim() && { companyName: row.company.trim() }),
      ...(row.biography?.trim() && { bio: row.biography.trim() }),
      ...(row.theme?.toLowerCase() === "dark" ||
      row.theme?.toLowerCase() === "light"
        ? { themeAccessLevel: row.theme.toLowerCase() }
        : { themeAccessLevel: "dark" }),
      ...(emails.length && { emails }),
      ...(phones.length && { phones }),
      ...(whatsapp.length && { whatsapp }),
      ...(locations.length && { locations }),
      ...(socialMedia.length && { socialMedia }),
    });

    try {
      await profileDoc.save();
    } catch (err) {
      console.error(`❌ Failed to save profile for ${fullName}:`, err);
      continue;
    }

    console.log(`✅ Migrated user ${fullName} (${row.email})`);
  }

  // 4. MIGRATE CONNECT TABLE
  const [connectRows] = await mysqlConn.execute("SELECT * FROM connects");

  for (const conn of connectRows) {
    const mongoUserId = usernameToId[conn.username];
    if (!mongoUserId) {
      console.warn(`⚠️ Skipping connect entry - user not found: ${conn.username}`);
      continue;
    }

    const connectDoc = new Connect({
      userId: mongoUserId,
      fullName: conn.name || "Unknown",
      email: conn.email || "",
      phone: conn.phone || "",
      socialLink: conn.social_link || "",
      message: conn.message || "",
    });

    try {
      await connectDoc.save();
      console.log(`📩 Migrated connect for ${conn.username}`);
    } catch (err) {
      console.error(`❌ Failed to save connect for ${conn.username}:`, err);
    }
  }

  // 5. CLOSE CONNECTIONS
  await mysqlConn.end();
  await mongoose.disconnect();
  console.log("🚀 Migration completed.");
}

migrate().catch(console.error);
