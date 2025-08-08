"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar } from "./ui/calendar";
import { 
  UserCircle, 
  Calendar as CalendarIcon,
  Clock,
  Star,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Award,
  Users,
  DollarSign,
  CheckCircle,
  Plus,
  Search,
  Filter,
  Video,
  MessageCircle,
  Shield,
  BookOpen,
  Heart,
  Brain,
  User
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Therapist, Appointment, User as UserType } from "../App";

interface TherapistPageProps {
  user: UserType | null;
  therapists: Therapist[];
  appointments: Appointment[];
  onTherapistRegistration: (therapist: Therapist) => void;
  onAppointmentBooking: (appointment: Appointment) => void;
  isAuthenticated: boolean;
  onNavigateToAuth: () => void;
}

type ViewMode = 'browse' | 'therapist-register' | 'therapist-dashboard';

export function TherapistPage({ 
  user, 
  therapists, 
  appointments,
  onTherapistRegistration, 
  onAppointmentBooking,
  isAuthenticated,
  onNavigateToAuth
}: TherapistPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('browse');
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  // Therapist registration form state
  const [therapistForm, setTherapistForm] = useState({
    name: "",
    email: "",
    title: "",
    specialties: [] as string[],
    bio: "",
    experience: 0,
    education: [] as string[],
    licenseNumber: "",
    hourlyRate: 0
  });

  // Mock therapist data for demo
  const mockTherapists: Therapist[] = therapists.length === 0 ? [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@therapy.com",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "CBT", "Mindfulness"],
      bio: "I specialize in helping individuals overcome anxiety and depression through evidence-based approaches like CBT and mindfulness techniques.",
      experience: 8,
      education: ["PhD in Clinical Psychology - Stanford University", "MA in Counseling - UC Berkeley"],
      licenseNumber: "PSY12345",
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 150,
      availability: {
        "Monday": ["09:00", "10:00", "14:00", "15:00"],
        "Tuesday": ["09:00", "11:00", "13:00", "16:00"],
        "Wednesday": ["10:00", "14:00", "15:00"],
        "Thursday": ["09:00", "10:00", "11:00", "14:00"],
        "Friday": ["09:00", "13:00", "14:00"]
      },
      isVerified: true,
      joinDate: "2022-01-15"
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      email: "michael.chen@therapy.com",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Relationships", "Family Therapy", "Couples Counseling", "Communication"],
      bio: "I help couples and families build stronger relationships through improved communication and understanding.",
      experience: 12,
      education: ["MS in Marriage & Family Therapy - USC", "BA in Psychology - UCLA"],
      licenseNumber: "MFT67890",
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: 175,
      availability: {
        "Monday": ["11:00", "13:00", "15:00", "17:00"],
        "Tuesday": ["09:00", "14:00", "16:00"],
        "Wednesday": ["10:00", "11:00", "15:00", "16:00"],
        "Thursday": ["13:00", "14:00", "17:00"],
        "Friday": ["09:00", "10:00", "11:00"]
      },
      isVerified: true,
      joinDate: "2021-06-20"
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@therapy.com",
      avatar: "https://images.unsplash.com/photo-1594824895013-df6b9a5e6053?w=400&h=400&fit=crop&crop=face",
      title: "Licensed Professional Counselor",
      specialties: ["Trauma", "PTSD", "EMDR", "Young Adults"],
      bio: "I specialize in trauma-informed care and EMDR therapy, helping individuals heal from past experiences.",
      experience: 6,
      education: ["MS in Clinical Mental Health Counseling - NYU", "BA in Social Work - Columbia"],
      licenseNumber: "LPC11223",
      rating: 4.9,
      reviewCount: 156,
      hourlyRate: 140,
      availability: {
        "Monday": ["08:00", "09:00", "14:00", "15:00"],
        "Tuesday": ["10:00", "11:00", "16:00", "17:00"],
        "Wednesday": ["09:00", "13:00", "14:00"],
        "Thursday": ["08:00", "10:00", "15:00", "16:00"],
        "Friday": ["09:00", "11:00", "14:00"]
      },
      isVerified: true,
      joinDate: "2022-09-10"
    }
  ] : therapists;

  const specialties = ["Anxiety", "Depression", "CBT", "Mindfulness", "Relationships", "Family Therapy", "Couples Counseling", "Trauma", "PTSD", "EMDR", "Young Adults"];

  const filteredTherapists = mockTherapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialty = specialtyFilter === "all" || therapist.specialties.includes(specialtyFilter);
    return matchesSearch && matchesSpecialty;
  });

  const handleAppointmentRequest = () => {
    if (!isAuthenticated) {
      onNavigateToAuth();
      return;
    }

    if (!selectedTherapist || !selectedDate || !selectedTime) {
      toast.error("Please select a therapist, date, and time");
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      userId: user?.id || "",
      therapistId: selectedTherapist.id,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      duration: 60,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    onAppointmentBooking(newAppointment);
    toast.success(`Appointment requested with ${selectedTherapist.name}! They will contact you soon.`);
    setSelectedTherapist(null);
    setSelectedTime("");
  };

  const handleTherapistSubmit = () => {
    if (!therapistForm.name || !therapistForm.email || !therapistForm.title || !therapistForm.licenseNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTherapist: Therapist = {
      id: Date.now().toString(),
      ...therapistForm,
      avatar: `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face`,
      rating: 0,
      reviewCount: 0,
      availability: {
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [],
        "Friday": []
      },
      isVerified: false,
      joinDate: new Date().toISOString()
    };

    onTherapistRegistration(newTherapist);
    toast.success("Therapist registration submitted! We'll review your application and contact you soon.");
    setViewMode('browse');
    
    // Reset form
    setTherapistForm({
      name: "",
      email: "",
      title: "",
      specialties: [],
      bio: "",
      experience: 0,
      education: [],
      licenseNumber: "",
      hourlyRate: 0
    });
  };

  const addSpecialty = (specialty: string) => {
    if (!therapistForm.specialties.includes(specialty)) {
      setTherapistForm({
        ...therapistForm,
        specialties: [...therapistForm.specialties, specialty]
      });
    }
  };

  const removeSpecialty = (specialty: string) => {
    setTherapistForm({
      ...therapistForm,
      specialties: therapistForm.specialties.filter(s => s !== specialty)
    });
  };

  const addEducation = () => {
    setTherapistForm({
      ...therapistForm,
      education: [...therapistForm.education, ""]
    });
  };

  const updateEducation = (index: number, value: string) => {
    const newEducation = [...therapistForm.education];
    newEducation[index] = value;
    setTherapistForm({
      ...therapistForm,
      education: newEducation
    });
  };

  const getAvailableTimeSlots = (therapist: Therapist, date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return therapist.availability[dayName] || [];
  };

  // Browse Therapists View
  if (viewMode === 'browse') {
    return (
      <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <UserCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect with Professional Therapists</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find licensed mental health professionals who can support your journey to emotional wellness.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={() => setViewMode('therapist-register')}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Register as Therapist
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search therapists by name or specialty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-2 border-gray-200 focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                    <SelectTrigger className="w-full lg:w-48 border-2 border-gray-200 focus:border-blue-400">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Therapists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredTherapists.map((therapist) => (
              <Card 
                key={therapist.id} 
                className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-3">
                      <AvatarImage src={therapist.avatar} alt={therapist.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                        {therapist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-gray-900">{therapist.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{therapist.title}</p>
                    {therapist.isVerified && (
                      <Badge className="bg-green-100 text-green-700 border-0">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 fill-current" />
                      <span className="font-medium">{therapist.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{therapist.reviewCount} reviews</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{therapist.experience} years experience</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>${therapist.hourlyRate}/session</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">{therapist.bio}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {therapist.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {therapist.specialties.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{therapist.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={() => setSelectedTherapist(therapist)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTherapists.length === 0 && (
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <UserCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No therapists found</h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria or check back later for new therapists.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Modal */}
        {selectedTherapist && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedTherapist(null)}>
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Book Appointment with {selectedTherapist.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={selectedTherapist.avatar} alt={selectedTherapist.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {selectedTherapist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedTherapist.name}</h3>
                    <p className="text-gray-600">{selectedTherapist.title}</p>
                    <p className="text-lg font-medium text-green-600">${selectedTherapist.hourlyRate}/session</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-semibold mb-3 block">Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                    />
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-3 block">Available Times</Label>
                    {selectedDate && (
                      <div className="grid grid-cols-2 gap-2">
                        {getAvailableTimeSlots(selectedTherapist, selectedDate).map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={selectedTime === time ? "bg-blue-600 text-white" : ""}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    )}
                    {selectedDate && getAvailableTimeSlots(selectedTherapist, selectedDate).length === 0 && (
                      <p className="text-gray-500 text-sm">No available times for this date</p>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Session Details</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      60-minute session
                    </div>
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      Video call (link provided after booking)
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Secure, confidential environment
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedTherapist(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAppointmentRequest}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    {isAuthenticated ? 'Request Appointment' : 'Sign In to Book'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  // Therapist Registration View
  if (viewMode === 'therapist-register') {
    return (
      <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={() => setViewMode('browse')}
              className="mb-4"
            >
              ← Back to Therapists
            </Button>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join as a Therapist</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Help others on their mental wellness journey. Apply to become a verified therapist on DearEcho.
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <User className="w-6 h-6 mr-2 text-purple-600" />
                Therapist Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={therapistForm.name}
                      onChange={(e) => setTherapistForm({...therapistForm, name: e.target.value})}
                      placeholder="Dr. Jane Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={therapistForm.email}
                      onChange={(e) => setTherapistForm({...therapistForm, email: e.target.value})}
                      placeholder="jane.smith@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Professional Title *</Label>
                  <Input
                    id="title"
                    value={therapistForm.title}
                    onChange={(e) => setTherapistForm({...therapistForm, title: e.target.value})}
                    placeholder="Licensed Clinical Psychologist"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={therapistForm.bio}
                    onChange={(e) => setTherapistForm({...therapistForm, bio: e.target.value})}
                    placeholder="Tell potential clients about your approach and experience..."
                    rows={4}
                  />
                </div>
              </div>

              <Separator />

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Professional Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="license">License Number *</Label>
                    <Input
                      id="license"
                      value={therapistForm.licenseNumber}
                      onChange={(e) => setTherapistForm({...therapistForm, licenseNumber: e.target.value})}
                      placeholder="PSY12345"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      value={therapistForm.experience}
                      onChange={(e) => setTherapistForm({...therapistForm, experience: parseInt(e.target.value) || 0})}
                      placeholder="5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="rate">Hourly Rate (USD)</Label>
                  <Input
                    id="rate"
                    type="number"
                    min="0"
                    value={therapistForm.hourlyRate}
                    onChange={(e) => setTherapistForm({...therapistForm, hourlyRate: parseInt(e.target.value) || 0})}
                    placeholder="150"
                  />
                </div>

                <div>
                  <Label>Specialties</Label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {therapistForm.specialties.map((specialty) => (
                        <Badge 
                          key={specialty} 
                          className="bg-blue-100 text-blue-700 cursor-pointer"
                          onClick={() => removeSpecialty(specialty)}
                        >
                          {specialty} ×
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={addSpecialty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Add specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.filter(s => !therapistForm.specialties.includes(s)).map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Education</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {therapistForm.education.map((edu, index) => (
                      <Input
                        key={index}
                        value={edu}
                        onChange={(e) => updateEducation(index, e.target.value)}
                        placeholder="PhD in Clinical Psychology - Stanford University"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Submit */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Application Review Process</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      We'll verify your license and credentials
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Background check and reference verification
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review typically takes 3-5 business days
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      You'll receive an email with the results
                    </li>
                  </ul>
                </div>

                <Button 
                  onClick={handleTherapistSubmit}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}