// app/api/keepalive/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
    // Verifica que venga de Vercel Cron
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Query mínima para mantener la DB activa
    const { error } = await supabase.from('feedback').select('1').limit(1)

    return NextResponse.json({
        ok: !error,
        timestamp: new Date().toISOString()
    })
}