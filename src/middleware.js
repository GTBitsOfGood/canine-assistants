import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const isDogsApi = pathname === "/api/dogs";

    if (isDogsApi) {
      if (req.nextauth.token.role !== "Admin") {
        const response = new NextResponse(
          JSON.stringify({
            message: "User not authorized to access this resource",
          }),
          {
            status: 401,
          },
        );

        // Set the content type header for JSON
        response.headers.set("Content-Type", "application/json");

        return response;
      }
    }
  },

  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  },
);

export const config = { matcher: ["/((?!login|signup).*)"] };
