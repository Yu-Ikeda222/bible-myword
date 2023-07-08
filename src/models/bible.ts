import Database from "tauri-plugin-sql-api";
import type { Bible } from "../types/Bible";

let db: any = null;
const load = Database.load("sqlite:bible.db").then((instance) => {
  db = instance;
  return db;
});

async function search(phrase: string): Promise<Array<Bible>> {
  await load;

  const resultList = await db.select(
    `select * from data where sentence like '%${phrase}%'`
  );
  const searchedList: Array<Bible> = [];
  for (const r of resultList) {
    searchedList.push({
      version: r.version,
      book: r.book,
      chapter: r.chapter,
      section: r.section,
      sentence: r.sentence,
    });
  }

  return searchedList;
}

// async function create() {

//   const { lastInsertId: id } = await db.execute(
//     "INSERT INTO notes (title, text, created_at, updated_at) VALUES ($1, $2, $3, $4)",
//     [title, text, createdAt, updatedAt],
//   );
//   return {
//     id,
//     title,
//     text,
//     createdAt,
//     updatedAt,
//   };
// }

export { search };
