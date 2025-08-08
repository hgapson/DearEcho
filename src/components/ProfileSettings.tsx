"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  Moon, 
  Sun,
  Camera,
  Save
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { User as UserType } from "../App";

interface ProfileSettingsProps {
  user: UserType | null;
  onUpdateUser: (user: UserType) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ProfileSettings({ user, onUpdateUser, darkMode, onToggleDarkMode }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reminders: true
  });

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email
      };
      onUpdateUser(updatedUser);
      toast.success("Profile updated successfully!");
    }
  };

  const handleExportData = () => {
    toast.success("Data export initiated. You'll receive an email with your data shortly.");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion feature will be implemented with proper confirmation flow.");
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-gray-600">Please sign in to access your profile settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-6 pb-20 px-4 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-lg text-gray-600">
            Manage your account preferences and privacy settings.
          </p>
        </div>

        {/* Profile Information */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2 text-indigo-600" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-2 border-gray-200 focus:border-indigo-400"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="border-2 border-gray-200 focus:border-indigo-400"
                />
              </div>
            </div>

            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {darkMode ? <Moon className="w-5 h-5 mr-2 text-indigo-600" /> : <Sun className="w-5 h-5 mr-2 text-indigo-600" />}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Dark Mode</Label>
                <p className="text-sm text-gray-600">Switch between light and dark themes</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={onToggleDarkMode}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2 text-indigo-600" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-600">Get notified on your device</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Daily Reminders</Label>
                <p className="text-sm text-gray-600">Gentle reminders for mood check-ins</p>
              </div>
              <Switch
                checked={notifications.reminders}
                onCheckedChange={(checked) => setNotifications({...notifications, reminders: checked})}
                className="data-[state=checked]:bg-indigo-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-indigo-600" />
              Privacy & Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className="w-full justify-start border-2 border-gray-200 hover:bg-green-50 hover:border-green-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Export My Data
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleDeleteAccount}
              className="w-full justify-start border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center text-sm text-gray-600 space-y-2">
              <p>Account created: {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Recently'}</p>
              <p>User ID: {user.id}</p>
              <p className="text-xs">Need help? Contact support@dearecho.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}