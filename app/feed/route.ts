import { goneResponse } from "@/lib/gone-response"

export function GET() {
  return goneResponse()
}

export function HEAD() {
  return goneResponse(false)
}
