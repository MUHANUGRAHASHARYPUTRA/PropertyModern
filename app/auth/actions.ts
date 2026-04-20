'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should use a library like codegen or type-guards
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  
  // Get profile to check role
  const { data: { user: loggedInUser } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', loggedInUser?.id)
    .single()

  if (profile?.role === 'admin') {
    redirect('/admin/dashboard')
  } else {
    redirect('/user/dashboard')
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
        data: {
            full_name: formData.get('fullName') as string,
            phone_number: formData.get('phoneNumber') as string,
        }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/', 'layout')
  redirect('/login?success=Check your email to confirm registration.')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { error: 'Unauthorized' }

  const full_name = formData.get('fullName') as string
  const phone_number = formData.get('phoneNumber') as string
  
  const { error } = await supabase
    .from('profiles')
    .update({ 
      full_name, 
      phone_number,
      updated_at: new Date().toISOString() 
    })
    .eq('id', user.id)

  if (error) return { error: error.message }
  
  revalidatePath('/user/dashboard')
  return { success: true }
}

export async function toggleWishlist(propertyId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return { error: 'Please login first' }

  const { data: existing } = await supabase
    .from('wishlist')
    .select('id')
    .eq('user_id', user.id)
    .eq('property_id', propertyId)
    .single()

  if (existing) {
    await supabase.from('wishlist').delete().eq('id', existing.id)
  } else {
    await supabase.from('wishlist').insert({ user_id: user.id, property_id: propertyId })
  }

  revalidatePath('/', 'layout')
  revalidatePath('/user/dashboard')
  return { success: true }
}

export async function addProperty(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Basic Admin check
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const newProperty = {
    name: formData.get('name') as string,
    price: formData.get('price') as string,
    category: formData.get('category') as string,
    status: formData.get('status') as string || 'AVAILABLE',
    description: formData.get('description') as string,
    luas_tanah: parseInt(formData.get('luas_tanah') as string),
    luas_bangunan: parseInt(formData.get('luas_bangunan') as string),
    kamar_tidur: parseInt(formData.get('kamar_tidur') as string),
    kamar_mandi: parseInt(formData.get('kamar_mandi') as string),
    image_url: formData.get('image_url') as string,
    video_url: formData.get('video_url') as string,
    gallery_urls: (formData.get('gallery_urls') as string)?.split(',').map(u => u.trim()).filter(u => u !== '') || [],
  }

  const { error } = await supabase.from('properties').insert(newProperty)
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function deleteProperty(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const { error } = await supabase.from('properties').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function upsertAnnouncement(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    badge: formData.get('badge') as string || 'PROMO',
    is_active: formData.get('is_active') === 'on',
  }

  // Just manage one active announcement for now
  const { data: existing } = await supabase.from('announcements').select('id').limit(1).single()

  let error;
  if (existing) {
    const { error: err } = await supabase.from('announcements').update(data).eq('id', existing.id)
    error = err
  } else {
    const { error: err } = await supabase.from('announcements').insert(data)
    error = err
  }

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateProperty(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const updatedProperty = {
    name: formData.get('name') as string,
    price: formData.get('price') as string,
    category: formData.get('category') as string,
    status: formData.get('status') as string,
    description: formData.get('description') as string,
    luas_tanah: parseInt(formData.get('luas_tanah') as string),
    luas_bangunan: parseInt(formData.get('luas_bangunan') as string),
    kamar_tidur: parseInt(formData.get('kamar_tidur') as string),
    kamar_mandi: parseInt(formData.get('kamar_mandi') as string),
    image_url: formData.get('image_url') as string,
    video_url: formData.get('video_url') as string,
    gallery_urls: (formData.get('gallery_urls') as string)?.split(',').map(u => u.trim()).filter(u => u !== '') || [],
  }

  const { error } = await supabase.from('properties').update(updatedProperty).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/dashboard')
  revalidatePath('/admin/properties')
  return { success: true }
}

export async function submitInquiry(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const data: any = {
    full_name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    message: formData.get('message') as string,
  }

  if (user) {
    data.user_id = user.id
  }

  const { error } = await supabase.from('inquiries').insert(data)
  if (error) return { error: error.message }

  return { success: true }
}

export async function deleteInquiry(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()
  if (profile?.role !== 'admin') return { error: 'Unauthorized' }

  const { error } = await supabase.from('inquiries').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/dashboard')
  return { success: true }
}
