import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex items-center bg-tab border-b border-border">
      <div className="flex-1 flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "bg-tab-active text-tab-active-foreground"
                : "text-tab-foreground hover:text-tab-active-foreground hover:bg-tab-active/50"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-tab-underline" />
            )}
          </button>
        ))}
      </div>
      <button className="p-3 text-tab-foreground hover:text-tab-active-foreground hover:bg-tab-active/50 transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  );
}
