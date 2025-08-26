import { useState } from "react";
import { Key, Eye, EyeOff, Plus, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
interface Credential {
  id: string;
  name: string;
  type: string;
  service: string;
  lastUsed: Date;
  status: 'active' | 'expired' | 'unused';
}
const mockCredentials: Credential[] = [{
  id: '1',
  name: 'Docker Hub Registry',
  type: 'API Token',
  service: 'Docker',
  lastUsed: new Date(Date.now() - 86400000),
  status: 'active'
}, {
  id: '2',
  name: 'Jenkins Admin',
  type: 'Username/Password',
  service: 'Jenkins',
  lastUsed: new Date(Date.now() - 3600000),
  status: 'active'
}, {
  id: '3',
  name: 'K8s Cluster Access',
  type: 'Kubeconfig',
  service: 'Kubernetes',
  lastUsed: new Date(Date.now() - 1800000),
  status: 'active'
}, {
  id: '4',
  name: 'GitLab Deploy Key',
  type: 'SSH Key',
  service: 'GitLab',
  lastUsed: new Date(Date.now() - 604800000),
  status: 'unused'
}];
const Credentials = () => {
  const [credentials, setCredentials] = useState(mockCredentials);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{
    [key: string]: boolean;
  }>({});
  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="status-success">Active</Badge>;
      case 'expired':
        return <Badge className="status-error">Expired</Badge>;
      case 'unused':
        return <Badge className="status-warning">Unused</Badge>;
      default:
        return <Badge className="status-pending">Unknown</Badge>;
    }
  };
  const deleteCredential = (id: string) => {
    setCredentials(prev => prev.filter(cred => cred.id !== id));
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credentials Management</h1>
          <p className="text-muted-foreground mt-2">
            Securely manage API keys, tokens, and access credentials
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Credential
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Credential</DialogTitle>
              <DialogDescription>
                Store a new credential securely for use in workflows
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cred-name">Credential Name</Label>
                <Input id="cred-name" placeholder="e.g., Production Docker Registry" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cred-service">Service</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="docker">Docker</SelectItem>
                    <SelectItem value="jenkins">Jenkins</SelectItem>
                    <SelectItem value="kubernetes">Kubernetes</SelectItem>
                    <SelectItem value="gitlab">GitLab</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="aws">AWS</SelectItem>
                    <SelectItem value="azure">Azure</SelectItem>
                    <SelectItem value="gcp">Google Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cred-type">Credential Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="api-token">API Token</SelectItem>
                    <SelectItem value="username-password">Username/Password</SelectItem>
                    <SelectItem value="ssh-key">SSH Key</SelectItem>
                    <SelectItem value="kubeconfig">Kubeconfig</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cred-value">Credential Value</Label>
                <Input id="cred-value" type="password" placeholder="Enter your credential value" />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddDialog(false)}>
                Save Credential
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-zinc-900">
            <CardTitle className="text-sm font-medium">Total Credentials</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="bg-zinc-900">
            <div className="text-2xl font-bold">{credentials.length}</div>
            <p className="text-xs text-muted-foreground">Stored securely</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-zinc-900">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent className="bg-zinc-900">
            <div className="text-2xl font-bold text-status-success">
              {credentials.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Recently used</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-zinc-900">
            <CardTitle className="text-sm font-medium">Unused</CardTitle>
          </CardHeader>
          <CardContent className="bg-zinc-900">
            <div className="text-2xl font-bold text-status-warning">
              {credentials.filter(c => c.status === 'unused').length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-zinc-900">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
          </CardHeader>
          <CardContent className="bg-zinc-900">
            <div className="text-2xl font-bold">
              {new Set(credentials.map(c => c.service)).size}
            </div>
            <p className="text-xs text-muted-foreground">Integrated</p>
          </CardContent>
        </Card>
      </div>

      {/* Credentials Table */}
      <Card className="gradient-card">
        <CardHeader className="bg-zinc-900">
          <CardTitle>Stored Credentials</CardTitle>
          <CardDescription>
            All credentials are encrypted at rest and in transit
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-zinc-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {credentials.map(credential => <TableRow key={credential.id}>
                  <TableCell className="font-medium">
                    {credential.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{credential.service}</Badge>
                  </TableCell>
                  <TableCell>{credential.type}</TableCell>
                  <TableCell>{getStatusBadge(credential.status)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {credential.lastUsed.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => togglePasswordVisibility(credential.id)}>
                        {showPasswords[credential.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteCredential(credential.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="gradient-card border-warning-orange/30">
        <CardHeader className="bg-zinc-900">
          <CardTitle className="text-warning-orange">Security Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="bg-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Credential Management</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Rotate credentials regularly (every 90 days)</li>
                <li>• Use least-privilege access principles</li>
                <li>• Monitor credential usage and access logs</li>
                <li>• Remove unused credentials immediately</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Security Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AES-256 encryption for stored credentials</li>
                <li>• Zero-knowledge architecture</li>
                <li>• Audit logs for all credential operations</li>
                <li>• Automatic credential expiry detection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default Credentials;