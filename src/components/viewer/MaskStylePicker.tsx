import { cn } from "@/lib/utils";

export type MaskStyle = 'light' | 'dark' | 'white' | 'black';

const allStyles: { id: MaskStyle; className: string }[] = [
  { id: 'white', className: 'mask-solid-white border border-border' },
  { id: 'black', className: 'mask-solid-black' },
  { id: 'light', className: 'mask-pattern-light' },
  { id: 'dark', className: 'mask-pattern-dark' },
];

interface MaskStylePickerProps {
  selectedStyle: MaskStyle;
  onStyleChange: (style: MaskStyle) => void;
  expanded?: boolean;
}

export function MaskStylePicker({ selectedStyle, onStyleChange, expanded = false }: MaskStylePickerProps) {
  // Show only white and black by default, all 4 if expanded (black was selected)
  const visibleStyles = expanded ? allStyles : allStyles.slice(0, 2);
  
  return (
    <div className="flex gap-1 p-1 bg-popover rounded-md shadow-lg border border-border">
      {visibleStyles.map((style) => (
        <button
          key={style.id}
          onClick={() => onStyleChange(style.id)}
          className={cn(
            "w-6 h-6 rounded-sm transition-all",
            style.className,
            selectedStyle === style.id && "ring-2 ring-primary ring-offset-1"
          )}
        />
      ))}
    </div>
  );
}

export function MaskStylePreview({ style }: { style: MaskStyle }) {
  const styleClass = allStyles.find(s => s.id === style)?.className || 'mask-pattern-light';
  return (
    <div className={cn("w-5 h-5 rounded-sm", styleClass, style === 'white' && "border border-border")} />
  );
}
