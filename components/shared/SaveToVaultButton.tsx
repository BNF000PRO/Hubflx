"use client";

import { useState, useEffect } from "react";
import { Lock, LockOpen, Check } from "lucide-react";
import { saveToVault, removeFromVault, isSavedToVault } from "@/lib/actions/vault.actions";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/components/ui/toast";

interface SaveToVaultButtonProps {
  contentId: string;
  contentType?: "event" | "post" | "tool" | "resource";
  userId?: string;
  className?: string;
}

const SaveToVaultButton = ({ 
  contentId, 
  contentType = "event",
  userId: propUserId,
  className = "" 
}: SaveToVaultButtonProps) => {
  const { userId: clerkUserId } = useAuth();
  const userId = propUserId || clerkUserId;
  const { addToast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vaultId, setVaultId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (userId) {
      checkSavedStatus();
    } else {
      setIsLoading(false);
    }
  }, [userId, contentId]);

  const checkSavedStatus = async () => {
    if (!userId) return;
    try {
      const result = await isSavedToVault({ userId, contentId });
      setIsSaved(result.isSaved);
      setVaultId(result.vaultId);
    } catch (error) {
      console.error("Error checking vault status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!userId) {
      addToast("Please sign in to save to Vault", "info");
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setIsAnimating(true);

    try {
      if (isSaved && vaultId) {
        // Remove from vault
        const result = await removeFromVault({ userId, vaultId });
        if (result.success) {
          setIsSaved(false);
          setVaultId(null);
          addToast("Removed from Vault", "info");
        } else {
          addToast("Failed to remove from Vault", "error");
        }
      } else {
        // Save to vault
        const result = await saveToVault({ userId, contentId, contentType });
        if (result.success) {
          setIsSaved(true);
          setVaultId(result.data?._id || null);
          addToast("Saved to Vault! 🔒", "success");
        } else {
          addToast(result.message || "Failed to save to Vault", "error");
        }
      }
    } catch (error) {
      console.error("Error saving to vault:", error);
      addToast("Something went wrong", "error");
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  if (!userId) return null;

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`relative p-2 rounded-lg transition-all duration-300 ${
        isSaved
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
          : "bg-primary-500/10 text-primary-400 border border-primary-500/30 hover:bg-primary-500/20 hover:border-primary-500/50"
      } ${isAnimating ? "scale-110" : ""} ${className}`}
      aria-label={isSaved ? "Remove from Vault" : "Save to Vault"}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : isSaved ? (
        <Check className="w-4 h-4" />
      ) : (
        <Lock className="w-4 h-4" />
      )}
      
      {/* Animation effect */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-lg bg-primary-500/30 animate-ping opacity-75" />
      )}
    </button>
  );
};

export default SaveToVaultButton;

