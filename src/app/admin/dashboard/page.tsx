'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Ticket, BarChart2 } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner"
type Stats = {
  totalUsers: number;
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalEvents: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      
      const data = await response.json();
      
      setStats(prev => ({
        ...prev,
        totalEvents: data.totalEvents,
        // Keep other stats as they are for now
        // You can update other stats when their respective APIs are ready
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to default values in case of error
      setStats({
        totalUsers: 0,
        totalEvents: 0,
        totalBookings: 0,
        totalRevenue: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back, {session?.user?.name || 'Admin'}!
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers.toLocaleString()} 
          icon={<Users className="h-6 w-6" />} 
          description="Registered users"
        />
        <StatCard 
          title="Total Events" 
          value={stats.totalEvents.toLocaleString()} 
          icon={<Calendar className="h-6 w-6" />}
          description="Upcoming events"
        />
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings.toLocaleString()} 
          icon={<Ticket className="h-6 w-6" />}
          description="Completed bookings"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue.toLocaleString()}`} 
          icon={<BarChart2 className="h-6 w-6" />}
          description="Total revenue"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/events">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Add New Event
            </Button>
          </a>
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Manage Users
          </Button>
          <a href='/admin/report'>
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              View Reports
            </Button>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
                  <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-medium">New event created</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
};

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-6 w-6 text-amber-500">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}