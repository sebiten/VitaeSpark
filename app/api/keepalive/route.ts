// app/api/keepalive/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!  // ← service role, no anon key
)

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Esto siempre funciona, no depende de ninguna tabla tuya
    const { error } = await supabase
        .from('cvs')
        .select('id')
        .limit(1)

    return NextResponse.json({
        ok: !error,
        error: error?.message,
        timestamp: new Date().toISOString()
    })
}