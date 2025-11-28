import { Document, Schema, model, models } from "mongoose";

export interface IVault extends Document {
  _id: string;
  userId: string;
  contentId: string;
  contentType: "event" | "post" | "tool" | "resource";
  savedAt: Date;
  collections: string[];
  content: {
    _id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    category?: { _id: string; name: string };
    organizer?: { _id: string; firstName: string; lastName: string };
    price?: string;
    isFree?: boolean;
    url?: string;
  };
}

const VaultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  contentId: { type: String, required: true },
  contentType: { 
    type: String, 
    enum: ["event", "post", "tool", "resource"], 
    required: true,
    default: "event"
  },
  savedAt: { type: Date, default: Date.now },
  collections: [{ type: String, default: [] }],
  content: {
    type: Schema.Types.Mixed, // Store snapshot of content
    required: true,
  },
});

// Compound index to prevent duplicate saves
VaultSchema.index({ userId: 1, contentId: 1 }, { unique: true });

const Vault = models.Vault || model("Vault", VaultSchema);

export default Vault;

