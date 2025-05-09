import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { Webhook } from 'svix';

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // Get headers directly from the request
  const svixId = req.headers.get('svix-id') || '';
  const svixTimestamp = req.headers.get('svix-timestamp') || '';
  const svixSignature = req.headers.get('svix-signature') || '';

  // Verify Kinde webhook signature
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { success: false, message: 'Missing svix headers' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.KINDE_HOOK_SECRET;
  if (!webhookSecret) {
    console.error('Missing KINDE_HOOK_SECRET');
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }

  // Verify webhook
  let event;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(JSON.stringify(body), {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json(
      { success: false, message: 'Error verifying webhook' },
      { status: 400 }
    );
  }

  // Process the webhook event
  try {
    const eventType = body.type;
    const { id, email, given_name, family_name, picture } = body.data;
    const name = [given_name, family_name].filter(Boolean).join(' ');
    const supabase = createServerClient();

    switch (eventType) {
      case 'user.created':
      case 'user.updated': {
        // Upsert user to our database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .upsert({
            kinde_id: id,
            email,
            name,
            avatar_url: picture,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'kinde_id' })
          .select()
          .single();

        if (userError) {
          console.error('Error upserting user:', userError);
          return NextResponse.json(
            { success: false, message: 'Error upserting user' },
            { status: 500 }
          );
        }

        return NextResponse.json({ success: true });
      }

      case 'user.deleted': {
        // Delete user from our database
        const { error: userError } = await supabase
          .from('users')
          .delete()
          .eq('kinde_id', id);

        if (userError) {
          console.error('Error deleting user:', userError);
          return NextResponse.json(
            { success: false, message: 'Error deleting user' },
            { status: 500 }
          );
        }

        return NextResponse.json({ success: true });
      }

      default:
        // Unhandled event type
        return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { success: false, message: 'Error handling webhook' },
      { status: 500 }
    );
  }
} 