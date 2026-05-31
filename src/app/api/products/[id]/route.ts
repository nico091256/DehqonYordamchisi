import { NextResponse } from 'next/server';
import { mockProducts } from '../../mockData';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = mockProducts.find(p => p.id === resolvedParams.id);
  
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
