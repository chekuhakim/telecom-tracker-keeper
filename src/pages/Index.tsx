
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Radio, ShieldCheck, Receipt, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Total Sites",
    value: "150",
    description: "Active telecommunications sites",
    icon: Radio,
  },
  {
    title: "Insurance Expiring",
    value: "5",
    description: "Sites need attention",
    icon: ShieldCheck,
  },
  {
    title: "Pending Invoices",
    value: "12",
    description: "Awaiting processing",
    icon: Receipt,
  },
  {
    title: "Permit Renewals",
    value: "3",
    description: "Due this month",
    icon: AlertTriangle,
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your telecommunications sites
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Add New Site</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="backdrop-blur-sm bg-card/50 border shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your sites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add activity items here */}
                <p className="text-sm text-muted-foreground">No recent activity</p>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle>Upcoming Renewals</CardTitle>
              <CardDescription>Sites requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add renewal items here */}
                <p className="text-sm text-muted-foreground">No upcoming renewals</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
