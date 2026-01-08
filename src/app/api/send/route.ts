import { NextRequest, NextResponse } from 'next/server';

const TOKEN = '7791487203:AAGTN49UhK-AHwK1yE0uiDrQGs1VQ3B-eXY';
const CHAT_ID = '5922282628';

const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { message, message_id } = body;

        if (!message) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        const url = message_id ? `https://api.telegram.org/bot${TOKEN}/editMessageText` : `https://api.telegram.org/bot${TOKEN}/sendMessage`;

        const payload = message_id
            ? {
                  chat_id: CHAT_ID,
                  message_id: message_id,
                  text: message,
                  parse_mode: 'HTML'
              }
            : {
                  chat_id: CHAT_ID,
                  text: message,
                  parse_mode: 'HTML'
              };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        return NextResponse.json({
            success: response.ok,
            data: data
        });
    } catch {
        return NextResponse.json({ success: false }, { status: 500 });
    }
};

export { POST };
