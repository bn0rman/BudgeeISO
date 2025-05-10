'use client';

import { useState, useEffect } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Shield, CheckCircle2, AlertCircle, Filter } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { getControlsByCategory, updateControlProgress } from '@/services/controlsService';
import { IsoControl } from '@/../../types/database';

export default function ControlsPage() {
  const { user, isLoading: isUserLoading } = useKindeBrowserClient();
  const [controls, setControls] = useState<Record<string, IsoControl[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingControlId, setUpdatingControlId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress' | 'not_started'>('all');

  // Load controls when user is ready
  useEffect(() => {
    async function loadControls() {
      if (!user?.id || isUserLoading) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const controlsData = await getControlsByCategory(user.id);
        setControls(controlsData);
        
        // Set active category to the first one by default
        if (Object.keys(controlsData).length > 0 && !activeCategory) {
          setActiveCategory(Object.keys(controlsData)[0]);
        }
      } catch (err) {
        console.error('Error loading controls:', err);
        setError('Failed to load ISO controls. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadControls();
  }, [user?.id, isUserLoading, activeCategory]);

  // Handle progress update for a control
  const handleProgressUpdate = async (controlId: string, progress: number) => {
    if (!user?.id) return;
    
    setUpdatingControlId(controlId);
    
    try {
      const success = await updateControlProgress(controlId, progress);
      
      if (success) {
        // Update local state
        setControls(prevControls => {
          const newControls = { ...prevControls };
          
          // Find and update the control in the correct category
          Object.keys(newControls).forEach(category => {
            newControls[category] = newControls[category].map(control => 
              control.id === controlId 
                ? { 
                    ...control, 
                    progress, 
                    status: progress === 0 ? 'not_started' : progress === 100 ? 'completed' : 'in_progress',
                    updated_at: new Date().toISOString() 
                  } 
                : control
            );
          });
          
          return newControls;
        });
      } else {
        setError('Failed to update control progress');
      }
    } catch (err) {
      console.error('Error updating control progress:', err);
      setError('Failed to update control progress');
    } finally {
      setUpdatingControlId(null);
    }
  };

  // Filter controls based on status
  const filterControls = (controls: IsoControl[]) => {
    if (filter === 'all') return controls;
    return controls.filter(control => control.status === filter);
  };

  // Get count by status
  const getStatusCounts = () => {
    let completed = 0;
    let inProgress = 0;
    let notStarted = 0;
    let total = 0;
    
    Object.values(controls).forEach(categoryControls => {
      categoryControls.forEach(control => {
        total++;
        if (control.status === 'completed') completed++;
        else if (control.status === 'in_progress') inProgress++;
        else notStarted++;
      });
    });
    
    return { completed, inProgress, notStarted, total };
  };

  const statusCounts = getStatusCounts();
  const categories = Object.keys(controls);

  // Loading state
  if (isUserLoading || isLoading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500 mb-4" />
        <p className="text-gray-500">Loading ISO27001 controls...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <Card className="border border-red-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button 
              className="mt-4" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2 sm:mb-0 gradient-text">ISO27001 Controls</h1>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-4 w-4" />
            Export Controls
          </Button>
        </div>
      </div>
      
      {/* Status Summary */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-6">
        <Card className="border border-gray-200 shadow-sm hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{statusCounts.total}</div>
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${(statusCounts.completed / statusCounts.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="text-3xl font-bold text-green-600">{statusCounts.completed}</div>
            <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="text-3xl font-bold text-orange-600">{statusCounts.inProgress}</div>
            <Shield className="ml-2 h-5 w-5 text-orange-500" />
          </CardContent>
        </Card>
        
        <Card className="border border-gray-200 shadow-sm hover-lift">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Not Started</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="text-3xl font-bold text-gray-600">{statusCounts.notStarted}</div>
            <AlertCircle className="ml-2 h-5 w-5 text-gray-500" />
          </CardContent>
        </Card>
      </div>
      
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={filter === 'all' ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'completed' ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter('completed')}
          className="gap-1.5"
        >
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </Button>
        <Button 
          variant={filter === 'in_progress' ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter('in_progress')}
          className="gap-1.5"
        >
          <Shield className="h-4 w-4" />
          In Progress
        </Button>
        <Button 
          variant={filter === 'not_started' ? "default" : "outline"} 
          size="sm"
          onClick={() => setFilter('not_started')}
          className="gap-1.5"
        >
          <AlertCircle className="h-4 w-4" />
          Not Started
        </Button>
      </div>
      
      {/* Controls List */}
      <Card className="border border-gray-200 shadow-sm mb-6">
        <CardHeader>
          <CardTitle>ISO27001 Controls by Category</CardTitle>
          <CardDescription>Update your progress on each control</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue={activeCategory || categories[0] || ""}
            onValueChange={setActiveCategory}
          >
            <TabsList className="bg-gray-100 p-1 mb-6 flex flex-wrap">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="transition-all data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category} value={category} className="space-y-4">
                {filterControls(controls[category]).map(control => {
                  const statusColor = 
                    control.status === 'completed' ? 'bg-green-500' : 
                    control.status === 'in_progress' ? 'bg-orange-500' : 
                    'bg-gray-300';
                  
                  const statusBadge = 
                    control.status === 'completed' ? <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge> : 
                    control.status === 'in_progress' ? <Badge variant="outline" className="bg-orange-50 text-orange-700">In Progress</Badge> : 
                    <Badge variant="outline" className="bg-gray-50 text-gray-700">Not Started</Badge>;
                    
                  return (
                    <div key={control.id} className="border rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
                        <h3 className="text-lg font-semibold">{control.control_id} {control.name}</h3>
                        {statusBadge}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4">{control.description || 'No description provided.'}</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Progress: {control.progress}%</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <Slider
                                value={[control.progress]}
                                max={100}
                                step={10}
                                disabled={updatingControlId === control.id}
                                onValueChange={(value: number[]) => {
                                  if (value[0] !== control.progress && updatingControlId !== control.id) {
                                    handleProgressUpdate(control.id, value[0]);
                                  }
                                }}
                              />
                            </div>
                            {updatingControlId === control.id && (
                              <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                            )}
                          </div>
                        </div>
                        
                        <Button
                          variant={control.progress === 100 ? "default" : "outline"}
                          size="sm"
                          className="whitespace-nowrap"
                          disabled={updatingControlId === control.id || control.progress === 100}
                          onClick={() => handleProgressUpdate(control.id, 100)}
                        >
                          {control.progress === 100 ? 'Completed' : 'Mark as Complete'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                {filterControls(controls[category]).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No controls match the selected filter.
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 