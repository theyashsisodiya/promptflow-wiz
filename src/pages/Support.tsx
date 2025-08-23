import { HelpCircle, MessageSquare, Book, ExternalLink, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs = [{
  question: "How do I connect a new DevOps tool?",
  answer: "Navigate to the Tool Integration page, find your desired tool, and click the Connect button. You'll need to provide the tool's API endpoint and authentication credentials. Our system will automatically test the connection and integrate it into your workflow."
}, {
  question: "What happens if a workflow step fails?",
  answer: "When a step fails, the AI assistant automatically analyzes the error and suggests quick fixes. You can either apply the automated fix, manually edit the step, or skip it entirely. All failed steps are logged for troubleshooting."
}, {
  question: "How secure are my credentials?",
  answer: "All credentials are encrypted using AES-256 encryption and stored in a zero-knowledge architecture. We never have access to your raw credentials, and they're automatically rotated based on your security policies."
}, {
  question: "Can I customize the workflow order?",
  answer: "Yes! You can drag and drop tools to reorder your workflow, or use natural language prompts to describe your preferred execution sequence. The AI will optimize the order for efficiency and dependencies."
}, {
  question: "How do I monitor workflow performance?",
  answer: "The dashboard provides real-time monitoring with detailed logs, metrics, and performance analytics. You can set up alerts for failures, performance degradation, or completion notifications."
}];
const documentationLinks = [{
  title: "Getting Started Guide",
  url: "#",
  category: "Basics"
}, {
  title: "Tool Integration Setup",
  url: "#",
  category: "Integration"
}, {
  title: "Workflow Automation",
  url: "#",
  category: "Automation"
}, {
  title: "Security Best Practices",
  url: "#",
  category: "Security"
}, {
  title: "API Reference",
  url: "#",
  category: "API"
}, {
  title: "Troubleshooting Guide",
  url: "#",
  category: "Support"
}];
const Support = () => {
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-muted-foreground mt-2">
            Get help with your AIaaS platform and DevOps workflows
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-success">
            Support Available 24/7
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="bg-slate-50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5 text-primary" />
              Live Chat
            </CardTitle>
            <CardDescription>
              Chat with our support team in real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-slate-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average response: 2 minutes</span>
              <Button size="sm">Start Chat</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card cursor-pointer hover:shadow-lg transition-shadow bg-slate-50">
          <CardHeader className="bg-slate-50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Book className="h-5 w-5 text-accent" />
              Documentation
            </CardTitle>
            <CardDescription>
              Browse our comprehensive guides and tutorials
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-slate-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">50+ articles</span>
              <Button size="sm" variant="outline">Browse Docs</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card cursor-pointer hover:shadow-lg transition-shadow bg-slate-50">
          <CardHeader className="bg-slate-50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HelpCircle className="h-5 w-5 text-warning-orange" />
              Create Ticket
            </CardTitle>
            <CardDescription>
              Submit a detailed support request
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-slate-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Response within 4 hours</span>
              <Button size="sm" variant="outline">New Ticket</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <Card className="gradient-card">
          <CardHeader className="bg-slate-50">
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-slate-50">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="gradient-card">
          <CardHeader className="bg-slate-50">
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Send us a message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 bg-slate-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Brief description of your issue" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your issue in detail..." rows={4} />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Documentation Links */}
      <Card className="gradient-card">
        <CardHeader className="bg-slate-50">
          <CardTitle>Documentation & Resources</CardTitle>
          <CardDescription>
            Explore our comprehensive documentation library
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentationLinks.map((link, index) => <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer">
                <div>
                  <div className="font-medium">{link.title}</div>
                  <div className="text-sm text-muted-foreground">{link.category}</div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="gradient-card">
        <CardHeader className="bg-slate-50">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-status-success" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[{
            service: "API Gateway",
            status: "operational",
            uptime: "99.9%"
          }, {
            service: "Workflow Engine",
            status: "operational",
            uptime: "99.8%"
          }, {
            service: "Tool Integrations",
            status: "operational",
            uptime: "99.7%"
          }, {
            service: "Monitoring",
            status: "operational",
            uptime: "100%"
          }].map((service, index) => <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{service.service}</div>
                  <div className="text-xs text-muted-foreground">Uptime: {service.uptime}</div>
                </div>
                <div className="w-2 h-2 bg-status-success rounded-full"></div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default Support;