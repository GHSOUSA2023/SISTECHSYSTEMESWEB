import { NextResponse } from 'next/server';
import { aptEmailCrudService } from '@/services/aptemails.service';

export async function PUT(request, { params }) {
  // ✅ NÃO use await aqui!
  const apt = params.apt;

  try {
    const data = await request.json();
    const updatedItem = await aptEmailCrudService.updateItem(apt, data);
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('❌ Erro ao atualizar apt:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
