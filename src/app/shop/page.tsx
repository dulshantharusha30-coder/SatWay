import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
export const revalidate = 60;

async function getProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    return data || [];
}

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8">Our Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/shop/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-md group">
            <div className="relative w-full h-56"><Image src={product.image_url || ''} alt={product.name} fill style={{ objectFit: 'cover' }} /></div>
            <div className="p-4">
              <h2 className="text-xl font-semibold truncate">{product.name}</h2>
              <p className="text-primary font-bold text-lg mt-2">LKR {product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
