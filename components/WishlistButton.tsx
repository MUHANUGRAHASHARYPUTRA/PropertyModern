'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { toggleWishlist } from '@/app/auth/actions';
import { createClient } from '@/lib/supabase/client';

interface WishlistButtonProps {
  propertyId: string;
}

export default function WishlistButton({ propertyId }: WishlistButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const checkWishlist = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('wishlist')
          .select('id')
          .eq('user_id', user.id)
          .eq('property_id', propertyId)
          .single();
        
        setIsLiked(!!data);
      }
      setLoading(false);
    };

    checkWishlist();
  }, [propertyId, supabase]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistic UI update
    setIsLiked(!isLiked);
    
    const result = await toggleWishlist(propertyId);
    if (result.error) {
      // Revert on error
      setIsLiked(isLiked);
      alert(result.error);
    }
  };

  if (loading) return <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />;

  return (
    <button 
      onClick={handleToggle}
      className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-all ${
        isLiked ? 'bg-red-500 border-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
      }`}
    >
      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
    </button>
  );
}
