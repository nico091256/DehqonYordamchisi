import { NextResponse } from 'next/server';
import { mockProducts } from '../mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase();
  const category = searchParams.get('category');
  const region = searchParams.get('region');
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  let filtered = [...mockProducts];

  if (search) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(search) || 
      p.region.toLowerCase().includes(search)
    );
  }

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }

  if (region) {
    filtered = filtered.filter(p => p.region === region);
  }

  return NextResponse.json({
    products: filtered.slice(0, limit),
    total: filtered.length
  });
}
