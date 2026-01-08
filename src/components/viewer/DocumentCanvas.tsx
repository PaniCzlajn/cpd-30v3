import { useState, useRef, useEffect, useCallback } from "react";
import { MaskStyle } from "./MaskStylePicker";
import { MaskActionPanel } from "./MaskActionPanel";
import { cn } from "@/lib/utils";

interface Mask {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: MaskStyle;
}

interface Selection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface DocumentCanvasProps {
  isAnonymizationOn: boolean;
  zoom: number;
  rotation: number;
  currentStyle: MaskStyle;
  onStyleChange: (style: MaskStyle) => void;
  masks: Mask[];
  onMasksChange: (masks: Mask[]) => void;
}

export function DocumentCanvas({
  isAnonymizationOn,
  zoom,
  rotation,
  currentStyle,
  onStyleChange,
  masks,
  onMasksChange,
}: DocumentCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedMaskId, setSelectedMaskId] = useState<string | null>(null);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [showExpandedPicker, setShowExpandedPicker] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isAnonymizationOn) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / (zoom / 100);
    const y = (e.clientY - rect.top) / (zoom / 100);

    // Check if clicking on existing mask
    const clickedMask = masks.find(mask => 
      x >= mask.x && x <= mask.x + mask.width &&
      y >= mask.y && y <= mask.y + mask.height
    );

    if (clickedMask) {
      setSelectedMaskId(clickedMask.id);
      setPanelPosition({
        x: (clickedMask.x + clickedMask.width) * (zoom / 100) + 10,
        y: clickedMask.y * (zoom / 100)
      });
      return;
    }

    setSelectedMaskId(null);
    setIsSelecting(true);
    setSelection({ startX: x, startY: y, endX: x, endY: y });
  }, [isAnonymizationOn, masks, zoom]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSelecting || !selection) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / (zoom / 100);
    const y = (e.clientY - rect.top) / (zoom / 100);

    setSelection({ ...selection, endX: x, endY: y });
  }, [isSelecting, selection, zoom]);

  const handleMouseUp = useCallback(() => {
    if (!isSelecting || !selection) return;

    setIsSelecting(false);

    const width = Math.abs(selection.endX - selection.startX);
    const height = Math.abs(selection.endY - selection.startY);

    if (width > 10 && height > 10) {
      const x = Math.min(selection.startX, selection.endX);
      const y = Math.min(selection.startY, selection.endY);
      
      // Immediately create mask with current style
      const newMask: Mask = {
        id: `mask-${Date.now()}`,
        x,
        y,
        width,
        height,
        style: currentStyle,
      };

      onMasksChange([...masks, newMask]);
    }
    
    setSelection(null);
  }, [isSelecting, selection, currentStyle, masks, onMasksChange]);

  const handleDeleteMask = useCallback(() => {
    if (!selectedMaskId) return;
    onMasksChange(masks.filter(m => m.id !== selectedMaskId));
    setSelectedMaskId(null);
  }, [selectedMaskId, masks, onMasksChange]);

  const handleClickOutside = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.mask-panel') && !target.closest('.mask-box')) {
      setSelectedMaskId(null);
      setSelection(null);
    }
  }, []);

  const getSelectionRect = () => {
    if (!selection) return null;
    return {
      left: Math.min(selection.startX, selection.endX) * (zoom / 100),
      top: Math.min(selection.startY, selection.endY) * (zoom / 100),
      width: Math.abs(selection.endX - selection.startX) * (zoom / 100),
      height: Math.abs(selection.endY - selection.startY) * (zoom / 100),
    };
  };

  const getMaskStyleClass = (style: MaskStyle) => {
    switch (style) {
      case 'light': return 'mask-pattern-light';
      case 'dark': return 'mask-pattern-dark';
      case 'white': return 'mask-solid-white';
      case 'black': return 'mask-solid-black';
    }
  };

  const selectedMask = masks.find(m => m.id === selectedMaskId);

  return (
    <div 
      className="flex-1 overflow-auto bg-document-bg p-8"
      onClick={handleClickOutside}
    >
      <div
        ref={canvasRef}
        className="relative bg-document-page shadow-lg mx-auto"
        style={{
          width: 595 * (zoom / 100),
          height: 842 * (zoom / 100),
          transform: `rotate(${rotation}deg)`,
          cursor: isAnonymizationOn ? 'crosshair' : 'default',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => isSelecting && handleMouseUp()}
      >
        {/* Demo PDF content */}
        <div 
          className="absolute inset-0 p-8 select-none pointer-events-none"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
        >
          <div className="text-2xl font-bold text-foreground mb-4">
            UMOWA POŻYCZKI NR 2024/001234
          </div>
          <div className="text-sm text-muted-foreground mb-6">
            Data: 15 stycznia 2024 r.
          </div>
          
          <div className="space-y-4 text-sm text-foreground">
            <p className="font-semibold">STRONY UMOWY:</p>
            
            <div className="pl-4 space-y-2">
              <p><span className="font-medium">Pożyczkodawca:</span></p>
              <p>Bank Przykładowy S.A.</p>
              <p>ul. Bankowa 123, 00-001 Warszawa</p>
              <p>NIP: 123-456-78-90</p>
            </div>
            
            <div className="pl-4 space-y-2 mt-4">
              <p><span className="font-medium">Pożyczkobiorca:</span></p>
              <p>Jan Kowalski</p>
              <p>PESEL: 85010112345</p>
              <p>ul. Przykładowa 45/12, 02-456 Warszawa</p>
              <p>Nr dowodu: ABC 123456</p>
            </div>
            
            <div className="mt-6 p-4 bg-muted/30 rounded">
              <p className="font-semibold text-lg">KWOTA POŻYCZKI: 25 000,00 PLN</p>
              <p className="text-muted-foreground">(słownie: dwadzieścia pięć tysięcy złotych)</p>
            </div>
            
            <div className="mt-4 space-y-2">
              <p><span className="font-medium">Oprocentowanie:</span> 8,5% w skali roku</p>
              <p><span className="font-medium">Okres spłaty:</span> 36 miesięcy</p>
              <p><span className="font-medium">Rata miesięczna:</span> 789,45 PLN</p>
              <p><span className="font-medium">Nr konta do spłaty:</span> 12 3456 7890 1234 5678 9012 3456</p>
            </div>
            
            <div className="mt-6 text-xs text-muted-foreground">
              <p>§1. Pożyczkodawca udziela Pożyczkobiorcy pożyczki w kwocie określonej powyżej.</p>
              <p className="mt-2">§2. Pożyczkobiorca zobowiązuje się do spłaty pożyczki wraz z odsetkami w ratach miesięcznych.</p>
              <p className="mt-2">§3. W przypadku opóźnienia w spłacie naliczane będą odsetki za zwłokę.</p>
            </div>
          </div>
        </div>

        {/* Selection rectangle */}
        {selection && (
          <div
            className="absolute border-2 border-selection-border bg-selection-fill/20 pointer-events-none"
            style={getSelectionRect() || {}}
          />
        )}

        {/* Existing masks */}
        {masks.map((mask) => (
          <div
            key={mask.id}
            className={cn(
              "mask-box absolute cursor-pointer transition-all",
              getMaskStyleClass(mask.style),
              selectedMaskId === mask.id && "ring-2 ring-primary"
            )}
            style={{
              left: mask.x * (zoom / 100),
              top: mask.y * (zoom / 100),
              width: mask.width * (zoom / 100),
              height: mask.height * (zoom / 100),
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMaskId(mask.id);
              setPanelPosition({
                x: (mask.x + mask.width) * (zoom / 100) + 10,
                y: mask.y * (zoom / 100)
              });
            }}
          />
        ))}

        {/* Edit mask panel */}
        {selectedMaskId && selectedMask && (
          <div className="mask-panel">
            <MaskActionPanel
              currentStyle={selectedMask.style}
              onDelete={handleDeleteMask}
              onStyleChange={(style) => {
                onMasksChange(masks.map(m => 
                  m.id === selectedMaskId ? { ...m, style } : m
                ));
                // Enable expanded picker if black is selected
                if (style === 'black') {
                  setShowExpandedPicker(true);
                }
                onStyleChange(style);
              }}
              position={panelPosition}
              showExpandedPicker={showExpandedPicker}
            />
          </div>
        )}
      </div>
    </div>
  );
}
