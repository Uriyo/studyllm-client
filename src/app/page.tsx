import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Home() {

const { userId } = await auth()

if (userId) {
  redirect("/projects");
}else{
  redirect("/home");
}

}

export default Home;

