import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getVaultItems, getUserCollections, getVaultStats } from "@/lib/actions/vault.actions";
import VaultContent from "@/components/vault/VaultContent";
import { SearchParamProps } from "@/types";

export default async function VaultPage({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  if (!userId) {
    redirect("/sign-in");
  }

  const searchQuery = (searchParams?.query as string) || "";
  const collection = (searchParams?.collection as string) || "";
  const page = Number(searchParams?.page) || 1;

  // Fetch vault data
  const vaultData = await getVaultItems({
    userId,
    searchQuery,
    collection,
    limit: 50,
    page,
  });

  const collections = await getUserCollections(userId);
  const stats = await getVaultStats(userId);

  return (
    <div className="wrapper py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-primary-300 to-primary-500 bg-clip-text text-transparent">
                My Vault
              </span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Your curated collection of valuable tech and AI insights
            </p>
          </div>
          
          {/* Vault Stats */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-400">{stats.totalItems}</div>
              <div className="text-xs text-gray-500">Items Saved</div>
            </div>
            <div className="h-12 w-px bg-primary-500/30"></div>
            <div className="text-right">
              <div className="text-lg font-semibold text-emerald-400">{stats.level}</div>
              <div className="text-xs text-gray-500">Vault Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vault Content */}
      <VaultContent
        vaultData={vaultData}
        collections={collections}
        stats={stats}
        searchQuery={searchQuery}
        selectedCollection={collection}
        userId={userId}
      />
    </div>
  );
}

