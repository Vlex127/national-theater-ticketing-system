'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Edit } from 'lucide-react';
import { Spinner } from "@/components/ui/spinner";

type Event = {
  id: string; // UUID
  title: string;
  description: string;
  date: string; // timestamp with time zone
  time: string; // text
  venue: string;
  image_url: string;
  duration: string;
  age_restriction: string;
  created_at: string;
  updated_at: string;
};

export default function EventsPage() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  // Event form state
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id' | 'created_at' | 'updated_at'>>({ 
    title: '', 
    description: '', 
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    venue: '',
    image_url: '',
    duration: '2h',
    age_restriction: '12+'
  });
  // Fetch events function
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event: Event) => {
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toISOString().split('T')[0];
    const formattedTime = event.time || eventDate.toTimeString().slice(0, 5);
    
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description || '',
      date: formattedDate,
      time: event.time || formattedTime,
      venue: event.venue,
      image_url: event.image_url || '',
      duration: event.duration || '2h',
      age_restriction: event.age_restriction || '12+'
    });
    setIsAdding(true);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setError(null);
  };

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!newEvent.title.trim()) {
        throw new Error('Event title is required');
      }
      if (!newEvent.date) {
        throw new Error('Event date is required');
      }
      if (!newEvent.time) {
        throw new Error('Event time is required');
      }
      if (!newEvent.venue.trim()) {
        throw new Error('Venue is required');
      }

      // Format the date for the API
      const formattedDate = new Date(newEvent.date);
      if (isNaN(formattedDate.getTime())) {
        throw new Error('Invalid date format');
      }

      // Ensure time is in HH:MM format
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      if (!timeRegex.test(newEvent.time)) {
        throw new Error('Time must be in HH:MM format (24-hour)');
      }

      const eventData = {
        title: newEvent.title.trim(),
        description: newEvent.description.trim(),
        date: formattedDate.toISOString().split('T')[0], // Just the date part
        time: newEvent.time,
        venue: newEvent.venue.trim(),
        image_url: newEvent.image_url.trim() || null,
        duration: newEvent.duration.trim() || '2h',
        age_restriction: newEvent.age_restriction.trim() || '12+'
      };

      const url = editingEvent 
        ? `/api/events/${editingEvent.id}`
        : '/api/events';
      
      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to save event';
        
        try {
          // Check if the response has content before trying to parse it as JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json().catch(() => ({}));
            errorMessage = errorData.error || errorData.message || errorMessage;
          } else {
            const text = await response.text();
            errorMessage = text || errorMessage;
          }
        } catch (parseError) {
          console.error('Error parsing error response:', parseError);
          const text = await response.text().catch(() => '');
          errorMessage = text || errorMessage;
        }
        
        throw new Error(errorMessage);
      }
      
      // Refresh events
      await fetchEvents();
      
      // Reset form
      setNewEvent({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        venue: '',
        image_url: '',
        duration: '2h',
        age_restriction: '12+',
        category: 'general'
      });
      
      setIsAdding(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
      setError(error instanceof Error ? error.message : 'Failed to save event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');
      
      // Remove the event from the local state
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEvents();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Manage all events in the system</p>
        </div>
        <Button 
          onClick={() => {
            setIsAdding(true);
            setEditingEvent(null);
            setError(null);
          }}
          disabled={isAdding}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</CardTitle>
            <CardDescription>Fill in the details for the event</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Event title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Event description"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <Input
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      type="date"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <Input
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      type="time"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Venue</label>
                  <Input
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                    placeholder="Event location"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <Input
                    value={newEvent.image_url}
                    onChange={(e) => setNewEvent({...newEvent, image_url: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    type="url"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Duration</label>
                    <Input
                      value={newEvent.duration}
                      onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                      placeholder="2h 30m"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Age Restriction</label>
                    <Input
                      value={newEvent.age_restriction}
                      onChange={(e) => setNewEvent({...newEvent, age_restriction: e.target.value})}
                      placeholder="12+"
                    />
                  </div>
                </div>
              </div>
              {error && (
                <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md">
                  {error}
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAdding(false);
                    setError(null);
                    setNewEvent({
                      title: '',
                      description: '',
                      date: new Date().toISOString().split('T')[0],
                      time: '19:00',
                      venue: '',
                      image_url: '',
                      duration: '2h',
                      age_restriction: '12+'
                    });
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      {editingEvent ? 'Updating...' : 'Saving...'}
                    </>
                  ) : editingEvent ? 'Update Event' : 'Save Event'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Events</CardTitle>
          <CardDescription>Manage your events below</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No events found. Add your first event to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => {
                  const eventDate = new Date(event.date);
                  const formattedDate = eventDate.toLocaleDateString('en-NG', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                  const formattedTime = event.time || eventDate.toLocaleTimeString('en-NG', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  });
                  
                  return (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{formattedDate}</TableCell>
                      <TableCell>{formattedTime}</TableCell>
                      <TableCell>{event.venue}</TableCell>
                      <TableCell>{event.duration || 'N/A'}</TableCell>
                      <TableCell>{event.age_restriction || 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(event)}
                            className="text-blue-600 hover:text-blue-800 h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-600 hover:text-red-800 h-8 w-8"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}