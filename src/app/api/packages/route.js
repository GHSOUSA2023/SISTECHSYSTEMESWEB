import { NextResponse } from 'next/server';
import { crudService } from '@/services/packages.service';

export async function GET() {
  try {
    const items = await crudService.getAll();      
    return NextResponse.json(items);
  } catch (error) {
    console.error('API Route - Error:', error); // Debug log
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newItem = await crudService.createItem(data);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}