import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Heart, Sparkles, Shield } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Login } from '../Authentication/Login'
import { Register } from '../Authentication/Register'

export function AuthPage({ onLogin }: { onLogin: (user: any) => void }) {
  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo_user',
      name: 'Demo User',
      email: 'demo@dearecho.com',
      joinDate: new Date().toISOString(),
      userType: 'user',
    }
    onLogin(demoUser)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-xl">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            DearEcho
          </h1>
          <p className="text-gray-600 text-lg">
            Your safe space for emotional healing
          </p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center justify-center space-x-2 text-blue-600 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">Begin Your Journey</span>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100/50">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="space-y-4">
                <Login onLogin={onLogin} />
                <div className="text-center">
                  <Button
                    variant="link"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Forgot your password?
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="register" className="space-y-4">
                <Register onLogin={onLogin} />
                <div className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-6">
              <Separator className="my-4" />
              <Button
                onClick={handleDemoLogin}
                variant="outline"
                className="w-full border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl"
              >
                <Shield className="w-4 h-4 mr-2" />
                Try Demo (No Account Required)
              </Button>
            </div>
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>🔒 Your data is encrypted and secure</p>
              <p>💙 A safe space for your emotional wellness</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
