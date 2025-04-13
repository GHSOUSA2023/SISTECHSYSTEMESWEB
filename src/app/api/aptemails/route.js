import { NextResponse } from 'next/server';
import { aptEmailCrudService } from '@/services/aptemails.service';

export async function GET() {
  try {
    const items = await aptEmailCrudService.getAll(); // ← busca da collection
    return NextResponse.json(items);
  } catch (error) {
    console.error('API Route - Error:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}
