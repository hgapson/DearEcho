import { useState, type FormEvent } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "../../firebase"
import { toast } from "sonner"
import { Button } from '../ui/button'
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { FirebaseError } from "firebase/app"

export function Register({ onLogin }: { onLogin: (user: {
  id: string
  name: string
  email: string | null
  joinDate: string
  userType: string
}) => void }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const onChange =
    (k: "name" | "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(cred.user, { displayName: form.name })

      await setDoc(doc(db, "users", cred.user.uid), {
        name: form.name,
        email: cred.user.email,
        createdAt: serverTimestamp(),
        role: "user",
      })

      onLogin({
        id: cred.user.uid,
        name: form.name,
        email: cred.user.email,
        joinDate: cred.user.metadata?.creationTime ?? new Date().toISOString(),
        userType: "user",
      })

      toast.success("Account created! 🎉")
    } catch (e: unknown) {
      if (e instanceof FirebaseError) {
        toast.error(e.message)
      } else {
        toast.error("Sign up failed")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={form.name} onChange={onChange("name")} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={form.email} onChange={onChange("email")} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={form.password} onChange={onChange("password")} required />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Account"}
      </Button>
    </form>
  )
}
