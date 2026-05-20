import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const pixelId = process.env.FB_PIXEL_ID;
    const accessToken = process.env.FB_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
        console.error('Missing Facebook credentials');
        return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Facebook CAPI error:', data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('CAPI route error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
