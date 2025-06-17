import { NextResponse } from 'next/server';
import { fetchAllNews } from '@/lib/news-fetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const news = await fetchAllNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error in news API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
} 