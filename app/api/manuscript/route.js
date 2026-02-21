import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/manuscript - List all manuscript with pagination and filters
export async function GET(request) {
    try {

        const { searchParams } = new URL(request.url);

        // Pagination
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 20;
        const skip = (page - 1) * limit;

        // Filters 
        const search = searchParams.get("search");

        // Build where clause
        const where = {};

        // Search in multiple fields
        if (search) {
            const parsedId = parseInt(search, 10);

            // If search is a valid number → search by ID
            if (!isNaN(parsedId)) {
                where.OR = [
                    { id: parsedId }, // Exact match for ID 
                    { author: { contains: search } },
                    { category: { contains: search } },
                    { description: { contains: search } },
                    { titleMarathi: { contains: search } },
                    { titleEnglish: { contains: search } },
                    { medium: { contains: search } },
                ];
            } else {
                // Otherwise search text fields only
                where.OR = [ 
                    { author: { contains: search } },
                    { category: { contains: search } },
                    { description: { contains: search } },
                    { titleMarathi: { contains: search } },
                    { titleEnglish: { contains: search } },
                    { medium: { contains: search } },
                ];
            }
        }

        // Execute queries
        const [data, totalItems] = await Promise.all([
            prisma.manuscript.findMany({
                where,
                skip,
                take: limit,
                orderBy: { order: "desc" },
            }),
            prisma.manuscript.count({ where }),
        ]);

        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json({
            success: true,
            data,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
            },
            totalItems,
            totalPages,
        });
    } catch (error) {
        console.error("Error fetching manuscript:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch manuscript", error: error.message },
            { status: 500 }
        );
    }
}
