import { NextResponse } from "next/server";
import { parseCookies } from "./helpers";
import { user } from "./context/AuthContext";

export default function middleware(req) {
  let token = req.cookies.get("token");
  let url = req.url;

  if (token === undefined) {
    if (url.includes("/dashboard")) {
      return NextResponse.redirect("http://localhost:3000/account/login");
    }
  } else {
    if (url.includes("/dashboard") && token.value == "undefined") {
      return NextResponse.redirect("http://localhost:3000/account/login");
    }
    if (url.includes("/login") && token.value != "undefined") {
      return NextResponse.redirect("http://localhost:3000/account/dashboard");
    }
    if (url.includes("/register") && token.value != "undefined") {
      return NextResponse.redirect("http://localhost:3000/account/dashboard");
    }
  }
}
