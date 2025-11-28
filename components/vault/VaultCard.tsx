"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ExternalLink, FolderPlus, X } from "lucide-react";
import { IVault } from "@/lib/database/models/vault.model";
import { formatDateTime } from "@/lib/utils";
import { addToCollection, removeFromCollection } from "@/lib/actions/vault.actions";
import { useToast } from "@/components/ui/toast";

interface VaultCardProps {
  item: IVault;
  onRemove: (vaultId: string) => void;
  userId: string;
  availableCollections?: string[];
}

const VaultCard = ({ item, onRemove, userId, availableCollections = [] }: VaultCardProps) => {
  const router = useRouter();
  const { addToast } = useToast();
  const [showActions, setShowActions] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);

  const content = item.content as any;
  const contentUrl = content.url || `/events/${item.contentId}`;

  const handleAddToCollection = async (collectionName: string) => {
    const result = await addToCollection({ userId, vaultId: item._id, collectionName });
    if (result.success) {
      addToast(`Added to "${collectionName}"`, "success");
      setShowCollectionMenu(false);
      router.refresh();
    } else {
      addToast("Failed to add to collection", "error");
    }
  };

  const handleRemoveFromCollection = async (collectionName: string) => {
    const result = await removeFromCollection({ userId, vaultId: item._id, collectionName });
    if (result.success) {
      addToast(`Removed from "${collectionName}"`, "info");
      router.refresh();
    } else {
      addToast("Failed to remove from collection", "error");
    }
  };

  // Collections not already in this item
  const availableToAdd = availableCollections.filter(
    (col) => !item.collections.includes(col)
  );

  return (
    <div
      className="group relative bg-[#112240] border border-primary-500/20 rounded-lg overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowCollectionMenu(false);
      }}
    >
      {/* Fluid Glow Effect */}
      <div
        className="absolute -inset-0.5 rounded-lg animate-fluid-glow pointer-events-none -z-10 opacity-100"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(98, 76, 245, 0.5) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      ></div>

      {/* Image */}
      <Link href={contentUrl} className="block relative w-full h-48 sm:h-56 overflow-hidden bg-[#0A192F]">
        {content.imageUrl ? (
          <img
            src={content.imageUrl}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500/20 to-primary-600/10">
            <Lock className="w-12 h-12 text-primary-500/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#112240] via-transparent to-transparent opacity-60"></div>
      </Link>

      {/* Actions Overlay */}
      {showActions && (
        <div className="absolute top-2 right-2 flex gap-2 z-20">
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowCollectionMenu(!showCollectionMenu);
              }}
              className="p-2 bg-[#0A192F]/90 backdrop-blur-md rounded-lg border border-primary-500/30 hover:bg-primary-500/20 transition-colors"
              title="Add to Collection"
            >
              <FolderPlus className="w-4 h-4 text-primary-400" />
            </button>
            
            {/* Collection Menu Dropdown */}
            {showCollectionMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#0A192F] border border-primary-500/30 rounded-lg shadow-xl z-30 p-2">
                {availableToAdd.length > 0 ? (
                  <>
                    <div className="text-xs text-gray-400 px-2 py-1 mb-1">Add to:</div>
                    {availableToAdd.map((collection) => (
                      <button
                        key={collection}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCollection(collection);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-primary-500/20 rounded transition-colors"
                      >
                        {collection}
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-400">
                    No collections available
                  </div>
                )}
                {item.collections.length > 0 && (
                  <>
                    <div className="border-t border-primary-500/20 my-2"></div>
                    <div className="text-xs text-gray-400 px-2 py-1 mb-1">Remove from:</div>
                    {item.collections.map((collection) => (
                      <button
                        key={collection}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveFromCollection(collection);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-red-500/20 rounded transition-colors"
                      >
                        <X className="w-3 h-3 inline mr-2" />
                        {collection}
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(item._id);
            }}
            className="p-2 bg-[#0A192F]/90 backdrop-blur-md rounded-lg border border-red-500/30 hover:bg-red-500/20 transition-colors"
            title="Remove from Vault"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category & Date */}
        <div className="flex items-center justify-between text-xs">
          {content.category && (
            <span className="px-2 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/30">
              {content.category.name}
            </span>
          )}
          <span className="text-gray-500">
            {new Date(item.savedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Title */}
        <Link href={contentUrl}>
          <h3 className="text-base font-semibold text-white line-clamp-2 group-hover:text-primary-400 transition-colors">
            {content.title}
          </h3>
        </Link>

        {/* Collections */}
        {item.collections && item.collections.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.collections.map((collection, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              >
                {collection}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-primary-500/10">
          {content.organizer && (
            <p className="text-xs text-gray-500 truncate">
              {content.organizer.firstName} {content.organizer.lastName}
            </p>
          )}
          <Link
            href={contentUrl}
            className="flex items-center gap-1 text-primary-400 hover:text-primary-300 text-xs font-medium transition-colors"
          >
            <span>Open</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VaultCard;

