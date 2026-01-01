import { NextResponse } from 'next/server';
import type { CategoryBudget } from '@/app/types';

const SPRING_BOOT_BASE = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080/api';

/**
 * GET /api/budgets?weekStart=YYYY-MM-DD
 * Get all budgets for a week
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const weekStart = searchParams.get('weekStart');

    if (!weekStart) {
      return NextResponse.json(
        { error: 'weekStart parameter is required' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${SPRING_BOOT_BASE}/budgets?weekStart=${weekStart}`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || 'Failed to fetch budgets' },
        { status: response.status }
      );
    }

    const data: CategoryBudget[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/budgets
 * Create or update a budget
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${SPRING_BOOT_BASE}/budgets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || 'Failed to create budget' },
        { status: response.status }
      );
    }

    const data: CategoryBudget = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating budget:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

