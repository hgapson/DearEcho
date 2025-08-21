import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {useAth} from "../context/authContext/AuthContext"
import { auth } from "../../"
import { Button } from '../ui/button'
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

interface RegisterProps {
  onLogin: (user: unknown) => void
}

export function Register({ onLogin }: RegisterProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
    let isValid = true

    if (!form.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!form.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!form.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
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
    } catch (err: unknown) {
      console.error("Registration error:", err)
      toast.error(err.message || "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="register-name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={handleInputChange}
            className="pl-10"
            required
          />
        </div>
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="register-email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={handleInputChange}
            className="pl-10"
            required
          />
        </div>
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Choose a strong password"
            value={form.password}
            onChange={handleInputChange}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-confirm">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="register-confirm"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleInputChange}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>
      
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating Account..." : "Start Your Journey"}
      </Button>
    </form>
  )
}