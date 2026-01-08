import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { MaskStyle, MaskStylePicker, MaskStylePreview } from "./MaskStylePicker";

interface MaskActionPanelProps {
  currentStyle: MaskStyle;
  onDelete: () => void;
  onStyleChange: (style: MaskStyle) => void;
  position: { x: number; y: number };
}

export function MaskActionPanel({
  currentStyle,
  onDelete,
  onStyleChange,
  position,
}: MaskActionPanelProps) {
  const [showStylePicker, setShowStylePicker] = useState(false);

  return (
    <div
      className="absolute z-50 flex flex-col items-start gap-1"
      style={{ left: position.x, top: position.y }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center bg-popover rounded-md shadow-lg border border-border overflow-hidden">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="px-3 py-1.5 text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
        >
          Cofnij
        </button>
        <div className="w-px h-6 bg-border" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowStylePicker(!showStylePicker);
          }}
          className="flex items-center gap-1 px-2 py-1.5 hover:bg-muted transition-colors"
        >
          <MaskStylePreview style={currentStyle} />
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
