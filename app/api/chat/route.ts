import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const systemInstruction = `Anda adalah asisten AI resmi untuk website Alizah Property. Anda bertugas menjawab pertanyaan seputar properti dan layanan kami dengan ramah, profesional, dan dalam bahasa Indonesia.

ATURAN SANGAT PENTING (DILARANG DILANGGAR):
1. Alizah Property HANYA menjual "Rumah Tapak" (Landed House). KAMI TIDAK MENJUAL Apartemen, Ruko, Toko, Gedung Perkantoran, atau jenis properti lainnya. Jangan pernah menawarkan apartemen!
2. Proyek andalan kami saat ini adalah "Bukit Panaikang Residence" yang berfokus pada Rumah Komersil dan Rumah Subsidi.
3. Harga Rumah Komersil di kami mulai dari Rp 380 Juta. Jangan mengarang harga lain seperti 500 Juta dll.
4. Jika ditanya ketersediaan unit spesifik saat ini, arahkan pengguna untuk langsung melihat katalog di halaman utama website atau hubungi Marketing, karena stok unit selalu berubah-ubah.
5. PENTING: Jika pengguna menanyakan nomor kontak, nomor telepon, atau WhatsApp yang bisa dihubungi, langsung berikan nomor resmi Marketing Alizah Property: +62 895-4030-47867 (bisa via telepon atau WhatsApp). Jangan minta mereka mengisi formulir jika mereka hanya meminta nomor.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemInstruction },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `Groq API Error: ${response.status}`);
    }

    const aiMessage = data.choices?.[0]?.message?.content || 'Maaf, saya tidak bisa merespons saat ini.';

    return NextResponse.json({ role: 'assistant', content: aiMessage });

  } catch (error: any) {
    console.error('Groq API Error:', error);
    
    // Check if it's a rate limit error
    const errMessage = error?.message || '';
    if (
      errMessage.includes('429') || 
      errMessage.includes('Too Many Requests') || 
      errMessage.includes('quota') ||
      errMessage.includes('rate limit') ||
      errMessage.includes('Rate limit')
    ) {
      return NextResponse.json({ 
        role: 'assistant', 
        content: 'Maaf, saat ini asisten ai kami sedang menerima terlalu banyak pesan' 
      });
    }

    return NextResponse.json({ 
        role: 'assistant', 
        content: `[DEBUG VERCEL] Maaf, terjadi kesalahan pada sistem kami. Error Detail: ${errMessage}` 
    }, { status: 500 });
  }
}
