import { createAuditLog } from "@/lib/create-audit-log";
import { prismaDb } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { sectionId: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.sectionId) {
            return new NextResponse("Section id is required", { status: 400 });
        }

        const section = await prismaDb.section.delete({
            where: {
                id: params.sectionId,
            },
        });

        return NextResponse.json(section);
    } catch (error) {
        console.log("[SECTION_DELETE_API]", error);
        return new NextResponse("INTERNAL ERROR ", { status: 500 });
    }
}
