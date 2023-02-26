#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[tauri::command]
fn greet(name: &str) -> String {
    print!("{}", name);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn login_check(userid: String, password: String) -> String {
    if userid == "test" && password == "test" {
      format!("OK")
    } else {
      format!("NG")
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,login_check])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
