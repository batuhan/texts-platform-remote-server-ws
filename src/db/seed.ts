import "dotenv/config";
import { db, client } from "./index";
import { users } from "./schema";
import { UserDBInsert } from "../lib/types";

async function seed() {
  // This will run the seed file
  console.log("Seeding database...");
  const existingUsers = await db.select().from(users);
  const userInserts = [];

  if (existingUsers.find((u) => u.id === "WS")) {
    return;
  }

  const user: UserDBInsert = {
    id: "WS",
    fullName: "Websocket Server",
    imgURL:
      "data:image/svg+xml;charset=UTF-8,%3csvg height='193' preserveAspectRatio='xMidYMid' viewBox='0 0 256 193' width='256' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m192.440223 144.644612h31.779888v-76.3052736l-35.804782-35.8047822-22.472322 22.4723223 26.497216 26.4972158zm31.86374 15.93187h-46.286275-64.566001l-26.497216-26.497216 11.2361612-11.236161 21.8853588 21.885359h45.028496l-44.357681-44.441533 11.320014-11.3200132 44.35768 44.3576812v-45.0284968l-21.801506-21.8015067 11.152309-11.1523092-55.09073-55.3422863h-54.3360633-56.3485097l31.6960367 31.6960367v.0838519h.1677039 65.572224l23.2269894 23.2269899-33.9600388 33.9600393-23.2269899-23.2269899v-18.028169h-31.7798886v31.192925l55.0068785 55.0068781-22.3884704 22.388471 35.8047822 35.804782h54.336063 101.54471z' fill='%23231f20'/%3e%3c/svg%3e",
    isSelf: false,
  };

  userInserts.push(db.insert(users).values(user));

  await Promise.all(userInserts);

  await client.end();
}

seed();
