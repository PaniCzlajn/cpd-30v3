import { useState, useCallback } from "react";
import { TabBar } from "./TabBar";
import { Toolbar } from "./Toolbar";
import { DocumentCanvas } from "./DocumentCanvas";
import { HeaderActions } from "./HeaderActions";
import { MaskStyle } from "./MaskStylePicker";
import { toast } from "sonner";

interface Mask {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: MaskStyle;
}

const DEMO_TABS = [
  { id: 'main', label: 'MAIN' },
  { id: 'wniosek', label: 'Wniosek' },
  { id: 'mail', label: 'mail' },
  { id: 'text', label: 'text' },
  { id: 'doc005', label: 'document_005' },
  { id: 'doc006', label: 'document_006' },
];

export function DocumentViewer() {
  const [activeTab, setActiveTab] = useState('main');
  const [isAnonymizationOn, setIsAnonymizationOn] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage] = useState(1);
  const [totalPages] = useState(4);
  const [currentStyle, setCurrentStyle] = useState<MaskStyle>('light');
  const [masks, setMasks] = useState<Mask[]>([]);
  const [savedMasks, setSavedMasks] = useState<Mask[]>([]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 25, 200));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 25, 50));
  }, []);

  const handleFitToScreen = useCallback(() => {
    setZoom(100);
  }, []);

  const handleDownload = useCallback(() => {
    toast.success("Pobieranie dokumentu...");
  }, []);

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  const handleToggleAnonymization = useCallback(() => {
    setIsAnonymizationOn(prev => !prev);
    if (!isAnonymizationOn) {
      setCurrentStyle('light');
    }
  }, [isAnonymizationOn]);

  const handleSearch = useCallback((query: string) => {
    if (query) {
      console.log('Searching for:', query);
    }
  }, []);

  const handleSave = useCallback(() => {
    setSavedMasks([...masks]);
    toast.success("Zmiany zostały zapisane");
  }, [masks]);

  const handleCancel = useCallback(() => {
    setMasks([...savedMasks]);
    toast.info("Zmiany zostały odrzucone");
  }, [savedMasks]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with tabs and actions */}
      <div className="flex items-center justify-between bg-tab border-b border-border">
        <div className="flex-1">
          <TabBar
            tabs={DEMO_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        <div className="pr-4">
          <HeaderActions onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>

      {/* Toolbar */}
      <Toolbar
        fileName="document_001.pdf"
        currentPage={currentPage}
        totalPages={totalPages}
        zoom={zoom}
        isAnonymizationOn={isAnonymizationOn}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitToScreen={handleFitToScreen}
        onDownload={handleDownload}
        onRotate={handleRotate}
        onToggleAnonymization={handleToggleAnonymization}
        onSearch={handleSearch}
      />

      {/* Document area */}
      {activeTab === 'main' ? (
        <DocumentCanvas
          isAnonymizationOn={isAnonymizationOn}
          zoom={zoom}
          rotation={rotation}
          currentStyle={currentStyle}
          onStyleChange={setCurrentStyle}
          masks={masks}
          onMasksChange={setMasks}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-document-bg">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium">Brak zawartości</p>
            <p className="text-sm">Ta zakładka jest pusta</p>
          </div>
        </div>
      )}
    </div>
  );
}
