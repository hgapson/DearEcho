'use client';

import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FirebaseError } from 'firebase/app';

export function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange =
    (k: 'name' | 'email' | 'password') =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });

      // Try to add a user doc, but don't fail registration if an extension blocks the call
      try {
        await setDoc(doc(db, 'users', cred.user.uid), {
          name: form.name,
          email: cred.user.email,
          createdAt: serverTimestamp(),
          role: 'user',
        });
      } catch (err) {
        console.warn('Firestore write skipped/blocked:', err);
      }

      toast.success('Account created! Please sign in.');
      navigate('/auth', { replace: true }); // go to login page
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        toast.error(e.message);
      } else {
        toast.error('Sign up failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={form.name} onChange={onChange('name')} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={form.email} onChange={onChange('email')} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={form.password} onChange={onChange('password')} required />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Creating…' : 'Create Account'}
      </Button>
    </form>
  );
}
