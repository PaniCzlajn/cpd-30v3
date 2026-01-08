import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { MaskStyle, MaskStylePicker, MaskStylePreview } from "./MaskStylePicker";
import { cn } from "@/lib/utils";

interface MaskActionPanelProps {
  mode: 'create' | 'edit';
  currentStyle: MaskStyle;
  onAction: () => void;
  onStyleChange: (style: MaskStyle) => void;
  position: { x: number; y: number };
}

export function MaskActionPanel({
  mode,
  currentStyle,
  onAction,
  onStyleChange,
  position,
}: MaskActionPanelProps) {
  const [showStylePicker, setShowStylePicker] = useState(false);

  return (
    <div
      className="absolute z-50 flex flex-col items-start gap-1"
      style={{ left: position.x, top: position.y }}
    >
      <div className="flex items-center bg-popover rounded-md shadow-lg border border-border overflow-hidden">
        <button
          onClick={onAction}
          className={cn(
            "px-3 py-1.5 text-sm font-medium transition-colors",
            mode === 'create' 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-popover text-foreground hover:bg-muted"
          )}
        >
          {mode === 'create' ? 'Zakryj dane' : 'Cofnij'}
        </button>
        <div className="w-px h-6 bg-border" />
        <div className="px-2 py-1.5">
          <MaskStylePreview style={currentStyle} />
        </div>
        <div className="w-px h-6 bg-border" />
        <button
          onClick={() => setShowStylePicker(!showStylePicker)}
          className="px-2 py-1.5 hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      
      {showStylePicker && (
        <div className="mt-1">
          <MaskStylePicker
            selectedStyle={currentStyle}
            onStyleChange={(style) => {
              onStyleChange(style);
              setShowStylePicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
