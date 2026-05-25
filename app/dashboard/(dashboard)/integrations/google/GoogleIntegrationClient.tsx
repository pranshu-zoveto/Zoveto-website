"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { disconnectGoogle } from "./actions";

interface Props {
  isConnected: boolean;
  updatedAt: string | null;
}

export function GoogleIntegrationClient({ isConnected, updatedAt }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = () => {
    setIsLoading(true);
    router.push("/api/integrations/google/connect");
  };

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect Google Analytics? Traffic data will fall back to estimates.")) return;
    setIsLoading(true);
    try {
      await disconnectGoogle();
    } catch (err) {
      console.error(err);
      alert("Failed to disconnect");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Google Workspace (Analytics & Search Console)</h3>
            <p className="text-sm text-gray-500 mt-1">
              Connect to fetch live traffic, visitor metrics, and search performance data.
            </p>
          </div>
          {isConnected ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Connected
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Disconnected
            </span>
          )}
        </div>
      </div>
      
      <div className="px-6 py-5">
        {isConnected ? (
          <div className="text-sm text-gray-600">
            Your dashboard is currently syncing live data from Google APIs. 
            {updatedAt && <p className="mt-1 text-xs text-gray-400">Last updated: {new Date(updatedAt).toISOString().replace('T', ' ').substring(0, 16)} UTC</p>}
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            Clicking connect will redirect you to Google to grant read-only access to your Analytics and Search Console data.
          </div>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        {isConnected ? (
          <Button 
            variant="secondary" 
            onClick={handleDisconnect}
            disabled={isLoading}
          >
            {isLoading ? "Disconnecting..." : "Disconnect"}
          </Button>
        ) : (
          <Button 
            onClick={handleConnect}
            disabled={isLoading}
          >
            {isLoading ? "Redirecting..." : "Connect Google"}
          </Button>
        )}
      </div>
    </div>
  );
}
