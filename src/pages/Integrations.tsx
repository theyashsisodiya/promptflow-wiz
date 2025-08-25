
import { useState } from "react";
import { CheckCircle, Circle, Settings, ExternalLink, Zap, Search } from "lucide-react";
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
  officialColor?: string;
}

const availableTools: Tool[] = [
  // GitOps
  {
    id: "argocd",
    name: "ArgoCD",
    description: "Declarative GitOps continuous delivery tool for Kubernetes",
    category: "GitOps",
    connected: true,
    icon: "🚀",
    officialColor: "#EF7B4D"
  },
  {
    id: "flux",
    name: "Flux",
    description: "GitOps toolkit for keeping Kubernetes clusters in sync",
    category: "GitOps",
    connected: false,
    icon: "🌊",
    officialColor: "#326CE5"
  },
  {
    id: "tekton",
    name: "Tekton",
    description: "Cloud native solution for building CI/CD systems",
    category: "GitOps",
    connected: false,
    icon: "⚡",
    officialColor: "#FD495C"
  },
  {
    id: "gitops-engine",
    name: "GitOps Engine",
    description: "Reusable library for building GitOps solutions",
    category: "GitOps",
    connected: false,
    icon: "⚙️",
    officialColor: "#FF6B35"
  },

  // Infrastructure
  {
    id: "terraform",
    name: "Terraform",
    description: "Infrastructure as Code tool for building and managing infrastructure",
    category: "Infrastructure",
    connected: true,
    icon: "🏗️",
    officialColor: "#7B42BC"
  },
  {
    id: "pulumi",
    name: "Pulumi",
    description: "Modern infrastructure as code platform using familiar languages",
    category: "Infrastructure",
    connected: false,
    icon: "🌟",
    officialColor: "#8A3FFC"
  },
  {
    id: "ansible",
    name: "Ansible",
    description: "Automation tool for configuration management and deployment",
    category: "Infrastructure",
    connected: false,
    icon: "📋",
    officialColor: "#EE0000"
  },
  {
    id: "cloudformation",
    name: "CloudFormation",
    description: "AWS service for modeling and setting up AWS resources",
    category: "Infrastructure",
    connected: false,
    icon: "☁️",
    officialColor: "#FF9900"
  },

  // Source Code
  {
    id: "github",
    name: "GitHub",
    description: "Development platform for hosting and reviewing code",
    category: "Source Code",
    connected: true,
    icon: "🐙",
    officialColor: "#181717"
  },
  {
    id: "gitlab",
    name: "GitLab",
    description: "Complete DevOps platform with Git repository management",
    category: "Source Code",
    connected: false,
    icon: "🦊",
    officialColor: "#FC6D26"
  },
  {
    id: "bitbucket",
    name: "Bitbucket",
    description: "Git solution for professional teams with built-in CI/CD",
    category: "Source Code",
    connected: false,
    icon: "🪣",
    officialColor: "#0052CC"
  },
  {
    id: "azure-repos",
    name: "Azure Repos",
    description: "Git repositories with unlimited private repos",
    category: "Source Code",
    connected: false,
    icon: "📁",
    officialColor: "#0078D4"
  },

  // Containerization
  {
    id: "docker",
    name: "Docker",
    description: "Platform for building, sharing, and running containerized applications",
    category: "Containerization",
    connected: true,
    icon: "🐳",
    officialColor: "#2496ED"
  },
  {
    id: "podman",
    name: "Podman",
    description: "Daemonless container engine for developing and managing containers",
    category: "Containerization",
    connected: false,
    icon: "🐾",
    officialColor: "#892CA0"
  },
  {
    id: "containerd",
    name: "containerd",
    description: "Industry-standard container runtime with emphasis on simplicity",
    category: "Containerization",
    connected: false,
    icon: "📦",
    officialColor: "#575757"
  },
  {
    id: "buildah",
    name: "Buildah",
    description: "Tool for building OCI container images without Docker daemon",
    category: "Containerization",
    connected: false,
    icon: "🔨",
    officialColor: "#40C1AC"
  },

  // CI/CD
  {
    id: "jenkins",
    name: "Jenkins",
    description: "Open-source automation server for building and deploying",
    category: "CI/CD",
    connected: true,
    icon: "⚙️",
    officialColor: "#D33833"
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    description: "Workflow automation for GitHub repositories",
    category: "CI/CD",
    connected: false,
    icon: "🔄",
    officialColor: "#2088FF"
  },
  {
    id: "circleci",
    name: "CircleCI",
    description: "Continuous integration and delivery platform",
    category: "CI/CD",
    connected: false,
    icon: "⭕",
    officialColor: "#343434"
  },
  {
    id: "azure-devops",
    name: "Azure DevOps",
    description: "Complete DevOps toolchain from Microsoft",
    category: "CI/CD",
    connected: false,
    icon: "🔷",
    officialColor: "#0078D4"
  },

  // Orchestration
  {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Container orchestration platform for automating deployment",
    category: "Orchestration",
    connected: true,
    icon: "☸️",
    officialColor: "#326CE5"
  },
  {
    id: "docker-swarm",
    name: "Docker Swarm",
    description: "Native clustering functionality for Docker containers",
    category: "Orchestration",
    connected: false,
    icon: "🐝",
    officialColor: "#2496ED"
  },
  {
    id: "nomad",
    name: "Nomad",
    description: "Flexible scheduler and orchestrator for containerized workloads",
    category: "Orchestration",
    connected: false,
    icon: "🎯",
    officialColor: "#00CA8E"
  },
  {
    id: "openshift",
    name: "OpenShift",
    description: "Enterprise Kubernetes platform by Red Hat",
    category: "Orchestration",
    connected: false,
    icon: "🔴",
    officialColor: "#EE0000"
  }
];

const Integrations = () => {
  const [tools, setTools] = useState(availableTools);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleConnection = (toolId: string) => {
    setTools(prev => prev.map(tool => 
      tool.id === toolId ? { ...tool, connected: !tool.connected } : tool
    ));
  };

  const categories = ["All", ...new Set(tools.map(tool => tool.category))];
  const connectedCount = tools.filter(tool => tool.connected).length;

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tool Integrations
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">
              Connect and manage your DevOps tools for automated workflows
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="status-success text-base px-4 py-2">
              {connectedCount} Connected
            </Badge>
            <Badge variant="outline" className="status-pending text-base px-4 py-2">
              {tools.length - connectedCount} Available
            </Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-2xl bg-card border-border/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap rounded-2xl px-6 h-12"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.slice(1).map(category => {
          const categoryTools = tools.filter(tool => tool.category === category);
          const connectedInCategory = categoryTools.filter(tool => tool.connected).length;
          return (
            <Card key={category} className="gradient-card border-border/30 hover:border-primary/30 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-center">{category}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {connectedInCategory}/{categoryTools.length}
                  </span>
                  <Zap className={`h-5 w-5 ${connectedInCategory > 0 ? 'text-status-success' : 'text-muted-foreground'}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <Card key={tool.id} className={`gradient-card transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${tool.connected ? 'ring-2 ring-primary/30 shadow-lg' : 'border-border/30 hover:border-primary/30'}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl p-3 rounded-2xl bg-muted/30">
                    {tool.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{tool.name}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-2 rounded-full">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                {tool.connected ? (
                  <div className="p-2 rounded-full bg-status-success/20">
                    <CheckCircle className="h-5 w-5 text-status-success" />
                  </div>
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <CardDescription className="mb-6 text-base leading-relaxed">
                {tool.description}
              </CardDescription>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Switch 
                    checked={tool.connected} 
                    onCheckedChange={() => toggleConnection(tool.id)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <Label className="text-sm font-medium">
                    {tool.connected ? 'Connected' : 'Connect'}
                  </Label>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedTool(tool)}
                      className="rounded-xl hover:bg-primary/10"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl border-border/50">
                    <DialogHeader>
                      <DialogTitle className="text-xl">Configure {tool.name}</DialogTitle>
                      <DialogDescription className="text-base">
                        Set up connection details for {tool.name}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                      <div className="space-y-3">
                        <Label htmlFor="endpoint" className="text-sm font-medium">Endpoint URL</Label>
                        <Input 
                          id="endpoint" 
                          placeholder={`https://${tool.name.toLowerCase()}.example.com`}
                          className="rounded-xl h-12"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="token" className="text-sm font-medium">API Token</Label>
                        <Input 
                          id="token" 
                          type="password" 
                          placeholder="Enter your API token"
                          className="rounded-xl h-12"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Switch id="auto-retry" />
                        <Label htmlFor="auto-retry" className="text-sm">Enable auto-retry on failure</Label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" className="rounded-xl">Test Connection</Button>
                      <Button className="rounded-xl bg-gradient-to-r from-primary to-accent">Save Configuration</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Guide */}
      <Card className="gradient-card border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-xl bg-primary/20">
              <ExternalLink className="h-5 w-5 text-primary" />
            </div>
            Integration Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-primary">Quick Setup</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  Toggle the switch to connect any tool instantly
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  Click the settings icon to configure connection details
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  Test your connection before saving configuration
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  Connected tools appear automatically in workflows
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg text-accent">Security & Compliance</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  End-to-end encryption for all credentials
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  SOC 2 compliant data handling processes
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  Regular security audits and penetration testing
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  Zero-trust architecture with role-based access
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integrations;
