$filesToMove = @(
    "add_pdf_resource.js",
    "debug_course_videos.js",
    "debug_import.js",
    "debug_import_resource.js",
    "debug_output.txt",
    "debug_video_paths.js",
    "find_video_id.js",
    "generate_debug_curl.js",
    "get_user_id.js",
    "ids.txt",
    "link_content.js",
    "link_lesson1_content.js",
    "list_resources.js",
    "populate_course_resources.js",
    "resources_list.txt",
    "run_curl.bat",
    "secrets.txt",
    "seed_test_resource.js",
    "simple_test.js",
    "test_download.pdf",
    "test_worker_access.js",
    "test_worker_access_v2.js",
    "trace_course.js",
    "trace_output.txt",
    "trigger_backend_error.js",
    "update_resources.js",
    "verification.log",
    "verify_course_access.js",
    "verify_lesson1_data.js",
    "verify_output.txt",
    "verify_progress_endpoint.js",
    "verify_redirection.js",
    "verify_resource_stream.js",
    "verify_secure_access.js",
    "verify_video_playback.js",
    "video_paths.txt"
)

# Create backup dir
$backupDir = ".cleanup_backup\logs_and_scripts"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
    Write-Host "Created $backupDir"
}

# Move files
foreach ($file in $filesToMove) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination $backupDir -Force
        Write-Host "Moved $file"
    } else {
        Write-Host "Skipped (not found): $file"
    }
}

# Archive scripts_archive if it exists
if (Test-Path "..\scripts_archive") {
    $archiveDir = ".cleanup_backup\archive"
    if (-not (Test-Path $archiveDir)) {
        New-Item -ItemType Directory -Force -Path $archiveDir | Out-Null
    }
    Move-Item -Path "..\scripts_archive\*" -Destination $archiveDir -Force
    Remove-Item -Path "..\scripts_archive" -Recurse -Force
    Write-Host "Archived scripts_archive"
}

Write-Host "Cleanup script completed."
