export function GET(request: Request) {
  console.log("server");
  return Response.json({ hello: "world" });
}
