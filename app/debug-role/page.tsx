import { createClient } from '@/lib/supabase/server'

export default async function DebugRole() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-500">Not Logged In</h1>
        <p>Please login first.</p>
      </div>
    )
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="p-10 space-y-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold">Debug Info</h1>
      
      <section className="space-y-2 p-6 border rounded-xl">
        <h2 className="text-xl font-bold text-blue-600">Auth User (From Supabase Auth)</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </section>

      <section className="space-y-2 p-6 border rounded-xl">
        <h2 className="text-xl font-bold text-green-600">Profile Data (From profiles Table)</h2>
        {error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-xl">
            <strong>Error fetching profile:</strong> {error.message}
            <p className="text-xs mt-2">Code: {error.code}</p>
          </div>
        ) : (
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        )}
      </section>

      <div className="flex gap-4">
        <a href="/login" className="px-6 py-2 bg-brand-gold text-white rounded">Back to Login</a>
        <a href="/" className="px-6 py-2 bg-brand-charcoal text-white rounded">Back to Home</a>
      </div>
    </div>
  )
}
