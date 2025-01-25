import { NextResponse } from 'next/server';
import { crudService } from '@/services/packages.service';

export async function GET(request) {
  try {    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const status = searchParams.get('status');

    if (status) {
      const items = await crudService.getItemsByStatus(status);
      return NextResponse.json(items);
    }

    if (query) {
      const items = await crudService.searchItems(query);
      return NextResponse.json(items);
    }

    return NextResponse.json(
      { error: 'Search parameters required' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}