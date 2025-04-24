import { NextResponse } from "next/server";
import { aj } from "@/lib/arcjet";
import { fixedWindow, shield } from "@arcjet/next";

export async function GET(req: Request) {
  const decision = await aj
    .withRule(
      shield({
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        // Block all bots except the following
      })
    )
    .withRule(
      fixedWindow({
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        max: 3, // max requests per interval
        window: "60s", // interval in seconds
      })
    )
    .protect(req);

  for (const result of decision.results) {
    console.log("Rule result", result);
  }
  if (decision.isDenied()) {
    return NextResponse.json(
      {
        error: "Too Many Requests, security thread detected",
        reason: decision.reason,
      },
      { status: 403 }
    );
  }
  return NextResponse.json({ message: "Hello world" });
}
