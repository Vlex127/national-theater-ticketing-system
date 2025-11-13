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
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  date: string;
  venue: string;
  category: string;
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
    image_url: '', 
    link: '',
    date: '',
    venue: '',
    category: ''
  });
  const [nextEventId, setNextEventId] = useState<number | null>(null);

  // Fetch the next available event ID when component mounts and when events change
  useEffect(() => {
    const fetchNextEventId = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const events = await response.json();
        const maxId = events.length > 0 
          ? Math.max(...events.map((event: Event) => event.id))
          : 0;
        setNextEventId(maxId + 1);
        
        // Pre-fill the link with the next available ID
        setNewEvent(prev => ({
          ...prev,
          link: `https://nntts.vercel.app/Details/${maxId + 1}`
        }));
      } catch (error) {
        console.error('Error fetching next event ID:', error);
      }
    };

    fetchNextEventId();
  }, [events]);

  const [editEventData, setEditEventData] = useState<Omit<Event, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    description: '',
    image_url: '',
    link: '',
    date: '',
    venue: '',
    category: ''
  });

  const startEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEditEventData({
      title: event.title,
      description: event.description,
      image_url: event.image_url,
      link: event.link,
      date: event.date,
      venue: event.venue,
      category: event.category
    });
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setError(null);
  };

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    if (!nextEventId) {
      setError('Please wait while we prepare the event link...');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newEvent,
          // Ensure date is properly formatted as YYYY-MM-DD
          date: newEvent.date ? new Date(newEvent.date).toISOString().split('T')[0] : ''
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add event');
      }
      
      // Refresh the events list
      await fetchEvents();
      // Reset form
      setNewEvent({ 
        title: '', 
        description: '', 
        image_url: '', 
        link: '',
        date: '',
        venue: '',
        category: ''
      });
      setIsAdding(false);
    } catch (error) {
      console.error('Error adding event:', error);
      setError(error instanceof Error ? error.message : 'Failed to add event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/events/${editingEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editEventData,
          date: editEventData.date ? new Date(editEventData.date).toISOString().split('T')[0] : ''
        }),
      });

      // First check if we have a response body
      const contentType = response.headers.get('content-type');
      let data = {};
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json().catch(() => ({}));
      } else if (response.status !== 204) { // 204 No Content is a valid response
        const text = await response.text();
        console.warn('Expected JSON response, got:', text);
      }

      if (!response.ok) {
        throw new Error(
          data?.error || 
          data?.message || 
          response.statusText || 
          `Failed to update event (status: ${response.status})`
        );
      }

      // Refresh the events list
      await fetchEvents();
      
      // Reset the editing state
      setEditingEvent(null);
      setEditEventData({
        title: '',
        description: '',
        image_url: '',
        link: '',
        date: '',
        venue: '',
        category: ''
      });
      
      // Show success message
      setError('Event updated successfully!');
      setTimeout(() => setError(null), 3000);
    } catch (error) {
      console.error('Error updating event:', error);
      setError(error instanceof Error ? error.message : 'Failed to update event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
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

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch events: ${errorText || response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON, got:', text);
        throw new Error('Invalid response format: expected JSON');
      }
      
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error instanceof Error ? error.message : 'Failed to load events');
      setEvents([]);
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Manage all events in the system</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="gap-2">
          <Plus className="h-4 w-4" />
          {isAdding ? 'Cancel' : 'Add New Event'}
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
            <CardDescription>Fill in the details for the new event</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Event title"
                    maxLength={255}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date *</label>
                  <Input 
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Venue *</label>
                  <Input 
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
                    placeholder="Event venue"
                    maxLength={255}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Input 
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    placeholder="e.g., Theater, Concert, Exhibition"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input 
                    value={newEvent.image_url}
                    onChange={(e) => setNewEvent({...newEvent, image_url: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    type="url"
                    maxLength={500}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Link</label>
                  <Input 
                    value={newEvent.link}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed"
                    type="url"
                  />
                  <p className="text-xs text-muted-foreground">
                    Link will be automatically generated
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Detailed event description..."
                  rows={4}
                />
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
                      Adding...
                    </>
                  ) : 'Add Event'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {editingEvent && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Edit Event</CardTitle>
            <CardDescription>Update the details for the event</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={editEventData.title}
                    onChange={(e) => setEditEventData({...editEventData, title: e.target.value})}
                    placeholder="Event title"
                    maxLength={255}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date *</label>
                  <Input
                    type="date"
                    value={editEventData.date}
                    onChange={(e) => setEditEventData({...editEventData, date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Venue *</label>
                  <Input
                    value={editEventData.venue}
                    onChange={(e) => setEditEventData({...editEventData, venue: e.target.value})}
                    placeholder="Event venue"
                    maxLength={255}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Input
                    value={editEventData.category}
                    onChange={(e) => setEditEventData({...editEventData, category: e.target.value})}
                    placeholder="e.g., Theater, Concert, Exhibition"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={editEventData.image_url}
                    onChange={(e) => setEditEventData({...editEventData, image_url: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                    type="url"
                    maxLength={500}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Link</label>
                  <Input
                    value={editEventData.link}
                    onChange={(e) => setEditEventData({...editEventData, link: e.target.value})}
                    placeholder="https://example.com/event"
                    type="url"
                    maxLength={255}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editEventData.description}
                  onChange={(e) => setEditEventData({...editEventData, description: e.target.value})}
                  placeholder="Detailed event description..."
                  rows={4}
                />
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
                  onClick={handleCancelEdit}
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
                      Updating...
                    </>
                  ) : 'Update Event'}
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
                  <TableHead>Venue</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{event.venue}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>
                      {event.image_url ? (
                        <a 
                          href={event.image_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm"
                        >
                          View
                        </a>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {event.link ? (
                        <a 
                          href={event.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm"
                        >
                          Visit
                        </a>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => startEditEvent(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}