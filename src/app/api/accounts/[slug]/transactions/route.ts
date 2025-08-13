import { NextResponse } from "next/server";
import { transactions } from "../../../../lib/mock-data";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const list = transactions[slug] ?? [];
  return NextResponse.json(list);
}
