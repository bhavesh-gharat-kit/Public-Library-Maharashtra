//Give all iBooks
import prisma  from '@/lib/prisma';

export async function GET() {
try {
const books = await prisma.book.findMany({ include: { iBook: true }, orderBy: { createdAt: 'desc' } });
return new Response(JSON.stringify({ success: true, count: books.length, books }), { status: 200, headers: { 'Content-Type': 'application/json' } });
} catch (err) {
console.error('GET /api/ibooks error', err);
return new Response(JSON.stringify({ success: false, message: 'Failed to fetch books' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
}
}