import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const payload: Record<string, any> = {};
  formData.forEach((v, k) => (payload[k] = v));

  // Placeholder: log and pretend to send email
  console.log('Lead submission', payload);

  return NextResponse.json({ ok: true });
}


