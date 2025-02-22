import { getSupabase } from "@/database/supabase.server";

export async function GET(request: Request) {
  const accessToken = request.headers.get("x-supabase-auth");

  if (!accessToken) {
    return Response.json({ error: "No access token" }, { status: 401 });
  }

  try {
    const supabase = getSupabase();

    // Verify user token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return Response.json(
        { error: "Invalid token", details: userError?.message },
        { status: 401 },
      );
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError) {
      return Response.json({ error: profileError.message }, { status: 500 });
    }

    if (!profile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json({
      hello: `Hello ${profile.first_name}!`,
      profile,
    });
  } catch (error) {
    console.error("Server error:", error);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
