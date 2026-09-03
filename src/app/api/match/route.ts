import { NextRequest, NextResponse } from 'next/server';
import { scoreOpportunity } from '@/lib/ingestion/matcher';
import { initialCards, initialContextItems } from '@/data/initialData';
import { CardData, ContextItemData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const candidateCards: CardData[] = body.cards || initialCards;
    const userBedrock: ContextItemData[] = body.contextItems || initialContextItems;

    const scored = candidateCards.map((card) => scoreOpportunity(card, userBedrock));
    scored.sort((a, b) => b.finalScore - a.finalScore);

    return NextResponse.json({
      totalEvaluated: candidateCards.length,
      scoredOpportunities: scored,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
