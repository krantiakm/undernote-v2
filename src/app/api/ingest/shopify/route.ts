import { NextRequest, NextResponse } from 'next/server';
import { pollShopifyStore } from '@/lib/ingestion/shopify';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain') || 'arakucoffee.in';
  const collection = searchParams.get('collection') || 'coffee';
  const eTag = searchParams.get('etag') || undefined;

  const result = await pollShopifyStore(domain, collection, eTag);
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const domain = body.domain || 'arakucoffee.in';
    const collection = body.collection || 'coffee';
    const eTag = body.etag || undefined;

    const result = await pollShopifyStore(domain, collection, eTag);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ status: 'error', error: err.message }, { status: 400 });
  }
}
