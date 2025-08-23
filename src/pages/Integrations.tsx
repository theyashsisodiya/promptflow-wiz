import { useState } from "react";
import { CheckCircle, Circle, Settings, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  icon: string;
  configUrl?: string;
}
const availableTools: Tool[] = [{
  id: "docker",
  name: "Docker",
  description: "Container platform for building and deploying applications",
  category: "Containerization",
  connected: true,
  icon: "🐳"
}, {
  id: "jenkins",
  name: "Jenkins",
  description: "Open-source automation server for CI/CD pipelines",
  category: "CI/CD",
  connected: true,
  icon: "⚙️"
}, {
  id: "kubernetes",
  name: "Kubernetes",
  description: "Container orchestration platform",
  category: "Orchestration",
  connected: true,
  icon: "☸️"
}, {
  id: "gitlab",
  name: "GitLab",
  description: "Git repository management and CI/CD platform",
  category: "Source Control",
  connected: false,
  icon: "🦊"
}, {
  id: "circleci",
  name: "CircleCI",
  description: "Continuous integration and delivery platform",
  category: "CI/CD",
  connected: false,
  icon: "⭕"
}, {
  id: "argocd",
  name: "ArgoCD",
  description: "Declarative GitOps continuous delivery tool",
  category: "GitOps",
  connected: false,
  icon: "🚀"
}, {
  id: "terraform",
  name: "Terraform",
  description: "Infrastructure as Code tool",
  category: "Infrastructure",
  connected: false,
  icon: "🏗️"
}, {
  id: "ansible",
  name: "Ansible",
  description: "Automation tool for configuration management",
  category: "Configuration",
  connected: false,
  icon: "📋"
}];
const Integrations = () => {
  const [tools, setTools] = useState(availableTools);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const toggleConnection = (toolId: string) => {
    setTools(prev => prev.map(tool => tool.id === toolId ? {
      ...tool,
      connected: !tool.connected
    } : tool));
  };
  const categories = [...new Set(tools.map(tool => tool.category))];
  const connectedCount = tools.filter(tool => tool.connected).length;
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tool Integrations</h1>
          <p className="text-muted-foreground mt-2">
            Connect and manage your DevOps tools for automated workflows
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="status-success">
            {connectedCount} Connected
          </Badge>
          <Badge variant="outline" className="status-pending">
            {tools.length - connectedCount} Available
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.map(category => {
        const categoryTools = tools.filter(tool => tool.category === category);
        const connectedInCategory = categoryTools.filter(tool => tool.connected).length;
        return <Card key={category} className="gradient-card">
              <CardHeader className="pb-3 bg-slate-50 rounded-none">
                <CardTitle className="text-sm font-medium">{category}</CardTitle>
              </CardHeader>
              <CardContent className="bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{connectedInCategory}/{categoryTools.length}</span>
                  <Zap className={`h-4 w-4 ${connectedInCategory > 0 ? 'text-status-success' : 'text-muted-foreground'}`} />
                </div>
              </CardContent>
            </Card>;
      })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => <Card key={tool.id} className={`gradient-card transition-all hover:shadow-lg ${tool.connected ? 'ring-1 ring-primary/20' : ''}`}>
            <CardHeader className="bg-slate-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tool.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                {tool.connected ? <CheckCircle className="h-5 w-5 text-status-success" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
              </div>
            </CardHeader>
            
            <CardContent className="bg-slate-50">
              <CardDescription className="mb-4">
                {tool.description}
              </CardDescription>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch checked={tool.connected} onCheckedChange={() => toggleConnection(tool.id)} />
                  <Label className="text-sm">
                    {tool.connected ? 'Connected' : 'Connect'}
                  </Label>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTool(tool)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Configure {tool.name}</DialogTitle>
                      <DialogDescription>
                        Set up connection details for {tool.name}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="endpoint">Endpoint URL</Label>
                        <Input id="endpoint" placeholder={`https://${tool.name.toLowerCase()}.example.com`} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="token">API Token</Label>
                        <Input id="token" type="password" placeholder="Enter your API token" />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-retry" />
                        <Label htmlFor="auto-retry">Enable auto-retry on failure</Label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Test Connection</Button>
                      <Button>Save Configuration</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {/* Integration Guide */}
      <Card className="gradient-card">
        <CardHeader className="bg-slate-50">
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Integration Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-slate-50 rounded-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Quick Setup</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Toggle the switch to connect any tool</li>
                <li>• Click the settings icon to configure connection details</li>
                <li>• Test your connection before saving</li>
                <li>• Tools will appear in your workflow automation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• All credentials are encrypted and stored securely</li>
                <li>• API tokens are never logged or exposed</li>
                <li>• Connections use industry-standard authentication</li>
                <li>• Regular security audits ensure data protection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default Integrations;