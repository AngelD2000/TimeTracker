import { NextResponse } from 'next/server';
import type { WeekSummary } from '@/app/types';

const SPRING_BOOT_BASE = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080/api';

export async function GET(
  request: Request,
  { params }: { params: { weekStart: string } }
) {
  try {
    const { weekStart } = params;

    // Call Spring Boot backend
    const response = await fetch(`${SPRING_BOOT_BASE}/weeks/${weekStart}/summary`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { error: error || 'Failed to fetch week summary' },
        { status: response.status }
      );
    }

    const data: WeekSummary = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching week summary:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

