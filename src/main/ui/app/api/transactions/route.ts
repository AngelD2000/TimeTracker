import { NextResponse } from 'next/server';
import type { Transaction } from '@/app/types';

const SPRING_BOOT_BASE = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080/api';

/**
 * GET /api/transactions?weekStart=YYYY-MM-DD&category=Work
 * Get transactions filtered by week and/or category
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const weekStart = searchParams.get('weekStart');
    const category = searchParams.get('category');

    // Build query params
    const params = new URLSearchParams();
    if (weekStart) params.append('weekStart', weekStart);
    if (category) params.append('category', category);

    const response = await fetch(
      `${SPRING_BOOT_BASE}/transactions?${params.toString()}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || 'Failed to fetch transactions' },
        { status: response.status }
      );
    }

    const data: Transaction[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/transactions
 * Create a new transaction
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${SPRING_BOOT_BASE}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || 'Failed to create transaction' },
        { status: response.status }
      );
    }

    const data: Transaction = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/transactions/[id]
 * Delete a transaction
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${SPRING_BOOT_BASE}/transactions/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || 'Failed to delete transaction' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

