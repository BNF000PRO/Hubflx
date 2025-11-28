"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import Vault from "@/lib/database/models/vault.model";
import Event from "@/lib/database/models/event.model";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import { handleError } from "@/lib/utils";

// SAVE TO VAULT
export async function saveToVault({
  userId,
  contentId,
  contentType = "event",
}: {
  userId: string;
  contentId: string;
  contentType?: "event" | "post" | "tool" | "resource";
}) {
  try {
    await connectToDatabase();

    // Check if already saved
    const existing = await Vault.findOne({ userId, contentId });
    if (existing) {
      return { success: false, message: "Already saved to Vault" };
    }

    // Fetch content based on type
    let contentData: any = null;
    if (contentType === "event") {
      const event = await Event.findById(contentId)
        .populate({
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        })
        .populate({ path: "category", model: Category, select: "_id name" });
      
      if (!event) throw new Error("Event not found");
      
      contentData = {
        _id: event._id.toString(),
        title: event.title,
        description: event.description,
        imageUrl: event.imageUrl,
        category: event.category ? {
          _id: event.category._id.toString(),
          name: event.category.name,
        } : null,
        organizer: event.organizer ? {
          _id: event.organizer._id.toString(),
          firstName: event.organizer.firstName,
          lastName: event.organizer.lastName,
        } : null,
        price: event.price,
        isFree: event.isFree,
        url: event.url,
      };
    }

    // Create vault entry
    const vaultItem = await Vault.create({
      userId,
      contentId,
      contentType,
      content: contentData,
      collections: [],
    });

    revalidatePath("/vault");
    return { success: true, data: JSON.parse(JSON.stringify(vaultItem)) };
  } catch (error: any) {
    if (error.code === 11000) {
      return { success: false, message: "Already saved to Vault" };
    }
    handleError(error);
    return { success: false, message: "Failed to save to Vault" };
  }
}

// REMOVE FROM VAULT
export async function removeFromVault({
  userId,
  vaultId,
}: {
  userId: string;
  vaultId: string;
}) {
  try {
    await connectToDatabase();

    const vaultItem = await Vault.findOne({ _id: vaultId, userId });
    if (!vaultItem) throw new Error("Vault item not found");

    await Vault.findByIdAndDelete(vaultId);
    revalidatePath("/vault");
    return { success: true };
  } catch (error) {
    handleError(error);
    return { success: false, message: "Failed to remove from Vault" };
  }
}

// GET VAULT ITEMS
export async function getVaultItems({
  userId,
  searchQuery = "",
  collection = "",
  limit = 50,
  page = 1,
}: {
  userId: string;
  searchQuery?: string;
  collection?: string;
  limit?: number;
  page?: number;
}) {
  try {
    await connectToDatabase();

    const conditions: any = { userId };
    
    // Search filter
    if (searchQuery) {
      conditions.$or = [
        { "content.title": { $regex: searchQuery, $options: "i" } },
        { "content.description": { $regex: searchQuery, $options: "i" } },
      ];
    }

    // Collection filter
    if (collection) {
      conditions.collections = { $in: [collection] };
    }

    const skipAmount = (page - 1) * limit;
    const vaultItems = await Vault.find(conditions)
      .sort({ savedAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const totalCount = await Vault.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(vaultItems)),
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    };
  } catch (error) {
    handleError(error);
    return { data: [], totalPages: 0, totalCount: 0 };
  }
}

// CHECK IF SAVED
export async function isSavedToVault({
  userId,
  contentId,
}: {
  userId: string;
  contentId: string;
}) {
  try {
    await connectToDatabase();
    const vaultItem = await Vault.findOne({ userId, contentId });
    return { isSaved: !!vaultItem, vaultId: vaultItem?._id.toString() };
  } catch (error) {
    return { isSaved: false, vaultId: null };
  }
}

// ADD TO COLLECTION
export async function addToCollection({
  userId,
  vaultId,
  collectionName,
}: {
  userId: string;
  vaultId: string;
  collectionName: string;
}) {
  try {
    await connectToDatabase();

    const vaultItem = await Vault.findOne({ _id: vaultId, userId });
    if (!vaultItem) throw new Error("Vault item not found");

    if (!vaultItem.collections.includes(collectionName)) {
      vaultItem.collections.push(collectionName);
      await vaultItem.save();
    }

    revalidatePath("/vault");
    return { success: true };
  } catch (error) {
    handleError(error);
    return { success: false };
  }
}

// REMOVE FROM COLLECTION
export async function removeFromCollection({
  userId,
  vaultId,
  collectionName,
}: {
  userId: string;
  vaultId: string;
  collectionName: string;
}) {
  try {
    await connectToDatabase();

    const vaultItem = await Vault.findOne({ _id: vaultId, userId });
    if (!vaultItem) throw new Error("Vault item not found");

    vaultItem.collections = vaultItem.collections.filter(
      (col) => col !== collectionName
    );
    await vaultItem.save();

    revalidatePath("/vault");
    return { success: true };
  } catch (error) {
    handleError(error);
    return { success: false };
  }
}

// GET USER COLLECTIONS
export async function getUserCollections(userId: string) {
  try {
    await connectToDatabase();

    const vaultItems = await Vault.find({ userId });
    const collections = new Set<string>();
    
    vaultItems.forEach((item) => {
      item.collections.forEach((col) => collections.add(col));
    });

    return Array.from(collections);
  } catch (error) {
    handleError(error);
    return [];
  }
}

// GET VAULT STATS
export async function getVaultStats(userId: string) {
  try {
    await connectToDatabase();

    const totalItems = await Vault.countDocuments({ userId });
    const collections = await getUserCollections(userId);
    
    // Determine vault level
    let level = "Novice Collector";
    if (totalItems >= 100) level = "AI Archivist";
    else if (totalItems >= 50) level = "Tech Curator";
    else if (totalItems >= 25) level = "Digital Librarian";
    else if (totalItems >= 10) level = "Content Collector";

    return {
      totalItems,
      collectionsCount: collections.length,
      level,
    };
  } catch (error) {
    handleError(error);
    return { totalItems: 0, collectionsCount: 0, level: "Novice Collector" };
  }
}

// CREATE COLLECTION (adds collection name to an item)
export async function createCollectionAndAddItem({
  userId,
  vaultId,
  collectionName,
}: {
  userId: string;
  vaultId: string;
  collectionName: string;
}) {
  try {
    await connectToDatabase();

    const vaultItem = await Vault.findOne({ _id: vaultId, userId });
    if (!vaultItem) throw new Error("Vault item not found");

    if (!vaultItem.collections.includes(collectionName)) {
      vaultItem.collections.push(collectionName);
      await vaultItem.save();
    }

    revalidatePath("/vault");
    return { success: true };
  } catch (error) {
    handleError(error);
    return { success: false };
  }
}

