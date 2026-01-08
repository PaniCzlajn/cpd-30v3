import { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";

interface HeaderActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export function HeaderActions({ onSave, onCancel }: HeaderActionsProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCancelDialog(true)}
          className="px-3 py-1.5 text-sm font-medium text-muted-foreground 
                     hover:text-foreground hover:bg-muted rounded-md transition-colors"
        >
          Anuluj
        </button>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground 
                     hover:bg-primary/90 rounded-md transition-colors"
        >
          Zapisz
        </button>
      </div>

      <ConfirmDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Odrzuć zmiany"
        description="Czy chcesz odrzucić wszystkie zmiany?"
        onConfirm={() => {
          onCancel();
          setShowCancelDialog(false);
        }}
      />

      <ConfirmDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        title="Zapisz zmiany"
        description="Czy chcesz zapisać zmiany?"
        onConfirm={() => {
          onSave();
          setShowSaveDialog(false);
        }}
      />
    </>
  );
}
