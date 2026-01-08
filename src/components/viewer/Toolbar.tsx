import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Download, 
  RotateCw, 
  EyeOff,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolbarProps {
  fileName: string;
  currentPage: number;
  totalPages: number;
  zoom: number;
  isAnonymizationOn: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
  onDownload: () => void;
  onRotate: () => void;
  onToggleAnonymization: () => void;
  onSearch: (query: string) => void;
}

export function Toolbar({
  fileName,
  currentPage,
  totalPages,
  zoom,
  isAnonymizationOn,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  onDownload,
  onRotate,
  onToggleAnonymization,
  onSearch,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-toolbar text-toolbar-foreground">
      {/* File name */}
      <span className="text-sm font-medium truncate max-w-48">{fileName}</span>
      
      {/* Separator */}
      <div className="w-px h-5 bg-toolbar-muted/30 mx-2" />
      
      {/* Page info */}
      <span className="text-sm text-toolbar-muted whitespace-nowrap">
        {currentPage} / {totalPages}
      </span>
      
      {/* Separator */}
      <div className="w-px h-5 bg-toolbar-muted/30 mx-2" />
      
      {/* View controls */}
      <div className="flex items-center gap-1">
        <button onClick={onZoomOut} className="toolbar-button" title="Oddal">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs text-toolbar-muted w-12 text-center">{zoom}%</span>
        <button onClick={onZoomIn} className="toolbar-button" title="Przybliż">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={onFitToScreen} className="toolbar-button" title="Dopasuj do ekranu">
          <Maximize className="w-4 h-4" />
        </button>
        <button onClick={onDownload} className="toolbar-button" title="Pobierz">
          <Download className="w-4 h-4" />
        </button>
        <button onClick={onRotate} className="toolbar-button" title="Obróć">
          <RotateCw className="w-4 h-4" />
        </button>
      </div>
      
      {/* Separator */}
      <div className="w-px h-5 bg-toolbar-muted/30 mx-2" />
      
      {/* Anonymization toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onToggleAnonymization}
            className={cn(
              "toolbar-button",
              isAnonymizationOn && "toolbar-button-active"
            )}
          >
            <EyeOff className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="bg-tooltip text-tooltip-foreground border-0"
        >
          Zakrywanie danych
        </TooltipContent>
      </Tooltip>
      
      {/* Separator */}
      <div className="w-px h-5 bg-toolbar-muted/30 mx-2" />
      
      {/* Search */}
      <div className="flex items-center gap-2 flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-toolbar-muted" />
          <input
            type="text"
            placeholder="Szukaj"
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-sm bg-toolbar-muted/20 rounded-md border-0 
                       text-toolbar-foreground placeholder:text-toolbar-muted
                       focus:outline-none focus:ring-1 focus:ring-primary w-40"
          />
        </div>
      </div>
      
      {/* Switch */}
      <Switch 
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
}
