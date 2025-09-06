'use client';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (items.length === 0) return <div className="text-center py-12"><h1 className="text-3xl font-bold">Your Cart is Empty</h1><Link href="/shop" className="text-primary">Start Shopping</Link></div>;
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {items.map(({ product, quantity }) => (
        <div key={product.id} className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-4"><Image src={product.image_url || ''} alt={product.name} width={80} height={80} /><div><h2 className="font-semibold">{product.name}</h2><p>LKR {product.price}</p></div></div>
          <div className="flex items-center gap-4"><input type="number" min="1" max={product.stock} value={quantity} onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))} className="w-16 border text-center" /><button onClick={() => removeFromCart(product.id)} className="text-red-500">Remove</button></div>
        </div>
      ))}
      <div className="text-right mt-6"><h2 className="text-2xl font-bold">Subtotal: LKR {subtotal.toFixed(2)}</h2><Link href="/checkout" className="inline-block mt-4 bg-primary text-white font-bold py-3 px-8 rounded">Checkout</Link></div>
    </div>
  );
}
