'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function AdminPage() {
    const [name, setName] = useState(''); const [price, setPrice] = useState('');
    const [stock, setStock] = useState(''); const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState(''); const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); if (!file) return; setLoading(true);
        const filePath = `${uuidv4()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file);
        if (uploadError) { setMessage('Image upload failed.'); setLoading(false); return; }
        const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
        const { error: insertError } = await supabase.from('products').insert({ name, price: parseFloat(price), stock: parseInt(stock), image_url: data.publicUrl });
        if (insertError) { setMessage('Failed to add product.'); } else { setMessage('Product added!'); (e.target as HTMLFormElement).reset(); }
        setLoading(false);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
            <h1 className="text-3xl font-bold text-center mb-6">Add New Product</h1>
            {message && <p className="text-center mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div><label>Product Name</label><input type="text" onChange={(e) => setName(e.target.value)} className="w-full border p-2" required /></div>
                <div><label>Price (LKR)</label><input type="number" onChange={(e) => setPrice(e.target.value)} className="w-full border p-2" required /></div>
                <div><label>Stock</label><input type="number" onChange={(e) => setStock(e.target.value)} className="w-full border p-2" required /></div>
                <div><label>Image</label><input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full border p-2" required /></div>
                <button type="submit" disabled={loading} className="w-full bg-primary text-white font-bold py-3 rounded disabled:bg-gray-400">{loading ? 'Adding...' : 'Add Product'}</button>
            </form>
        </div>
    );
}
