import { faker } from "@faker-js/faker";
import admin from "firebase-admin";
import { ObjectId } from "mongodb";
import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import {
  users,
  wardrobeItems,
  outfits,
  outfitHistory,
} from "../config/mongoCollections.js";
import dotenv from "dotenv";

dotenv.config();

// Firebase initialization
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Configuration
const NUM_USERS = 10;
const ITEMS_PER_USER = 8;
const OUTFITS_PER_USER = 5;
const HISTORY_PER_OUTFIT = 3;

// Seed Data Storage
let generatedUsers = [];
let generatedWardrobeItems = [];
let generatedOutfits = [];

// User Seed Function
const seedUsers = async () => {
  const userCollection = await users();
  generatedUsers = [];

  for (let i = 0; i < NUM_USERS; i++) {
    const userId = new ObjectId();
    const userData = {
      _id: userId,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 15 }) + "$A1",
      createdAt: new Date(),
    };

    try {
      // Handle existing Firebase user
      try {
        const existingUser = await admin.auth().getUserByEmail(userData.email);
        await admin.auth().deleteUser(existingUser.uid);
        console.log(`Deleted existing Firebase user: ${userData.email}`);
      } catch (err) {
        if (err.code !== "auth/user-not-found") throw err;
      }

      // Create Firebase user
      const firebaseUser = await admin.auth().createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.name,
      });

      // Store MongoDB user
      const { password, ...userToInsert } = userData;
      await userCollection.updateOne(
        { _id: userId },
        { $set: { ...userToInsert, firebaseUid: firebaseUser.uid } },
        { upsert: true }
      );

      generatedUsers.push({ ...userToInsert, firebaseUid: firebaseUser.uid });
      console.log(`Created user: ${userData.email}`);
    } catch (error) {
      console.error(`Error processing user ${userData.email}:`, error.message);
    }
  }
};

// Wardrobe Items Seed Function
const seedWardrobeItems = async () => {
  const wardrobeCollection = await wardrobeItems();
  generatedWardrobeItems = [];

  for (const user of generatedUsers) {
    const items = Array.from({ length: ITEMS_PER_USER }, () => ({
      _id: new ObjectId(),
      userId: user._id,
      category: faker.helpers.arrayElement([
        "Shirt",
        "Pants",
        "Dress",
        "Jacket",
        "Shoes",
      ]),
      name: `${faker.color.human()} ${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
      image: faker.image.urlLoremFlickr({ category: "fashion" }),
      createdAt: faker.date.recent({ days: 60 }),
    }));

    await wardrobeCollection.insertMany(items);
    generatedWardrobeItems.push(...items);
    console.log(`Created ${items.length} items for ${user.name}`);
  }
};

// Outfits Seed Function
const seedOutfits = async () => {
  const outfitCollection = await outfits();
  generatedOutfits = [];

  for (const user of generatedUsers) {
    const userItems = generatedWardrobeItems.filter((item) =>
      item.userId.equals(user._id)
    );

    const outfits = Array.from({ length: OUTFITS_PER_USER }, () => ({
      _id: new ObjectId(),
      userId: user._id,
      items: faker.helpers
        .arrayElements(userItems, { min: 2, max: 5 })
        .map((i) => i._id),
      createdAt: faker.date.recent({ days: 30 }),
    }));

    await outfitCollection.insertMany(outfits);
    generatedOutfits.push(...outfits);
    console.log(`Created ${outfits.length} outfits for ${user.name}`);
  }
};

// Outfit History Seed Function
const seedOutfitHistory = async () => {
  const historyCollection = await outfitHistory();
  const historyEntries = [];

  for (const outfit of generatedOutfits) {
    const entries = Array.from({ length: HISTORY_PER_OUTFIT }, () => ({
      userId: outfit.userId,
      outfitId: outfit._id,
      wornDate: faker.date.between({
        from: outfit.createdAt,
        to: new Date(),
      }),
    }));

    historyEntries.push(...entries);
  }

  await historyCollection.insertMany(historyEntries);
  console.log(`Created ${historyEntries.length} history entries`);
};

// Main Seed Function
const main = async () => {
  const db = await dbConnection();

  try {
    console.log("Starting database cleanup...");
    await db.dropDatabase();

    console.log("\nSeeding users:");
    await seedUsers();

    console.log("\nSeeding wardrobe items:");
    await seedWardrobeItems();

    console.log("\nSeeding outfits:");
    await seedOutfits();

    console.log("\nSeeding outfit history:");
    await seedOutfitHistory();

    console.log("\nDatabase seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await closeConnection();
  }
};

main();
