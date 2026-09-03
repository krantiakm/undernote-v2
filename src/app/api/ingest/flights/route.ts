import { NextRequest, NextResponse } from 'next/server';
import { evaluateFlightWatch } from '@/lib/ingestion/flights';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const origin = searchParams.get('origin') || 'BLR';
  const destination = searchParams.get('destination') || 'CMB';
  const depart = searchParams.get('depart') || '2026-12-20';
  const returnDate = searchParams.get('return') || '2026-12-27';
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '16000');

  const result = await evaluateFlightWatch({
    originAirport: origin,
    destinationAirport: destination,
    departureDate: depart,
    returnDate: returnDate,
    targetPriceCeiling: maxPrice,
    strictDirectOnly: true,
    familyFriendlyTimes: true,
  });

  return NextResponse.json(result);
}
