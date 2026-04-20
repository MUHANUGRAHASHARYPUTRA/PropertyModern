import { createClient } from '@/lib/supabase/server'
import UserDashboardClient from '@/components/dashboard/UserDashboardClient'

export default async function UserDashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  // Fetch wishlist
  const { data: wishlist } = await supabase
    .from('wishlist')
    .select(`
      id,
      properties (
        id,
        name,
        price,
        category,
        image_url,
        luas_tanah,
        luas_bangunan,
        kamar_tidur
      )
    `)
    .eq('user_id', user?.id)

  // Fetch KPR / Inquiries
  const { data: inquiries } = await supabase
    .from('inquiries')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <UserDashboardClient 
      initialProfile={profile} 
      user={user} 
      wishlist={wishlist || []} 
      inquiries={inquiries || []}
    />
  )
}
