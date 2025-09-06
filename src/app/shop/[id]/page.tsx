'use client';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore, Product } from '@/store/cartStore';

export default function SingleProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCartStore();
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase.from('products').select('*').eq('id', params.id).single();
      setProduct(data as Product);
    };
    fetchProduct();
  }, [params.id]);

  if (!product) return <p>Loading...</p>;
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6 bg-white rounded-lg mt-8">
      <div className="relative w-full h-96"><Image src={product.image_url || ''} alt={product.name} fill style={{ objectFit: 'contain' }} /></div>
      <div>
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-bold text-primary mb-4">LKR {product.price}</p>
        <button onClick={() => addToCart(product)} disabled={product.stock === 0} className="w-full bg-primary text-white font-bold py-3 rounded disabled:bg-gray-400">
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
