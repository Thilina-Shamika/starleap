import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const payload: Record<string, any> = {};
    formData.forEach((v, k) => (payload[k] = v));

    // Get WordPress URL from environment
    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    
    if (!wordpressUrl) {
      console.error('NEXT_PUBLIC_WORDPRESS_URL is not set');
      return NextResponse.json(
        { ok: false, error: 'WordPress URL not configured' },
        { status: 500 }
      );
    }

    // Send to WordPress REST API
    const wpUrl = `${wordpressUrl.replace(/\/$/, '')}/wp-json/starleap/v1/lead`;
    
    const response = await fetch(wpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => ({ message: 'Failed to parse response' }));

    if (!response.ok) {
      console.error('WordPress API error:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });
      return NextResponse.json(
        { 
          ok: false, 
          error: responseData.message || responseData.error || 'Failed to submit form',
          details: responseData
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true, ...responseData });
  } catch (error: any) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { ok: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


