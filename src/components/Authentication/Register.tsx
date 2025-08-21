import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase"
import { Button, Input, Label } from "../ui/Ui"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

export function Register({ onLogin }: { onLogin: (user: any) => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match")
      setIsLoading(false)
      return
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(userCredential.user, { displayName: form.name })
      const user = userCredential.user
      onLogin({
        id: user.uid,
        name: form.name,
        email: user.email,
        joinDate: user.metadata.creationTime,
        userType: 'user'
      })
      toast.success("Welcome to DearEcho! Your healing journey begins now. 💙")
    } catch (err: any) {
      toast.error(err.message)
    }
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="register-name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="register-email"
            type="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Choose a strong password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-confirm">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="register-confirm"
            type="password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating Account..." : "Start Your Journey"}
      </Button>
    </form>
  )
}