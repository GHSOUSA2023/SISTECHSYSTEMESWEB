import { NextResponse } from 'next/server';
import { crudService } from '@/services/packages.service';

export async function GET(request, { params }) {
  try {
    // Await and validate the ID parameter
    const {id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const item = await crudService.getById(id);
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const paramId = await params?.id;
    const id = paramId?.toString();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const data = await request.json();
    const updatedItem = await crudService.updateItem(id, data);
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const paramId = await params?.id;
    const id = paramId?.toString();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await crudService.deleteItem(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    );
  }
}