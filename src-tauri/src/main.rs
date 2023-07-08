// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// use tauri::Manager;

// use serde::{Deserialize, Serialize};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

// #[derive(Serialize, Deserialize)]
// struct Bible {
//     version: String,
//     book: String,
//     chapter: u128,
//     section: u128,
//     sentence: String,
// }

// #[tauri::command]
// fn print_search_result(phrases: Vec<Bible>) {
//     for phrase in phrases.iter() {
//         println!("検索結果：{}", phrase.sentence)
//     }
// }

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        // .invoke_handler(tauri::generate_handler![print_search_result])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
