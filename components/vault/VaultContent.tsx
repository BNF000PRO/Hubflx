"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, X, Lock, FolderPlus, Trash2, ExternalLink } from "lucide-react";
import { IVault } from "@/lib/database/models/vault.model";
import VaultCard from "./VaultCard";
import EmptyVault from "./EmptyVault";
import { removeFromVault, createCollectionAndAddItem } from "@/lib/actions/vault.actions";
import { useToast } from "@/components/ui/toast";

interface VaultContentProps {
  vaultData: {
    data: IVault[];
    totalPages: number;
    totalCount: number;
  };
  collections: string[];
  stats: {
    totalItems: number;
    collectionsCount: number;
    level: string;
  };
  searchQuery: string;
  selectedCollection: string;
  userId: string;
}

const VaultContent = ({
  vaultData,
  collections,
  stats,
  searchQuery: initialSearchQuery,
  selectedCollection: initialCollection,
  userId,
}: VaultContentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("query", searchQuery);
    } else {
      params.delete("query");
    }
    router.push(`/vault?${params.toString()}`);
  };

  const handleCollectionFilter = (collection: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (collection === selectedCollection) {
      setSelectedCollection("");
      params.delete("collection");
    } else {
      setSelectedCollection(collection);
      params.set("collection", collection);
    }
    router.push(`/vault?${params.toString()}`);
  };

  const handleRemove = async (vaultId: string) => {
    const result = await removeFromVault({ userId, vaultId });
    if (result.success) {
      addToast("Removed from Vault", "info");
      router.refresh();
    } else {
      addToast("Failed to remove", "error");
    }
  };

  const handleCreateCollection = async () => {
    if (newCollectionName.trim()) {
      addToast(`Collection "${newCollectionName}" created!`, "success");
      setNewCollectionName("");
      setShowCollectionModal(false);
      router.refresh();
    }
  };

  if (stats.totalItems === 0) {
    return <EmptyVault />;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your vault..."
              className="w-full pl-10 pr-4 py-3 bg-[#112240] border border-primary-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("query");
                  router.push(`/vault?${params.toString()}`);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

        {/* Collection Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {collections.length > 0 && (
              <>
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => handleCollectionFilter(collection)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCollection === collection
                        ? "bg-primary-500 text-white border border-primary-500"
                        : "bg-[#112240] text-gray-300 border border-primary-500/30 hover:border-primary-500/50"
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </>
            )}
            <button
              onClick={() => setShowCollectionModal(true)}
              className="px-3 py-1.5 rounded-full text-sm font-medium bg-[#112240] text-primary-400 border border-primary-500/30 hover:border-primary-500/50 transition-colors flex items-center gap-1"
            >
              <FolderPlus className="w-4 h-4" />
              New
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        {vaultData.totalCount} {vaultData.totalCount === 1 ? "item" : "items"} saved
        {selectedCollection && ` in "${selectedCollection}"`}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Vault Items Grid */}
      {vaultData.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {vaultData.data.map((item) => (
            <VaultCard
              key={item._id}
              item={item}
              onRemove={handleRemove}
              userId={userId}
              availableCollections={collections}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No items found</p>
          <p className="text-gray-500 text-sm mt-2">
            Try adjusting your search or filter
          </p>
        </div>
      )}

      {/* Create Collection Modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#112240] border border-primary-500/30 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Create Collection</h3>
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection name..."
              className="w-full px-4 py-2 bg-[#0A192F] border border-primary-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/60 mb-4"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateCollection();
                }
              }}
            />
            <div className="flex gap-3">
              <button
                onClick={handleCreateCollection}
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCollectionModal(false);
                  setNewCollectionName("");
                }}
                className="px-4 py-2 bg-[#0A192F] hover:bg-[#0A192F]/80 text-gray-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaultContent;

