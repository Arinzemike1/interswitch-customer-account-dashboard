import { NextResponse } from "next/server";
import { transactions } from "../../../../lib/mock-data";

interface Params {
  params: { slug: string };
}

export async function GET(_request: Request, { params }: Params) {
  const result = await params;
  const list = transactions[result.slug] ?? [];
  return NextResponse.json(list);
}
