import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, Play, Pause, RotateCcw, Settings, AlertTriangle, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TroubleshootDialog } from "@/components/TroubleshootDialog";
interface WorkflowPanelProps {
  tool: {
    name: string;
    status: 'pending' | 'running' | 'success' | 'error' | 'warning';
    progress: number;
    commands: string[];
    logs: string[];
    metadata: Record<string, string>;
    error?: string;
  };
  onEdit: () => void;
  onRerun: () => void;
  onAiRetry?: () => void;
  onPromptEdit?: (prompt: string) => void;
}
export function WorkflowPanel({
  tool,
  onEdit,
  onRerun,
  onAiRetry,
  onPromptEdit
}: WorkflowPanelProps) {
  const {
    t
  } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(tool.status === 'running' || tool.status === 'error');
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);
  const shouldShowTroubleshoot = tool.status === 'error' || tool.status === 'pending';
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'running':
        return 'status-running';
      case 'success':
        return 'status-success';
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-error';
      default:
        return 'status-pending';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="w-3 h-3" />;
      case 'success':
        return <div className="w-3 h-3 rounded-full bg-success-green" />;
      case 'error':
        return <div className="w-3 h-3 rounded-full bg-error-red" />;
      default:
        return <Pause className="w-3 h-3" />;
    }
  };
  return <>
      <Card className={`gradient-card tool-panel-enter ${tool.status === 'running' ? 'glow-primary' : ''} ${tool.status === 'error' ? 'border-error-red/50' : ''}`}>
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer transition-colors bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <div className="flex items-center gap-2">
                    {getStatusIcon(tool.status)}
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </div>
                  <Badge className={`${getStatusClass(tool.status)} border`}>
                    {t(`workflow.${tool.status}`).toUpperCase()}
                  </Badge>
                  {shouldShowTroubleshoot && <Badge variant="outline" className="text-error-red border-error-red/30">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Issues
                    </Badge>}
                </div>
                
                <div className="flex items-center gap-2">
                  {shouldShowTroubleshoot && <Button variant="outline" size="sm" onClick={e => {
                  e.stopPropagation();
                  setShowTroubleshoot(true);
                }} className="text-error-red border-error-red/30 hover:bg-error-red/10">
                      <Wrench className="w-4 h-4 mr-1" />
                      {t('workflow.troubleshoot')}
                    </Button>}
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.stopPropagation();
                  onEdit();
                }}>
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={e => {
                  e.stopPropagation();
                  onRerun();
                }}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {tool.status === 'running' && <Progress value={tool.progress} className="w-full mt-2" />}
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="bg-slate-50">
              <Tabs defaultValue="commands" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="commands">{t('workflow.commands')}</TabsTrigger>
                  <TabsTrigger value="logs">{t('workflow.logs')}</TabsTrigger>
                  <TabsTrigger value="metadata">{t('workflow.metadata')}</TabsTrigger>
                </TabsList>
              
              <TabsContent value="commands" className="mt-4">
                <div className="code-panel max-h-64 overflow-y-auto">
                  {tool.commands.map((command, index) => <div key={index} className="mb-2 last:mb-0">
                      <span className="text-muted-foreground">$ </span>
                      <span className="text-foreground">{command}</span>
                    </div>)}
                </div>
              </TabsContent>
              
              <TabsContent value="logs" className="mt-4">
                <div className="code-panel max-h-64 overflow-y-auto">
                  {tool.logs.map((log, index) => <div key={index} className="mb-1 text-sm last:mb-0">
                      <span className="text-muted-foreground">[{new Date().toLocaleTimeString()}] </span>
                      <span className="text-foreground">{log}</span>
                    </div>)}
                  {tool.status === 'running' && <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-muted-foreground text-sm">{t('workflow.liveOutput')}</span>
                    </div>}
                </div>
              </TabsContent>
              
              <TabsContent value="metadata" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(tool.metadata).map(([key, value]) => <div key={key} className="p-3 bg-muted/30 rounded-lg">
                      <div className="text-sm font-medium text-muted-foreground">{key}</div>
                      <div className="text-sm text-foreground font-mono">{value}</div>
                    </div>)}
                </div>
              </TabsContent>
              </Tabs>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      <TroubleshootDialog open={showTroubleshoot} onOpenChange={setShowTroubleshoot} toolName={tool.name} error={tool.error} onAiRetry={() => onAiRetry?.()} onManualEdit={() => onEdit()} onPromptEdit={prompt => onPromptEdit?.(prompt)} />
    </>;
}